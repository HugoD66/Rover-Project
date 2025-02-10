export interface IRover {
  Avancer(): IEtatRover;
  Reculer(): IEtatRover;
  TournerAGauche(): IEtatRover;
  TournerADroite(): IEtatRover;
}

export interface IEtatRover {
  GetPositionX(): number;
  GetPositionY(): number;
  GetOrientation(): Orientation;
}

export abstract class Orientation {
  static readonly NORD = 'N';
  static readonly EST = 'E';
  static readonly SUD = 'S';
  static readonly OUEST = 'W';
}
