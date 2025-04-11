import { DefaultAxios } from ".."

export function getCityData(){
 return DefaultAxios.get({
   url:"/city/all"
 }).then(res =>{
 return res
 }).catch(err =>{
  return err
 })
}
