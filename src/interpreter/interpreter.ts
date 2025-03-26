import { MissionControl } from "../mission-control/mission-control-export";
import {RouterServer} from "../network/router-server";

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
    this.missionControl.executeCommand(command);
  }

  public getMissionControl(): MissionControl {
    return this.missionControl;
  }
}
