import { Interpreter } from "./interpreter";
import { renderFullState } from "./shared-ui-renderer"; // ✅ Ajout de l'import

export interface IUI {
  start(): void;
  display(message: string): void;
  renderState(): void;
  renderError?(error: string): void;
  renderHelp?(): void;
  shutdown?(): void;
}

export abstract class AbstractUI implements IUI {
  constructor(protected interpreter: Interpreter) {}

  abstract start(): void;

  public display(message: string): void {
    console.log(message);
  }

  public renderState(): void {
    const output = renderFullState(this.interpreter.getMissionControl()); // ✅ Utilisation de renderFullState
    this.display(output);
  }

  public renderError(error: string): void {
    console.error("❌ Erreur :", error);
  }

  public renderHelp(): void {
    this.display("──────────── Panel des commandes : ");
    this.display("↑ Z : Avancer");
    this.display("<- Q : Tourner à gauche");
    this.display("-> D : Tourner à droite");
    this.display("↓ S : Reculer");
    this.display("────────────");
  }

  public shutdown(): void {
    this.display("Arrêt du programme.");
  }
}
