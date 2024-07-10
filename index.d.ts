/**
 * 深度克隆
 * @category Clone
 * @param obj 需要被克隆的对象
 * @returns
 * @example
 * ```
 * clone({a:1, b:2})
 * ```
 */
declare const clone: (obj: any, cache?: WeakMap<object, any>) => any;

/**
 * RGB颜色值转换为十六进制颜色值
 * @param rgb RGB颜色值
 * @category Color
 * @example
 * ``` typescript
 * rgbToHex("rgb(13, 145, 20)")
 * ```
 */
declare const rgbToHex: (rgb: string) => string;
/**
 * 十六进制Hex转RGB
 * @param sColor 十六进制Hex颜色值
 * @param isArray 是否返回数组类型
 * @category Color
 * @example
 * ``` typescript
 * hexToRgb("#0afdce")
 * ```
 */
declare const hexToRgb: (sColor: string, isArray?: boolean) => string | Array<number>;
/**
 * 颜色透明度 十六进制或者rgb格式的颜色值(不能接受命名式颜色格式，比如white)，返回此颜色的rgba格式值
 * @param color 只能hex或者rgba格式
 * @param opacity 不透明度值，取值为0-1之间
 * @category Color
 * @example
 * ``` typescript
 * colorToRgba('#000000', 0.35)
 * ```
 */
declare const colorToRgba: (color: string, alpha?: number) => string;
/**
 * 颜色渐变 该函数实现两个颜色值之间等分取值，返回一个数组，元素为十六进制形式的颜色值，数组长度为step值。 例如：colorGradient('rgb(250, 250, 250)', 'rgb(252, 252, 252)', 3)，得到的结果为["#fafafa", "#fafafa", "#fbfbfb"]
 * @param startColor 开始颜色值，可以是HEX或者RGB颜色值，如#0afdce或者rgb(120, 130, 150)
 * @param endColor 结束颜色值，可以是HEX或者RGB颜色值，如#0afdce或者rgb(120, 130, 150)
 * @param step 均分值，把开始值和结束值平均分成多少份
 * @category Color
 * @example
 * ``` typescript
 * colorGradient('rgb(250,250,250)', 'rgb(252,252,252)', 3)
 * ```
 */
declare const colorGradient: (startColor?: string, endColor?: string, step?: number) => string[];
/**
 * 颜色加深
 * @category Color
 * @param color 十六进制HEX颜色值
 * @param level 加深的程度，限0-1之间
 * @returns
 */
declare const colorToDark: (color: string, level: number) => string | undefined;
/**
 * 颜色减淡
 * @category Color
 * @param color 十六进制HEX颜色值
 * @param level 减淡的程度，限0-1之间
 * @returns
 */
declare const colorToLight: (color: string, level: number) => string | undefined;

/**
 * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
 * 在连续的操作中，无论进行了多长时间，只有某一次的操作后在指定的时间内没有再操作，这一次才被判定有效
 * @category Event
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return void
 */
declare const debounce: (func: () => void, wait?: number, immediate?: boolean) => void;

/**
 *
 * 对象深度合并
 * @category Merge
 * @description 在ES6中，我们可以很方便的使用Object.assign进行对象合并，但这只是浅层的合并，如果对象的属性为数组或者对象的时候，会导致属性内部的值丢失
 * @param target 目标对象
 * @param source 源对象
 * @returns
 * @example
 * ```
 * let a = { a: 1, b: 2 }
 * let b = { b: 1, c: 2 }
 * let c = merge(a, b)
 * // 输出： {a: 1, b: 1, c: 2}
 * ```
 */
declare const merge: <T extends Record<string, any>>(target?: T, source?: T) => T;

/**
 * 去除字符中的空格
 * @category Text
 * @param value 需要去除空格的值
 * @param position 去除的位置 all|both|left|right
 * @example
 * ```
 * trim("会当凌绝顶  ，  一览纵山小")
 * ```
 */
declare const trim: (value: string, position?: String) => string;
/**
 * 驼峰命名转横线命名：拆分字符串，使用-相连，并且转换为小写
 * @category Text
 * @param value 需要转换的值
 * @returns
 */
declare const hyphenate: (value: string, separator?: string) => string;
/**
 * 字符串首位大写
 * @category Text
 * @param value 需要转换的值
 * @returns
 */
declare const capitalize: (value: string) => string;
/**
 * 横线转驼峰命名
 * @category Text
 * @param value 需要转换的值
 * @returns
 */
declare const camelize: (value: string, separator?: string) => string;

/**
 * 节流原理：在一定时间内，只能触发一次
 * 规定时间内，只触发一次，可以通过设置immediate来决定触发的时机在这个时间的开始，还是结束的时候执行。
 * @category Event
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return void
 */
declare const throttle: (func: () => void, wait?: number, immediate?: boolean) => void;

