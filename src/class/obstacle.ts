import {IObstacle} from "../interface/obstacle.interface";
import {Coordinates} from "./coordinates";

export class Obstacle implements IObstacle {
    protected x: number;
    protected y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    //Used for tests
    public getObstaclePosition(): Coordinates {
        return new Coordinates(this.x, this.y);
    }

    public isObstacleOnNextPosition(x: number, y: number): boolean {
        return this.x === x && this.y === y;
    }
}