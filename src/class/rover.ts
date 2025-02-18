import {IRoverState, Orientation, ARover} from '../interface/rover.interface';
import {Coordinates} from "./coordinates";
import {Map} from "./map";



export class Rover extends ARover{
    map?: Map;

    constructor() {
        super(
          new Coordinates(0, 0),
          Orientation.NORTH
        );
    }

    //ETAT ROVER
    public getState(): IRoverState {
        return {
            getActualPositions: () => this.positions,
            getOrientation: () => this.orientation
        };
    }

    public getActualPositions(): Coordinates {
        return this.positions;
    }

    public getOrientation(): Orientation {
        return this.orientation;
    }

    //DEPLACEMENT ROVER
    public move(moveForward: boolean): IRoverState {
        const nextPosition: Coordinates = this.calculateNextPosition(moveForward);

        this.positions.x = nextPosition.x;
        this.positions.y = nextPosition.y;
        return this.getState();
    }

    public calculateNextPosition(moveForward: boolean): Coordinates {
        let newX: number = this.positions.x;
        let newY: number = this.positions.y;

        switch (this.orientation) {
            case Orientation.NORTH:
                newY += moveForward ? 1 : -1;
                break;
            case Orientation.EST:
                newX += moveForward ? 1 : -1;
                break;
            case Orientation.SOUTH:
                newY += moveForward ? -1 : 1;
                break;
            case Orientation.WEST:
                newX += moveForward ? -1 : 1;
                break;
        }

        return this.map!.validateRoverPositionOnMap(newX, newY);
    }

    public goAhead(): IRoverState {
        return this.move(true);
    }

    public goBack(): IRoverState {
        return this.move(false);
    }

    public turnOnLeft(): IRoverState {
        const directions = [Orientation.NORTH, Orientation.WEST, Orientation.SOUTH, Orientation.EST];
        const currentIndex = directions.indexOf(this.orientation);
        const nextIndex = (currentIndex + 1) % directions.length;
        this.orientation = directions[nextIndex];
        return this.getState();
    }


    public turnOnRight(): IRoverState {
        const directions = [Orientation.NORTH, Orientation.EST, Orientation.SOUTH, Orientation.WEST];
        const currentIndex = directions.indexOf(this.orientation);
        const nextIndex = (currentIndex + 1) % directions.length;
        this.orientation = directions[nextIndex];
        return this.getState();
    }
}