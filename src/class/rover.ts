import {ARover, InterpreterDirection, IRoverMovement, IRoverState, Orientation} from '../interface/rover.interface';
import {Coordinates} from "./coordinates";
import {Map} from "./map";
import {Obstacle} from "./obstacle";
import {RoverMovement} from "./rover-movement";

export class Rover extends ARover{
    private movement: IRoverMovement;

    constructor(map: Map) {
        super(
          new Coordinates(0, 0),
          Orientation.NORTH,
          //[InterpreterDirection.AHEAD, InterpreterDirection.AHEAD, InterpreterDirection.AHEAD, InterpreterDirection.AHEAD]
          map
        )
        this.movement = new RoverMovement(this.map);

    }

/*    private Decode(roverStateString: string) {
        const elements: IRoverState = JSON.parse(roverStateString);
    }*/

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

    public move(moveForward: boolean, obstacles?: Obstacle[] | null): IRoverState {
        const nextPosition: Coordinates = this.movement.calculateNextPosition(this.positions, this.orientation, moveForward);

        if (obstacles?.some(obstacle => obstacle.isObstacleOnNextPosition(nextPosition.x, nextPosition.y))) {
            console.warn(`Rover movement blocked at (${nextPosition.x}, ${nextPosition.y})`);
            return this.getState();
        }

        this.positions = nextPosition;
        return this.getState();
    }

    public goAhead(obstacles?: Obstacle[] | null | undefined): IRoverState {
        return this.move(true, obstacles);
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

    public setCommandLine(commandLine: string[]): IRoverState {
        this.commandLine = commandLine;
        return this.getState();
    }

    public executeCommandLine(): IRoverState {
        const commandLine = this.commandLine;

        if (!commandLine) {
            console.log('No command line');
        } else {
            const obstacles = this.map?.getObstacles();

            for (let i = 0; i < commandLine.length; i++) {
                const command = commandLine[i];
                switch (command) {
                    case InterpreterDirection.AHEAD:
                        this.goAhead(obstacles);
                        break;
                    case InterpreterDirection.RIGHT:
                        this.turnOnRight();
                        this.goAhead(obstacles);
                        break;
                    case InterpreterDirection.LEFT:
                        this.turnOnLeft();
                        this.goAhead(obstacles);

                        break;
                    case InterpreterDirection.BACK:
                        this.turnOnLeft();
                        this.turnOnLeft();
                        this.goAhead(obstacles);

                        break;
                    default:
                        console.log('Invalid command');
                }
            }
        }

        return this.getState();
    }
}