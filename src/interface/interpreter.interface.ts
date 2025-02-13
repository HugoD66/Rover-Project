export interface IInterpreter {
    // Exécute les commandes du rover
    Execute(): void;
}

export abstract class InterpreterDirection {
  static readonly AVANCER = 'A';
  static readonly DROITE = 'D';
  static readonly GAUCHE = 'G';
  static readonly RECULER = 'R';
}
