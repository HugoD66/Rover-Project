import { MissionControl } from "../mission-control/mission-control";
import { RouterServer } from "../network/router-server";
import { InterpreterDirection } from "../rover/rover.interface";
import { IUI } from "./ui.interface";
import { renderFullState } from "./shared-ui-renderer"; // ✅ Ajouté

export class Interpreter {
  private missionControl: MissionControl;
  private routerServer: RouterServer | null = null;
  private lastMoveFailed = false; // ✅ ajouté

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

    const moveResult = this.missionControl.executeCommand(direction); // ✅ récupérer le résultat du mouvement

    if (moveResult) {  // Ajouter une vérification pour moveResult
      this.lastMoveFailed = !moveResult.success; // ✅ Si success = false, alors il y a collision
      this.reportRoverMessage(ui);
    } else {
      console.error("Le mouvement a échoué, le résultat est undefined.");
    }
  }

  public getMissionControl(): MissionControl {
    return this.missionControl;
  }

  public renderState(ui: IUI): void {
    ui.display(renderFullState(this.missionControl, this.lastMoveFailed)); // ✅ Afficher obstacles seulement si collision
  }

  private reportRoverMessage(ui?: IUI): void {
    const rover = this.missionControl.getRover();
    const message = rover.getLastMessage?.();
    if (!message) return;

    ui?.display?.(message);

    rover.clearLastMessage?.();
  }
}
