import {AObstacle} from "../interface/obstacle.interface";
import {Coordinates} from "./coordinates";

export class Obstacle extends AObstacle {
    public constructor(x: number, y: number) {
        super(x, y);
    }

    public getObstaclePosition(): Coordinates {
        return new Coordinates(this.x, this.y);
    }
}