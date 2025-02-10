import { IRover, IEtatRover, Orientation } from '../interface/rover.interface';

class Rover implements IRover {
    private positionX: number;
    private positionY: number;
    private orientation: string;
    private readonly maxX: number;
    private readonly maxY: number;

    constructor(
        initialX: number,
        initialY: number,
        initialOrientation: string,
        maxX: number = 10,
        maxY: number = 10
    ) {
        this.positionX = initialX;
        this.positionY = initialY;
        this.orientation = initialOrientation;
        this.maxX = maxX;
        this.maxY = maxY;
    }

    private isValidPosition(x: number, y: number): boolean {
        return x >= 0 && x <= this.maxX && y >= 0 && y <= this.maxY;
    }

    private calculateNextPosition(moveForward: boolean): { x: number; y: number } {
        let newX = this.positionX;
        let newY = this.positionY;

        switch (this.orientation) {
            case Orientation.NORD:
                newY += moveForward ? 1 : -1;
                break;
            case Orientation.EST:
                newX += moveForward ? 1 : -1;
                break;
            case Orientation.SUD:
                newY += moveForward ? -1 : 1;
                break;
            case Orientation.OUEST:
                newX += moveForward ? -1 : 1;
                break;
        }

        return { x: newX, y: newY };
    }

    private move(moveForward: boolean): IEtatRover {
        const nextPosition = this.calculateNextPosition(moveForward);

        if (!this.isValidPosition(nextPosition.x, nextPosition.y)) {
            nextPosition.x = (nextPosition.x + this.maxX + 1) % (this.maxX + 1);
            nextPosition.y = (nextPosition.y + this.maxY + 1) % (this.maxY + 1);
        }

        this.positionX = nextPosition.x;
        this.positionY = nextPosition.y;
        return {
            GetPositionX: () => this.positionX,
            GetPositionY: () => this.positionY,
            GetOrientation: () => this.orientation
        };
    }

    Avancer(): IEtatRover {
        return this.move(true);
    }

    Reculer(): IEtatRover {
        return this.move(false);
    }

    TournerAGauche(): IEtatRover {
        const directions = [Orientation.NORD, Orientation.OUEST, Orientation.SUD, Orientation.EST];
        const currentIndex = directions.indexOf(this.orientation);
        const nextIndex = (currentIndex + 1) % directions.length;
        this.orientation = directions[nextIndex];
        return {
            GetPositionX: () => this.positionX,
            GetPositionY: () => this.positionY,
            GetOrientation: () => this.orientation
        };
    }

    TournerADroite(): IEtatRover {
        const directions = [Orientation.NORD, Orientation.EST, Orientation.SUD, Orientation.OUEST];
        const currentIndex = directions.indexOf(this.orientation);
        const nextIndex = (currentIndex + 1) % directions.length;
        this.orientation = directions[nextIndex];
        return {
            GetPositionX: () => this.positionX,
            GetPositionY: () => this.positionY,
            GetOrientation: () => this.orientation
        };
    }
}

export { Rover };
