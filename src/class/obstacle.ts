export class Obstacle {
    private coordinates: { x: number; y: number }[];

    constructor(coordinates:{x: number, y: number}[]) {
        this.coordinates = coordinates;
    }

    public getObstaclesPositions(): { x: number; y: number }[] {
        return this.coordinates;
    }
}