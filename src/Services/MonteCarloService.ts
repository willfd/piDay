import { PointInterface } from "../Interfaces/PointInterface";
import { RandomOrgRepository } from "../Repositories/RandomOrgReository";

export class MonteCarloService{
    generate_point(rangeStart: number, rangeEnd: number): PointInterface {
        // console.error("MonteCarloService.generate_point")
        const x_point = this.generate_random_number(rangeStart, rangeEnd);
        const y_point = this.generate_random_number(rangeStart, rangeEnd);
        const point : PointInterface = {
            X : x_point,
            Y : y_point
        }
        // console.log("point")
        // console.log(point)
        return point
    }

    protected generate_random_number(rangeStart: number, rangeEnd: number) {
        return Math.floor(Math.random() * (rangeEnd - rangeStart) ) + rangeStart;
    }

    is_point_in_circle(radius: number, point: PointInterface): boolean{
        const abs_point_x = Math.abs(point.X);
        const abs_point_y = Math.abs(point.Y);
        if (point.X == 0 || point.Y == 0){
            if (abs_point_x>radius || abs_point_y>radius){
                return false;
            }
        }
        const line = Math.sqrt((abs_point_x*abs_point_x)+(abs_point_y*abs_point_y));
        if (line > radius){
            return false
        }
        return true
    }

    get_pi_for_given_number_of_points(number_of_points: number, radius: number): number{
        let pi = 0;
        let total_points = 0;
        let circle_points = 0;
        while (total_points <= number_of_points){
            const point = this.generate_point(-radius, radius)
            total_points ++;
            if (this.is_point_in_circle(radius, point)){
                circle_points ++;
            }
            pi = 4 * (circle_points / total_points);
            // console.log(pi)
        }
        return pi
    }

    get_pi_accuracy(calculated_pi: number): number{
        const accuracy_percentage = (calculated_pi/3.14159265358979323846)*100
        return 100 - Math.abs(100-accuracy_percentage)
    }
}