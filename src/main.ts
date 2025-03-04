import { Rover } from './class/rover';
import { Map } from './class/map';
import {Obstacle} from "./class/obstacle";
import {InterpreterDirection} from "./interface/rover.interface";

function moveRover() {
    const map = new Map(5, 5, [new Obstacle(0, 2)]);
    const rover = new Rover(map);



    rover.setCommandLine(
      [InterpreterDirection.AHEAD, InterpreterDirection.AHEAD, InterpreterDirection.AHEAD, InterpreterDirection.AHEAD]
    )
    rover.executeCommandLine();
    /*
    Without commandline :
    rover.goAhead();
    rover.turnOnRight();
    rover.goAhead();
    const position = rover.getActualPositions();
    const orientation = rover.getOrientation();
    console.log(`Position du rover : (${position.x}, ${position.y})`);
    console.log(`Orientation du rover : ${orientation}`);
    */

    const position = rover.getActualPositions();
    const orientation = rover.getOrientation();
    console.log(`Position du rover : (${position.x}, ${position.y})`);
    console.log(`Orientation du rover : ${orientation}`);

}

moveRover();
