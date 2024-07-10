import * as fs from 'fs';
import * as path from 'path';
const cssbeautify = require('cssbeautify');
const postcss = require('postcss');
const cssnano = require('cssnano');

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
   *  isWechat()
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
      console.log('[DetachExcessStyles] - global style start processing');
      if (fs.existsSync(this.mainStylePath)) {
        let mainStyleContent = fs.readFileSync(this.mainStylePath, 'utf-8');
        mainStyleContent = this.formatCss(mainStyleContent);

        // Get all matching .wxss files
        const xxssFiles = this.getAllWxssFiles(this.baseDir);
        if (this.debug) console.log(xxssFiles);

        // Process each .wxss file
        for (const file of xxssFiles) {
          let content = fs.readFileSync(file, 'utf-8');
          content = this.formatCss(content);
          content = this.removeGlobalStyles(content, mainStyleContent);
          content = await this.compressCss(content);
          fs.writeFileSync(file, content);
        }

        // Clear global styles in main style file
        mainStyleContent = await this.compressCss(mainStyleContent);
        fs.writeFileSync(this.mainStylePath, mainStyleContent);
        console.log('[DetachExcessStyles] - global style replacement completed');
      } else {
        console.log('[DetachExcessStyles] - main style not found');
      }
    });
  }

  /**
   * Get all .wxss files in the specified directory.
   * @param {string} dir - The directory to search.
   * @param {boolean} [further=false] - Whether to continue searching deeper directories.
   * @returns {string[]} - An array of file paths.
   */
  private getAllWxssFiles(dir: string, further = false): string[] {
    let results: string[] = [];
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        const shouldRecurse = this.startWithDir.some(startDir => this.fullMatch ? file === startDir : file.startsWith(startDir));
        if (shouldRecurse || further) {
          results = results.concat(this.getAllWxssFiles(filePath, true));
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
    const mainStyles = mainStyleContent.split('\n').map(line => line.trim()).filter(line => line);
    const contentLines = content.split('\n');
    const filteredLines = contentLines.filter(line => !mainStyles.includes(line.trim()));
    return filteredLines.join('\n');
  }

  /**
   * Format CSS content.
   * @param {string} css - The CSS content to format.
   * @returns {string} - The formatted CSS content.
   */
  private formatCss(css: string): string {
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

  /**
   * Compress CSS content.
   * @param {string} css - The CSS content to compress.
   * @returns {Promise<string>} - The compressed CSS content.
   */
  private async compressCss(css: string): Promise<string> {
    const result = await postcss([cssnano]).process(css, { from: undefined });
    return result.css;
  }

  /**
   * Escape special characters in a string for use in a regular expression.
   * @param {string} string - The string to escape.
   * @returns {string} - The escaped string.
   */
  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters
  }
}
