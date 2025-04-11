
// 解决动态路径不生效问题(:url=?),只在vite环境下生效
const getAssetUrl = (imgUrl: string) => {

  return new URL(`../assets/img/${imgUrl}`, import.meta.url).href

}
export default getAssetUrl
