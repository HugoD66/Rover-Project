import { IRover, IEtatRover, Orientation } from '../interface/rover.interface';

class Rover implements IRover, IEtatRover {
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

        nextPosition.x = (nextPosition.x + this.maxX) % this.maxX;
        nextPosition.y = (nextPosition.y + this.maxY) % this.maxY;

        this.positionX = nextPosition.x;
        this.positionY = nextPosition.y;
        return this.GetEtat();
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
        return this.GetEtat();
    }

    TournerADroite(): IEtatRover {
        const directions = [Orientation.NORD, Orientation.EST, Orientation.SUD, Orientation.OUEST];
        const currentIndex = directions.indexOf(this.orientation);
        const nextIndex = (currentIndex + 1) % directions.length;
        this.orientation = directions[nextIndex];
        return this.GetEtat();
    }

    GetEtat(): IEtatRover {
        return {
            GetPositionX: () => this.positionX,
            GetPositionY: () => this.positionY,
            GetOrientation: () => this.orientation
        };
    }

    GetOrientation(): string {
        return this.orientation;
    }

    GetPositionX(): number {
        return this.positionX;
    }

    GetPositionY(): number {
        return this.positionY;
    }
}

export { Rover };
