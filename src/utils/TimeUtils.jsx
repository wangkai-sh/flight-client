import { stringToDate } from "./DateUtils";
/**
 * 将时间字符串转换为12小时制AM/PM格式
 * @param {string} timeStr - 时间字符串(格式HH:MM:SS)
 * @returns {string} 格式化后的AM/PM时间(如"09:30 AM")
 * @example
 * formatToAMPM('14:30:00') // "02:30 PM"
 */
export const formatToAMPM = (timeStr) => {

    const date = stringToDate(timeStr);

    return date.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
};

/**
 * 计算两个时间点之间的间隔
 * @param {string} startTime - 开始时间
 * @param {string} endTime - 结束时间
 * @returns {object} 包含天/小时/分钟/秒的间隔对象
 */
export const calculateInterval = (startTimeStr, endTimeStr) => {

    const start = stringToDate(startTimeStr);
    const end = stringToDate(endTimeStr);
    const diff = Math.abs(end - start); // 毫秒差

    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        totalMs: diff
    };
};

/**
 * 格式化时间间隔为易读字符串
 * @param {object} interval - calculateInterval的返回结果
 * @param {boolean} showSeconds - 是否显示秒数
 * @returns {string} 如"2天5小时30分钟"
 */
export const formatInterval = (interval, showSeconds = false) => {
    const parts = [];
    if (interval.days > 0) parts.push(`${interval.days}d`);
    if (interval.hours > 0) parts.push(`${interval.hours}h`);
    if (interval.minutes > 0) parts.push(`${interval.minutes}m`);
    if (showSeconds && interval.seconds > 0) parts.push(`${interval.seconds}s`);

    return parts.join('') || '0m';
};
