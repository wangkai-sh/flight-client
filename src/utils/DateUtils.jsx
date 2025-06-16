/**
 * 将时间字符串转换为Date对象（自动补全当前年月日）
 * @param {string|number} [Str='00:00:00'] - 时间字符串(支持HH:MM或HH:MM:SS)或可转换为字符串的值
 * @returns {Date} 包含当前年月日和时间信息的Date对象
 * @example 
 * stringToDate('14:30') // 返回今天14:30的Date对象
 * stringToDate('08:15:45') // 返回今天08:15:45的Date对象
 */
export const stringToDate = (str = '00:00:00') => {

    if (typeof str !== 'string') {
        str = String(str); // 强制转换为字符串
    }

    const [hours, minutes, seconds] = str.split(':');
    const date = new Date();
    date.setHours(hours || 0, minutes || 0, seconds || 0);

    return date;
};

/**
 * 格式化日期时间范围字符串
 * @param {string} departDateStr - 出发日期字符串(格式: YYYY-MM-DD)
 * @param {string} departTimeStr - 出发时间字符串(格式: HH:mm)
 * @param {string} retrunDateStr - 返回日期字符串(格式: YYYY-MM-DD)
 * @param {string} retrunTimeStr - 返回时间字符串(格式: HH:mm)
 * @returns {string} 格式化后的日期时间范围字符串
 * @example 
 * formatDateTimeRange('2025-06-10', '09:00', '2025-06-12', '18:30')
 * // 返回 "Tue, Jun10 9:00AM-6:30PM+2days"
 */
export const formatDateTimeRange = (
    departDateStr,
    departTimeStr,
    retrunDateStr,
    retrunTimeStr
) => {
    // 合并日期和时间
    const startDateTime = new Date(`${departDateStr}T${departTimeStr}`);
    const endDateTime = new Date(`${retrunDateStr}T${retrunTimeStr}`);

    // 计算相差天数
    const timeDiff = endDateTime - startDateTime;
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    // 星期几缩写
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekday = weekdays[startDateTime.getDay()];

    // 月份缩写
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[startDateTime.getMonth()];
    const day = startDateTime.getDate();

    // 格式化时间为AM/PM
    const formatTime = (date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours || 12;
        return `${hours}:${minutes}${ampm}`;
    };

    const startTime = formatTime(startDateTime);
    const endTime = formatTime(endDateTime);

    // 构建结果字符串
    let result = `${weekday}, ${month}${day} ${startTime}-${endTime}`;
    if (dayDiff > 0) {
        result += `+${dayDiff}day${dayDiff > 1 ? 's' : ''}`;
    }

    return result;
};

export const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};