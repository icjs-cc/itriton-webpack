import * as fs from 'fs';
import * as path from 'path';
const cssbeautify = require('cssbeautify');

/**
 * 插件选项
 * @category Webpack
 * @typedef {Object} DetachExcessStylesOptions
 * @property {string} mainStylePath - 主要样式文件的路径
 * @property {string} baseDir - 样式文件的基本目录路径
 * @property {string|string[]} startWithDir - 起始目录名称或名称列表
 * @property {string} [endWithFile='.wxss'] - 文件名后缀，默认为 '.wxss'
 * @property {boolean} [fullMatch=false] - 是否进行全匹配模式
 * @property {boolean} [debug=false] - 是否启用调试模式
 */
export interface DetachExcessStylesOptions {
  mainStylePath: string;
  baseDir: string;
  startWithDir?: string | string[];
  endWithFile?: string;
  fullMatch?: boolean;
  debug?: boolean;
}

/**
 * DetachExcessStyles 压缩 UNIAPP 样式的 Webpack 插件
 * @category Webpack
 */
export class DetachExcessStyles {
  private mainStylePath: string;
  private baseDir: string;
  private startWithDir: string[];
  private endWithFile: string;
  private fullMatch: boolean;
  private debug: boolean;

  /**
   * 创建DetachExcessStyles实例
   * @param {DetachExcessStylesOptions} options - 插件 options.
   * @example
   * ``` typescript
      const path = require('path');
      const { DetachExcessStyles } = require('@itriton/webpack');
      const env = process.env.NODE_ENV === 'development' ? 'dev' : 'build';
      const mainStylePath = path.join(__dirname, `unpackage/dist/${env}/mp-weixin/common/main.wxss`);
      const baseDir = path.join(__dirname, `unpackage/dist/${env}/mp-weixin`);
      let plugins = [];
      if (process.env.UNI_PLATFORM === 'mp-weixin') {
        plugins.push(
          new DetachExcessStyles({
            mainStylePath,
            baseDir,
            startWithDir: ['pages'], // 支持多个起始目录
            endWithFile: '.wxss', // 可选，默认为 '.wxss'
            fullMatch: false, // 可选，默认为 false，设置为 true 时全匹配起始目录文件夹名称
            debug: true // 可选，默认为 false
          })
        )
      }

      module.exports = {
        configureWebpack: {
          plugins
        }
      }
   * ```
   */
  constructor(options: DetachExcessStylesOptions) {
    this.mainStylePath = options.mainStylePath;
    this.baseDir = options.baseDir;
    this.startWithDir = Array.isArray(options.startWithDir) ? options.startWithDir : [options.startWithDir || 'pages'];
    this.endWithFile = options.endWithFile || '.wxss';
    this.fullMatch = options.fullMatch || false;
    this.debug = options.debug || false;
  }

  apply(compiler: any) {
    compiler.hooks.done.tapPromise('DetachExcessStyles', async (stats: any) => {
      if (fs.existsSync(this.mainStylePath)) {
        let mainStyleContent = fs.readFileSync(this.mainStylePath, 'utf-8');
        mainStyleContent = this.formatCss(mainStyleContent);

        // Get all matching .xxss files
        const xxssFiles = this.getAllXxssFiles(this.baseDir);
        if (this.debug) console.log(xxssFiles);

        // Process each .xxss file
        for (const file of xxssFiles) {
          let content = fs.readFileSync(file, 'utf-8');
          content = this.formatCss(content);
          content = this.removeGlobalStyles(content, mainStyleContent);
          fs.writeFileSync(file, content);
        }

        // Clear global styles in main style file
        fs.writeFileSync(this.mainStylePath, mainStyleContent);
      }
    });
  }

  /**
   * Get all .xxss files in the specified directory.
   * @param {string} dir - The directory to search.
   * @param {boolean} [further=false] - Whether to continue searching deeper directories.
   * @returns {string[]} - An array of file paths.
   */
  private getAllXxssFiles(dir: string, further = false): string[] {
    let results: string[] = [];
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        const shouldRecurse = this.startWithDir.some(startDir => this.fullMatch ? file === startDir : file.startsWith(startDir));
        if (shouldRecurse || further) {
          results = results.concat(this.getAllXxssFiles(filePath, true));
        }
      } else if (stat.isFile() && file.endsWith(this.endWithFile)) {
        results.push(filePath);
      }
    });
    return results;
  }

  /**
   * Remove global styles from the content.
   * @param {string} content - The content to process.
   * @param {string} mainStyleContent - The global styles to remove.
   * @returns {string} - The processed content.
   */
  private removeGlobalStyles(content: string, mainStyleContent: string): string {
    return content.replace(mainStyleContent, "");
  }

  /**
   * Format CSS content.
   * @param {string} css - The CSS content to format.
   * @returns {string} - The formatted CSS content.
   */
  private formatCss(css: string): string {
    css = css.replace(/\/\*[\s\S]*?\*\//g, ''); 
    css = cssbeautify(css, {
      indent: '  ',
      autosemicolon: true
    });
    // Compress CSS rules into one line and add space after each left brace
    css = css.replace(/\{(\s*)/g, '{ ').replace(/\s+/g, ' ').trim();
    // Add newline after each right brace
    css = css.replace(/\}/g, '}\n');

    return css;
  }
}
