// 获取航空公司logo图标路径
const getLogoPath = (filename) => {
    return new URL(`../assets/logos/${filename}`, import.meta.url).href
}

// 获取航空公司logo图标
export const airlineLogos = {
    JAL: getLogoPath('japan-airlines.svg'),
    ANA: getLogoPath('ana.svg'),
    CEB: getLogoPath('cebu-pacific-air.svg'),
    default: getLogoPath('default_airline.png')
}
