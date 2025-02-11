import { IRover, IEtatRover, Orientation } from '../interface/rover.interface';

class Rover implements IRover, IEtatRover {
    private positionX: number;
    private positionY: number;
    private orientation: Orientation;
    private readonly maxX: number;
    private readonly maxY: number;

    private static readonly DIRECTIONS: Orientation[] = [
        Orientation.NORD,
        Orientation.EST,
        Orientation.SUD,
        Orientation.OUEST
    ];

    constructor(
        initialX: number,
        initialY: number,
        initialOrientation: Orientation,
        maxX: number = 10,
        maxY: number = 10
    ) {
        this.positionX = initialX % maxX;
        this.positionY = initialY % maxY;
        this.orientation = initialOrientation;
        this.maxX = maxX;
        this.maxY = maxY;
    }

    private calculateNextPosition(forward: boolean): { x: number; y: number } {
        const movement = {
            [Orientation.NORD]: { x: 0, y: 1 },
            [Orientation.EST]: { x: 1, y: 0 },
            [Orientation.SUD]: { x: 0, y: -1 },
            [Orientation.OUEST]: { x: -1, y: 0 }
        };

        const factor = forward ? 1 : -1;
        return {
            x: (this.positionX + factor * movement[this.orientation as keyof typeof movement].x + this.maxX) % this.maxX,
            y: (this.positionY + factor * movement[this.orientation as keyof typeof movement].y + this.maxY) % this.maxY
        };
    }

    private move(forward: boolean): IEtatRover {
        const nextPosition = this.calculateNextPosition(forward);
        this.positionX = nextPosition.x;
        this.positionY = nextPosition.y;
        return this;
    }

    Avancer(): IEtatRover {
        return this.move(true);
    }

    Reculer(): IEtatRover {
        return this.move(false);
    }

    TournerAGauche(): IEtatRover {
        const currentIndex = Rover.DIRECTIONS.indexOf(this.orientation);
        this.orientation = Rover.DIRECTIONS[(currentIndex + 3) % 4];
        return this;
    }

    TournerADroite(): IEtatRover {
        const currentIndex = Rover.DIRECTIONS.indexOf(this.orientation);
        this.orientation = Rover.DIRECTIONS[(currentIndex + 1) % 4];
        return this;
    }

    GetPositionX(): number {
        return this.positionX;
    }

    GetPositionY(): number {
        return this.positionY;
    }

    GetOrientation(): Orientation {
        return this.orientation;
    }
}

export { Rover };
