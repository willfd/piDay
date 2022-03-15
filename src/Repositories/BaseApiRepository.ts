import axios, { Axios, AxiosResponse } from "axios"
export abstract class BaseApiRepository {
    post(url: string, payload: unknown) {
    }

    async get(url: string){
        let value = "" 
        const req = axios.get(url)
        if ((await req).status == 200){
            return (await req).data
        }
        return (await req).statusText
    }
}