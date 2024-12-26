import { isFunction , isArray } from "@handy/shared";

console.log(isArray([1, 2, 3]));


/**
 * uuid生成。Version 4 UUID 格式（8-4-4-4-12）
 * @param uppercase  是否将生成的 UUID 转换为大写
 * @param hyphenate  是否在生成的 UUID 中包含中划线
 * @returns 
 */
export function generateUUID(uppercase = false, hyphenate = true): string {
    // 生成一个随机的 UUID
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });

    // 根据参数决定是否大写和包含中划线
    if (uppercase) {
        uuid = uuid.toUpperCase();
    }
    if (!hyphenate) {
        uuid = uuid.replace(/-/g, '');
    }

    return uuid;
}

/**
 * 将 URL 地址中的参数解析成对象
 * @param url - 需要解析的 URL 地址
 * @returns 解析后的参数对象，键值对形式，键为参数名，值为参数值
 */
export function parseUrlParams(url: string): Record<string, string> {
    const params: Record<string, string> = {};
    const searchParams = new URLSearchParams(url);
    searchParams.forEach((value, key) => {
        params[key] = value;
    });
    return params;
}

// 获取当前页面地址的协议，域名，IP，端口，参数
export function getUrlComponents(): { protocol: string, hostname: string, port: string, params: Record<string, string> } {
    const url = window.location.href;
    const { protocol, hostname, port } = window.location;
    const params = parseUrlParams(url);
    return { protocol, hostname, port, params };
}

// 日期格式化
export function formatDate(date: Date, format: string): string {
    const o: Record<string, number> = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
       'q+': Math.floor((date.getMonth() + 3) / 3),
       'S': date.getMilliseconds()
    };
    if (/(y+)/.test(format)) {
       format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
       if (new RegExp('(' + k + ')').test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] + '' : ('00' + o[k]).substr(('' + o[k]).length));
       }
    }
    return format;
}

// 获取当前时间戳 秒，毫秒2种
export function getTimestamp(): number {
    return Math.floor(Date.now() / 1000);
}
export function getMillisecondTimestamp(): number {
    return Date.now();
}

export function timestampToDate10(timestamp: number) {
    let date = new Date(timestamp * 1000); // 将秒级时间戳转换为毫秒级
    return date.toLocaleString(); // 返回格式化的日期字符串
}

// 13位时间戳（毫秒级）转日期
export function timestampToDate13(timestamp: number) {
    let date = new Date(timestamp);
    return date.toLocaleString(); // 返回格式化的日期字符串
}
