import { Interpreter } from "./interpreter";
import { renderFullState } from "./shared-ui-renderer"; // ✅ Ajout de l'import nécessaire

/**
 * Interface représentant une UI (interface utilisateur) pour le contrôle du rover.
 * Elle définit les méthodes essentielles pour démarrer l'UI, afficher des messages et rendre l'état de la mission.
 */
export interface IUI {
  /**
   * Démarre l'interface utilisateur.
   */
  start(): void;

  /**
   * Affiche un message dans l'interface.
   * 
   * @param message Le message à afficher.
   */
  display(message: string): void;

  /**
   * Rend l'état actuel du rover et de la mission à l'interface.
   */
  renderState(): void;

  /**
   * Affiche un message d'erreur (optionnel).
   * 
   * @param error Le message d'erreur à afficher.
   */
  renderError?(error: string): void;

  /**
   * Affiche l'aide (optionnel).
   */
  renderHelp?(): void;

  /**
   * Ferme l'interface utilisateur et arrête le programme (optionnel).
   */
  shutdown?(): void;
}

/**
 * Classe abstraite qui implémente l'interface IUI et fournit une structure de base
 * pour les interfaces utilisateur utilisant un interpréteur.
 * Les classes dérivées devront fournir l'implémentation de la méthode `start()`.
 */
export abstract class AbstractUI implements IUI {
  /**
   * Constructeur pour initialiser l'UI avec un interpréteur.
   * 
   * @param interpreter L'interpréteur de commande à associer à cette UI.
   */
  constructor(protected interpreter: Interpreter) {}

  /**
   * Méthode abstraite que les classes dérivées devront implémenter pour démarrer l'UI.
   */
  abstract start(): void;

  /**
   * Affiche un message dans la console.
   * 
   * @param message Le message à afficher.
   */
  public display(message: string): void {
    console.log(message);
  }

  /**
   * Rend l'état actuel du rover et de la mission et l'affiche dans l'UI.
   * Utilise la fonction `renderFullState` pour générer le rendu de l'état de la mission.
   */
  public renderState(): void {
    const output = renderFullState(this.interpreter.getMissionControl()); // ✅ Utilisation de `renderFullState` pour générer l'état
    this.display(output); // Affichage du rendu dans l'UI
  }

  /**
   * Affiche un message d'erreur dans la console.
   * 
   * @param error Le message d'erreur à afficher.
   */
  public renderError(error: string): void {
    console.error("❌ Erreur :", error); // Utilisation de `console.error` pour l'affichage des erreurs
  }

  /**
   * Affiche un panel d'aide avec les commandes disponibles.
   */
  public renderHelp(): void {
    this.display("──────────── Panel des commandes : ");
    this.display("↑ Z : Avancer");
    this.display("<- Q : Tourner à gauche");
    this.display("-> D : Tourner à droite");
    this.display("↓ S : Reculer");
    this.display("────────────");
  }

  /**
   * Ferme l'interface utilisateur et affiche un message d'arrêt.
   */
  public shutdown(): void {
    this.display("Arrêt du programme.");
  }
}
