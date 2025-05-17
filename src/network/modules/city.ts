import { AxiosHeaders } from "axios"
import { DefaultAxios } from ".."

export function getCityData(){
 return DefaultAxios.get({
   url:"/city/all",
   headers: new AxiosHeaders(),
 }).then(res =>{
 return res
 }).catch(err =>{
  return err
 })
}
