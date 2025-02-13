import {IRover, IEtatRover, Orientation} from '../interface/rover.interface';
import {Map} from './map';

//Sert à instancier une classe Rover / Deplacer / Tourner
export class Rover implements IRover, IEtatRover {
    private positionX: number;
    private positionY: number;
    private orientation: string;

    private map: Map;

    constructor(
      initialX: number,
      initialY: number,
      initialOrientation: string,
      map: Map
    ) {
        this.positionX = initialX;
        this.positionY = initialY;
        this.orientation = initialOrientation;
        this.map = map;
    }

    //Fonction qui retourne la prochaine position du rover ( vecteur )
    public calculateNextPosition(moveForward: boolean): { x: number; y: number } {
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

        return this.map.validatePosition(newX, newY);
    }

    //Fonction qui permet de déplacer le rover
    private move(moveForward: boolean): IEtatRover {
        const nextPosition = this.calculateNextPosition(moveForward);

        this.positionX = nextPosition.x;
        this.positionY = nextPosition.y;
        return this.GetEtat();
    }

    //Fonction qui permet de déplacer le rover en avant
    Avancer(): IEtatRover {
        return this.move(true);
    }

    //Fonction qui permet de déplacer le rover en arrière
    Reculer(): IEtatRover {
        return this.move(false);
    }

    // Méthode permettant de tourner le rover de 90 degrés vers la gauche.
    // Se référe à un tableau pour calculer le nouvel index avec modulo pour boucler,
    // met à jour l'orientation et retourne l'état actuel du rover.
    TournerAGauche(): IEtatRover {
        const directions = [Orientation.NORD, Orientation.OUEST, Orientation.SUD, Orientation.EST];
        const currentIndex = directions.indexOf(this.orientation);
        const nextIndex = (currentIndex + 1) % directions.length;
        this.orientation = directions[nextIndex];
        return this.GetEtat();
    }

    // Méthode permettant de tourner le rover de 90 degrés vers la droite.
    // Se référe à un tableau et calculer le nouvel index avec modulo pour boucler,
    // met à jour l'orientation et retourne l'état actuel du rover.
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