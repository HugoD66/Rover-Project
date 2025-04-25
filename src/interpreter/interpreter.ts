import { MissionControl } from "../mission-control/mission-control";
import { RouterServer } from "../network/router-server";
import { InterpreterDirection } from "../rover/rover.interface";
import { IUI } from "./ui.interface";

export class Interpreter {
  private missionControl: MissionControl;
  private routerServer: RouterServer | null = null;

  public constructor(missionControl: MissionControl) {
    this.missionControl = missionControl;
  }

  public startServer(host: string, port: number): void {
    this.routerServer = new RouterServer(host, port, this);
    this.routerServer.start();
  }

  public executeCommand(command?: string, ui?: IUI): void {
    if (!command) return;

    let direction: string | null;

    switch (command) {
      case 'Z': direction = InterpreterDirection.AHEAD; break;
      case 'Q': direction = InterpreterDirection.LEFT; break;
      case 'D': direction = InterpreterDirection.RIGHT; break;
      case 'S': direction = InterpreterDirection.BACK; break;
      default:
        (ui?.renderError?.(`Commande inconnue : ${command}`)) || console.log("Commande inconnue :", command);
        return;
    }

    this.missionControl.executeCommand(direction);
    this.reportRoverMessage(ui);
  }

  public getMissionControl(): MissionControl {
    return this.missionControl;
  }

  private reportRoverMessage(ui?: IUI): void {
    const rover = this.missionControl.getRover();
    const message = rover.getLastMessage?.();
    if (!message) return;

    ui?.display?.(message);

    rover.clearLastMessage?.();
  }
}
