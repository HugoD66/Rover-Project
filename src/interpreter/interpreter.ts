import { MissionControl } from "../mission-control/mission-control-export";
import {RouterServer} from "../network/router-server";
import {InterpreterDirection} from "../rover/rover.interface";

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

  public executeCommand(command?: string): void {
    if (!command) return;

    let direction: string | null;

    switch (command) {
      case 'Z': direction = InterpreterDirection.AHEAD; break;
      case 'Q': direction = InterpreterDirection.LEFT;  break;
      case 'D': direction = InterpreterDirection.RIGHT; break;
      case 'S': direction = InterpreterDirection.BACK;  break;
      default:
        console.log("Commande inconnue:", command);
        return;
    }

    this.missionControl.executeCommand(direction);
  }

  public getMissionControl(): MissionControl {
    return this.missionControl;
  }
}
