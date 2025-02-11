// Interface générale pour le rover.
export interface IRover {
  Avancer(): IEtatRover;
  Reculer(): IEtatRover;
  TournerAGauche(): IEtatRover;
  TournerADroite(): IEtatRover;
}

// Interface pour avoir l'état actuel du rover
export interface IEtatRover {
  GetPositionX(): number;
  GetPositionY(): number;
  GetOrientation(): Orientation;
}

// Interface pour avoir les différentes orientations possibles
export abstract class Orientation {
  static readonly NORD = 'N';
  static readonly EST = 'E';
  static readonly SUD = 'S';
  static readonly OUEST = 'W';
}


// Exercice du typage non terminé
/*
export class EntierPositif {
  private value: number;

  constructor(value: number) {
    if (value < 0) {
      throw new Error('La valeur doit être positive');
    }
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }
}*/
