/**
 * La classe `Coordinates` représente des coordonnées sur un plan 2D, 
 * avec des valeurs `x` et `y` pour la position.
 */
export class Coordinates {
  x: number; // Coordonnée horizontale (abscisse)
  y: number; // Coordonnée verticale (ordonnée)

  /**
   * Constructeur de la classe `Coordinates`.
   * 
   * @param x La coordonnée horizontale (abscisse).
   * @param y La coordonnée verticale (ordonnée).
   */
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Retourne une représentation sous forme de chaîne des coordonnées.
   * Exemple : "(5, 10)".
   * 
   * @returns Une chaîne représentant les coordonnées dans le format "(x, y)".
   */
  public toString(): string {
    return `(${this.x}, ${this.y})`;
  }
}
