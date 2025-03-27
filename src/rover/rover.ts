import {ARover, InterpreterDirection, IRoverMovement, IRoverState, Orientation} from '../core/interfaces/rover.interface';
import {Coordinates} from "../core/types/coordinates";
import {Map} from "./map";
import {Obstacle} from "../core/types/obstacle";
import {RoverMovement} from "./rover-movement";
import * as console from "node:console";

export class Rover extends ARover{
    private movement: IRoverMovement;
    private lastMessage: string | null = null;

    constructor(map: Map) {
        super(
          new Coordinates(0, 0),
          Orientation.NORTH,
          map
        )
        this.movement = new RoverMovement(this.map);
        this.lastMessage = null;
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

    public move(moveForward: boolean): IRoverState {
        const result = this.movement.calculateNextPosition(this.positions, this.orientation, moveForward);

        if (!result.success && result.message) {
            this.lastMessage = result.message;
            return this.getState();
        }

        this.positions = result.position;
        return this.getState();
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

    public setCommandLine(commandLine: string[]): IRoverState {
        this.commandLine = commandLine;
        return this.getState();
    }

    public executeCommandLine(): IRoverState {
        const commandLine = this.commandLine;

        if (!commandLine) return this.getState();

        for (let i = 0; i < commandLine.length; i++) {
            const command = commandLine[i];
            switch (command) {
                case InterpreterDirection.AHEAD:
                    this.goAhead();
                    break;
                case InterpreterDirection.RIGHT:
                    this.turnOnRight();
                    this.goAhead();
                    break;
                case InterpreterDirection.LEFT:
                    this.turnOnLeft();
                    this.goAhead();

                    break;
                case InterpreterDirection.BACK:
                    this.turnOnLeft();
                    this.turnOnLeft();
                    this.goAhead();

                    break;
                default:
                    console.log('Invalid command');
            }
        }

        return this.getState();
    }



    public getMap(): Map {
        return this.map;
    }

    public getLastMessage(): string | null {
        return this.lastMessage;
    }

    public clearLastMessage(): void {
        this.lastMessage = null;
    }
}