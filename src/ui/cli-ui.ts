import { Interpreter } from "../interpreter/interpreter-export";
import {renderMapAscii} from "./map-renderer";

export class CliUI {
  private interpreter: Interpreter;

  constructor(interpreter: Interpreter) {
    this.interpreter = interpreter;
  }

  public start() {
    process.stdin.setEncoding('utf-8');
    console.log("Tape tes commandes (Z, Q, D, S) directement ici dans le terminal:");

    process.stdin.on('data', (data: string) => {
      const input = data.trim().toUpperCase();
      this.handleInput(input);
    });
  }

  private handleInput(message: string) {
    if(message.length > 1 ) {
      for(let messageUnit of message) {
        this.interpreter.executeCommand(messageUnit);
      }
    } else {
      this.interpreter.executeCommand(message);
    }

    const roverState = this.interpreter.getMissionControl().getRoverState();

    // 3) Afficher un petit résumé
    console.log("\nCommande(s) exécutée(s):", message);
    console.log('🛸 Orientation du Rover : ', roverState.getOrientation());
    console.log('🪐 Positions du Rover : ', roverState.getActualPositions());

    // 4) (Optionnel) Si tu veux dessiner ta map ASCII :
    this.drawAsciiMap();

    console.log("Entrez la prochaine commande :");
  }

  private drawAsciiMap() {
    const mc = this.interpreter.getMissionControl();
    const roverState = mc.getRoverState();

    // Récupérer les obstacles
    const obstacles = mc.getObstacles();  // => Obstacle[]

    // Récupérer la taille de la map
    const { width, height } = mc.getMapSize();

    // Appeler ta fonction d'affichage ASCII
    const mapOutput = renderMapAscii(roverState, obstacles, {width, height});
    console.log(mapOutput);
  }
}
