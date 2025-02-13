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

    interpreter.Execute();
}

moveRover();


/*const states = [];
   states.push(rover.Avancer());
   states.push(rover.Avancer());
   states.push(rover.TournerADroite());
   states.push(rover.Avancer());
   states.push(rover.Avancer());

   states.forEach((state, index) => {
       console.log(`Étape ${index + 1}:`, {
           x: state.GetPositionX(),
           y: state.GetPositionY(),
           orientation: state.GetOrientation()
       });
   });

   return states;
   */