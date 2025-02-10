export interface IRover {
  Avancer(): IEtatRover;
  Reculer(): IEtatRover;
  TournerAGauche(): IEtatRover;
  TournerADroite(): IEtatRover;
}

export interface IEtatRover {
  GetPositionX(): EntierPositif;
  GetPositionY(): EntierPositif;
  GetOrientation(): Orientation;
}

export abstract class Orientation {
  static readonly NORD = 'N';
  static readonly EST = 'E';
  static readonly SUD = 'S';
  static readonly OUEST = 'W';
}

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
}