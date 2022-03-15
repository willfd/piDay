import { resourceLimits } from "worker_threads";
import { BaseApiRepository } from "./BaseApiRepository";


export class RandomOrgRepository extends BaseApiRepository{
    async get_random_number_in_range(start: number, end:any){
        console.log("RandomOrgRepository.get_random_number_in_range :: getting random number");
        const url = 'https://www.random.org/integers/?num=1&min=' + start + '&max=' + end + '&col=1&base=10&format=plain&rnd=new&cl=w'
        let rand_num = ""
        await this.get(url).then((result: string) => {
            console.log("RandomOrgRepository.RandomOrgRepository :: then - result", result)
            console.log("result", result)
            const regExp : RegExp = />\d<|>\d\d<|>\d\d\d</
            result = result.replace("\n", "")
            console.log("result", result)
            const results = result.match(regExp)
            console.log("results", results)
            if (results){
                rand_num = results[0]
            }
        }).catch((error)=>{
            console.log("RandomOrgRepository.RandomOrgRepository :: catch", error)
        })
        console.log("rand_num", rand_num)
        return rand_num
    }
}