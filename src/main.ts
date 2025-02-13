import { Rover } from './class/rover';
import { Orientation } from './interface/rover.interface';
import { Map } from './class/map';
import {Obstacle} from "./class/obstacle";
import {Interpreter} from "./class/interpreter";

function moveRover() {
    const map = new Map(5, 5);
    const rover = new Rover(0, 0, Orientation.NORD, map);
    const obstacle = new Obstacle(1, 1)

    //Colision :
    //const interpreter =  new Interpreter(rover, ['A', 'G', 'G', 'G', 'A', 'A'], obstacle);

    //Pas de colision :
    const interpreter =  new Interpreter(rover, ['A', 'R', 'R', 'G', 'A', 'A'], obstacle);

    interpreter.execute();
}

moveRover();