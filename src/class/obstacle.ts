import {AObstacle} from "../interface/obstacle.interface";

export class Obstacle extends AObstacle {
    protected constructor(x: number, y: number) {
        super(x, y);
    }

    public getObstaclePosition(): Obstacle {
        return new Obstacle(this.x, this.y);
    }
}