/**
 * 获取两个日期之间的所有日期数组
 * @category Time
 * @param startDate 开始时间
 * @param endDate 结束时间
 * @param symbol 日期分隔符（默认-）
 * @example
 * ``` typescript
 * getDatesBetween('2000-01-01', '2000-02-01')
 * ```
 */
declare const getDatesBetween: (startDate: string, endDate: string, symbol?: string) => string[];

/**
 * 添加单位
 * @category Unit
 * @param value 数值
 * @param unit 单位（px｜rpx｜rem等）
 * @returns
 * @example
 * ```
 * setUnit(10)
 * ```
 */
declare const setUnit: (value?: any, unit?: string) => string;

/**
 * @category Updater
 * @typedef {Object} UpdaterOptions
 * @property {number} timer - 轮询间隔时长（ms）
 * @property {string} url - 请求地址
 */
interface UpdaterOptions {
    timer?: number;
    url?: string;
}
/**
 * @category Updater
 * @typedef {Object} UpdaterResponse
 * @property {string} data - 响应数据
 */
interface UpdaterResponse {
    data: string;
}
/**
 * 前端重新部署通知页面刷新（定时器轮询）
 * @category Updater
 * @param {UpdaterOptions} options 初始化参数
 * @example
 * ``` typescript
 * const updater = new Updater({
 *    timer:2000
 *})
 * updater.on('no-update',()=>{
 *    console.log('暂未更新')
 * })
 * updater.on('update',()=>{
 *    console.log('更新通知')
 * })
 * ```
 */
declare class Updater {
    url: string;
    interval: NodeJS.Timer | undefined;
    oldScript: string[];
    newScript: string[];
    dispatch: Record<string, Function[]>;
    constructor(options: UpdaterOptions);
    init(): Promise<void>;
    getHtml(): Promise<any>;
    parserScript(html: string | UpdaterResponse): string[];
    on(key: 'no-update' | 'update', fn: Function): this;
    compare(oldArr: string[], newArr: string[]): void;
    timing(time?: number): void;
}

/**
 * 获取URL参数 兼容HASH模式
 * @category Url
 * @param key 需要获取的参数名
 * @example
 * ``` typescript
 * getUrlQuery('name')
 * ```
 */
declare const getUrlQuery: (key: string) => any;

/**
 * 插件选项
 * @category Webpack
 * @typedef {Object} WebpackDetachExcessStylesOptions
 * @property {string} mainStylePath - 主要样式文件的路径
 * @property {string} baseDir - 样式文件的基本目录路径
 * @property {string|string[]} startWithDir - 起始目录名称或名称列表
 * @property {string} [endWithFile='.wxss'] - 文件名后缀，默认为 '.wxss'
 * @property {boolean} [fullMatch=false] - 是否进行全匹配模式
 * @property {boolean} [debug=false] - 是否启用调试模式
 */
interface WebpackDetachExcessStylesOptions {
    mainStylePath: string;
    baseDir: string;
    startWithDir?: string | string[];
    endWithFile?: string;
    fullMatch?: boolean;
    debug?: boolean;
}
/**
 * WebpackDetachExcessStyles 压缩 UNIAPP 样式的 Webpack 插件
 * @category Webpack
 */
declare class WebpackDetachExcessStyles {
    private mainStylePath;
    private baseDir;
    private startWithDir;
    private endWithFile;
    private fullMatch;
    private debug;
    /**
     * 创建WebpackDetachExcessStyles实例
     * @param {WebpackDetachExcessStylesOptions} options - 插件 options.
     * @example
     * ``` typescript
     *  isWechat()
     * ```
     */
    constructor(options: WebpackDetachExcessStylesOptions);
    apply(compiler: any): void;
    /**
     * Get all .wxss files in the specified directory.
     * @param {string} dir - The directory to search.
     * @param {boolean} [further=false] - Whether to continue searching deeper directories.
     * @returns {string[]} - An array of file paths.
     */
    private getAllWxssFiles;
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
     * Compress CSS content.
     * @param {string} css - The CSS content to compress.
     * @returns {Promise<string>} - The compressed CSS content.
     */
    private compressCss;
    /**
     * Escape special characters in a string for use in a regular expression.
     * @param {string} string - The string to escape.
     * @returns {string} - The escaped string.
     */
    private escapeRegExp;
}

/**
 * 判断是否是微信环境
 * @category Wechat
 * @returns {boolean}
 * @example
 * ``` typescript
 * isWechat()
 * ```
 */
declare const isWechat: () => boolean;

export { Updater, UpdaterOptions, UpdaterResponse, WebpackDetachExcessStyles, WebpackDetachExcessStylesOptions, camelize, capitalize, clone, colorGradient, colorToDark, colorToLight, colorToRgba, debounce, getDatesBetween, getUrlQuery, hexToRgb, hyphenate, isWechat, merge, rgbToHex, setUnit, throttle, trim };
