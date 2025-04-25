import { AbstractUI } from "./ui.interface";
import { Interpreter } from "./interpreter";
import { renderFullState } from "./shared-ui-renderer";
import * as net from "net";

export class RouterUI extends AbstractUI {
  constructor(
    protected interpreter: Interpreter,
    private socket: net.Socket
  ) {
    super(interpreter);
  }

  public start(): void {}

  public log(message: string): void {
    console.log(message);
  }

  public display(message: string): void {
    this.socket.write(message + "\n");
  }

  public renderState(): void {
    const output = renderFullState(this.interpreter.getMissionControl());
    this.socket.write(output + "\n");
  }

  public renderError(error: string): void {
    this.socket.write("❌ Erreur : " + error + "\n");
  }

  public shutdown(): void {
    this.socket.write("Connexion terminée. Au revoir !\n");
    this.socket.end();
  }
}
