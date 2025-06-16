// 检查字符串是否为空
export const isEmpty = (str) => typeof str !== 'string' || str.trim().length === 0

/**
 * 价格格式化函数
 * @param {number|string} price - 输入价格
 * @param {number} decimals - 保留小数位数（默认2位）
 * @returns {string} 格式化后的价格字符串
 */
export const formatPrice = (price, decimals = 2) => {
  const num = Number(price);
  if (isNaN(num)) return '￥--';

  return `￥${num.toFixed(decimals)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

// 获取仓位名称
export const getcabinClassName = (cabinClass) => {
  switch (cabinClass) {
    case '1':
      return 'Business'
    case '2':
      return 'First Class'
    default:
      return 'Economy'
  }
}
// export const safeStringify = (obj) => {
//   return JSON.stringify(obj, (key, value) => {
//     if (value instanceof Date) {
//       return value.toLocaleDateString('zh-CN');
//     }
//     return value;
//   });
// };