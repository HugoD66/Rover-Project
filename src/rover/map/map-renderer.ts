import { IRoverState } from "../rover.interface";
import { Obstacle } from "../obstacle/obstacle";

export function renderMapAscii(
  roverState: IRoverState,
  obstacles: Obstacle[],
  size: { width: number; height: number }
): string {
  let output = "";
  for (let y = 0; y < size.height; y++) {
    let row = "";
    for (let x = 0; x < size.width; x++) {
      if (
        x === roverState.getActualPositions().x &&
        y === roverState.getActualPositions().y
      ) {
        row += "R";  // rover
      } else if (obstacles.some(o => {
        const pos = o.getObstaclePosition();
        return pos.x === x && pos.y === y;
      })) {
        row += "X";  // obstacle
      } else {
        row += ".";
      }
    }
    output += row + "\n";
  }
  return output;
}
