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
interface DetachExcessStylesOptions {
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
declare class DetachExcessStyles {
    private mainStylePath;
    private baseDir;
    private startWithDir;
    private endWithFile;
    private fullMatch;
    private debug;
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
    constructor(options: DetachExcessStylesOptions);
    apply(compiler: any): void;
    /**
     * Get all .xxss files in the specified directory.
     * @param {string} dir - The directory to search.
     * @param {boolean} [further=false] - Whether to continue searching deeper directories.
     * @returns {string[]} - An array of file paths.
     */
    private getAllXxssFiles;
    /**
     * Remove global styles from the content.
     * @param {string} content - The content to process.
     * @param {string} mainStyleContent - The global styles to remove.
     * @returns {string} - The processed content.
     */
    private removeGlobalStyles;
    /**
     * Format CSS content.
     * @param {string} css - The CSS content to format.
     * @returns {string} - The formatted CSS content.
     */
    private formatCss;
    /**
     * Escape special characters in a string for use in a regular expression.
     * @param {string} string - The string to escape.
     * @returns {string} - The escaped string.
     */
    private escapeRegExp;
}

export { DetachExcessStyles, DetachExcessStylesOptions };
