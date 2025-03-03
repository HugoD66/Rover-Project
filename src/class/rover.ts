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
          [InterpreterDirection.AHEAD, InterpreterDirection.AHEAD, InterpreterDirection.AHEAD, InterpreterDirection.AHEAD]
        );
    }

    /**
     * Fonction de **haut niveau : Fournit l'état actuel du rover.
     */
    public getState(): IRoverState {
        return {
            getActualPositions: () => this.positions,
            getOrientation: () => this.orientation
        };
    }

    /**
     * Fonction de **bas niveau** : Renvoie directement les coordonnées du rover.
     */
    public getActualPositions(): Coordinates {
        return this.positions;
    }

    /**
     * Fonction de **bas niveau** : Renvoie directement l'orientation du rover.
     */
    public getOrientation(): Orientation {
        return this.orientation;
    }

    /**
     * Fonction de **haut niveau** : Gère le déplacement du rover en prenant en compte les obstacles.
     */
    public move(moveForward: boolean, obstacles?: Obstacle[] | null | undefined): IRoverState {
        const nextPosition: Coordinates = this.calculateNextPosition(moveForward);

        if (obstacles) {
            const isPathBlocked: IRoverState | undefined = this.checkIfPathBlocked(obstacles, nextPosition);
            if (isPathBlocked) {
                return isPathBlocked;
            }
        }

        this.positions.x = nextPosition.x;
        this.positions.y = nextPosition.y;

        return this.getState();
    }

    /**
     * Fonction de **bas niveau** : Vérifie si la prochaine position est occupée par un obstacle.
     */
    public checkIfPathBlocked(obstacles: Obstacle[], nextPosition: Coordinates): IRoverState | undefined {
        for (const obstacle of obstacles) {
            const obstacleCoordinates = obstacle.getObstaclePosition();

            if (obstacleCoordinates.x === nextPosition.x && obstacleCoordinates.y === nextPosition.y) {
                throw new ObstacleError(obstacleCoordinates, this.getState());
            }
        }
        return undefined;
    }

    /**
     * Fonction de **bas niveau** : Calcule la prochaine position en fonction de l'orientation.
     */
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

    /**
     * Fonction de **haut niveau** : Déplace le rover en avant.
     */
    public goAhead(obstacles?: Obstacle[] | null | undefined): IRoverState {
        return this.move(true, obstacles);
    }

    /**
     * Fonction de **haut niveau** : Déplace le rover en arrière.
     */
    public goBack(): IRoverState {
        return this.move(false);
    }

    /**
     * Fonction de **bas niveau** : Change l'orientation du rover vers la gauche.
     */
    public turnOnLeft(): IRoverState {
        const directions = [Orientation.NORTH, Orientation.WEST, Orientation.SOUTH, Orientation.EST];
        const currentIndex = directions.indexOf(this.orientation);
        const nextIndex = (currentIndex + 1) % directions.length;
        this.orientation = directions[nextIndex];
        return this.getState();
    }

    /**
     * Fonction de **bas niveau** : Change l'orientation du rover vers la droite.
     */
    public turnOnRight(): IRoverState {
        const directions = [Orientation.NORTH, Orientation.EST, Orientation.SOUTH, Orientation.WEST];
        const currentIndex = directions.indexOf(this.orientation);
        const nextIndex = (currentIndex + 1) % directions.length;
        this.orientation = directions[nextIndex];
        return this.getState();
    }

    /**
     * Fonction de **haut niveau** : Définit une liste de commandes pour le rover.
     */
    public setCommandLine(commandLine: string[]): IRoverState {
        this.commandLine = commandLine;
        return this.getState();
    }

    /**
     * Fonction de **haut niveau** : Exécute une série de commandes pour déplacer le rover.
     */
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
