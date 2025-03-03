import {ARover, InterpreterDirection, IRoverState, Orientation} from '../interface/rover.interface';
import {Coordinates} from "./coordinates";
import {Map} from "./map";
import {Obstacle} from "./obstacle";
import {ObstacleError} from "./obstacle-error";

export class Rover extends ARover{
    map?: Map;

    constructor() {
        super(
          new Coordinates(0, 0),
          Orientation.NORTH,
          //[InterpreterDirection.AHEAD, InterpreterDirection.AHEAD, InterpreterDirection.AHEAD, InterpreterDirection.AHEAD]
        );
    }

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

    public move(moveForward: boolean, obstacles?: Obstacle[] | null | undefined): IRoverState {
        const nextPosition: Coordinates = this.calculateNextPosition(moveForward);

        if (obstacles) {
            try {
                this.checkIfPathBlocked(obstacles, nextPosition);
            } catch (error) {
                if (error instanceof ObstacleError) {
                    console.warn(`Rover movement blocked: ${error.message}`);
                    return this.getState();
                } else {
                    throw error;
                }
            }
            /* const isPathBlocked: IRoverState | undefined = this.checkIfPathBlocked(obstacles, nextPosition);
            if (isPathBlocked) {
                return isPathBlocked;
            }*/
        }

        this.positions.x = nextPosition.x;
        this.positions.y = nextPosition.y;

        return this.getState();
    }

    public checkIfPathBlocked(obstacles: Obstacle[], nextPosition: Coordinates): IRoverState | undefined {
        for (const obstacle of obstacles) {
            const obstacleCoordinates = obstacle.getObstaclePosition();

            if (obstacleCoordinates.x === nextPosition.x && obstacleCoordinates.y === nextPosition.y) {
                throw new ObstacleError(obstacleCoordinates, this.getState());
            }
        }
        return undefined;
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