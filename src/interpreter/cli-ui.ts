import { AbstractUI } from "./ui.interface";
import * as process from "node:process";

export class CliUI extends AbstractUI {
  public start(): void {
    process.stdin.setEncoding('utf-8');
    this.renderHelp();

    process.stdin.on('data', (data: string) => {
      const input = data.trim().toUpperCase();
      this.handleInput(input);
      this.display("Entrez la prochaine commande :");
    });
  }

  public renderError(error: string): void {
    this.display("❌ Erreur : " + error + "\n");
  }

  private handleInput(message: string): void {
    if (message.length > 1) {
      for (let char of message) {
        this.interpreter.executeCommand(char, this);
      }
    } else {
      this.interpreter.executeCommand(message, this);
    }
    this.interpreter.renderState(this); // ✅ CHANGEMENT ici : appeler interpreter.renderState
  }
}
