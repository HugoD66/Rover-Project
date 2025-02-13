//Entity
// Mutable, chaque instance unique
export class Obstacle {
    private x: number;
    private y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public getObstaclePositions() {
        return {x: this.x, y: this.y};
    }
}