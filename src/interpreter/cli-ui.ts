import { AbstractUI } from "./ui.interface";
import * as process from "node:process";

/**
 * Classe représentant l'interface utilisateur en ligne de commande (CLI)
 * Cette classe permet de gérer les entrées de l'utilisateur et d'afficher les informations pertinentes à la console.
 */
export class CliUI extends AbstractUI {
  
  /**
   * Démarre l'interface utilisateur en ligne de commande.
   * - Configure l'encodage des entrées
   * - Affiche l'aide au démarrage
   * - Attends et gère les entrées utilisateur
   */
  public start(): void {
    process.stdin.setEncoding('utf-8'); // Définit l'encodage des données d'entrée
    this.renderHelp(); // Affiche l'aide au démarrage

    // Écoute les entrées utilisateur
    process.stdin.on('data', (data: string) => {
      const input = data.trim().toUpperCase(); // Nettoie et met l'entrée en majuscule
      this.handleInput(input); // Traite l'entrée utilisateur
      this.display("Entrez la prochaine commande :"); // Invite l'utilisateur à entrer une nouvelle commande
    });
  }

  /**
   * Affiche un message d'erreur dans la console.
   * @param error - Le message d'erreur à afficher
   */
  public renderError(error: string): void {
    this.display("❌ Erreur : " + error + "\n"); // Affiche le message d'erreur avec un préfixe d'icône d'erreur
  }

  /**
   * Gère l'entrée de l'utilisateur.
   * - Exécute la commande entrée
   * - Si plusieurs caractères sont entrés, chaque caractère est traité séparément
   * @param message - Le message ou la commande entrée par l'utilisateur
   */
  private handleInput(message: string): void {
    if (message.length > 1) {
      // Si plusieurs caractères sont entrés, les traiter un par un
      for (let char of message) {
        this.interpreter.executeCommand(char, this);
      }
    } else {
      // Si un seul caractère est entré, l'exécuter directement
      this.interpreter.executeCommand(message, this);
    }
    
    // Met à jour l'état de l'interpréteur et l'affiche dans l'interface
    this.interpreter.renderState(this); 
  }
}
