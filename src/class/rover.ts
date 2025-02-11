import {IRover, IEtatRover, Orientation} from '../interface/rover.interface';

//Sert à instancier une classe Rover
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

    //Fonction qui calcule la prochaine position du rover
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

    //Fonction qui permet de déplacer le rover
    private move(moveForward: boolean): IEtatRover {
        const nextPosition = this.calculateNextPosition(moveForward);

        nextPosition.x = (nextPosition.x + this.maxX) % this.maxX;
        nextPosition.y = (nextPosition.y + this.maxY) % this.maxY;

        this.positionX = nextPosition.x;
        this.positionY = nextPosition.y;
        return this.GetEtat();
    }

    //Fonctions qui permettent de déplacer le rover en avant
    Avancer(): IEtatRover {
        return this.move(true);
    }

    //Fonctions qui permettent de déplacer le rover en arrière
    Reculer(): IEtatRover {
        return this.move(false);
    }

    //Fonctions qui permettent de tourner le rover à gauche
    TournerAGauche(): IEtatRover {
        const directions = [Orientation.NORD, Orientation.OUEST, Orientation.SUD, Orientation.EST];
        const currentIndex = directions.indexOf(this.orientation);
        const nextIndex = (currentIndex + 1) % directions.length;
        this.orientation = directions[nextIndex];
        return this.GetEtat();
    }

    //Fonctions qui permettent de tourner le rover à droite
    TournerADroite(): IEtatRover {
        const directions = [Orientation.NORD, Orientation.EST, Orientation.SUD, Orientation.OUEST];
        const currentIndex = directions.indexOf(this.orientation);
        const nextIndex = (currentIndex + 1) % directions.length;
        this.orientation = directions[nextIndex];
        return this.GetEtat();
    }

    //Fonction qui permet de retourner l'état ACTUEL du rover
    GetEtat(): IEtatRover {
        return {
            GetPositionX: () => this.positionX,
            GetPositionY: () => this.positionY,
            GetOrientation: () => this.orientation
        };
    }

    //Fonction qui permet de retourner l'orientation du rover
    GetOrientation(): string {
        return this.orientation;
    }

    //Fonction qui permet de retourner la position sur l'axe des X du rover
    GetPositionX(): number {
        return this.positionX;
    }

    //Fonction qui permet de retourner la position sur l'axe des Y du rover
    GetPositionY(): number {
        return this.positionY;
    }
}

export { Rover };
