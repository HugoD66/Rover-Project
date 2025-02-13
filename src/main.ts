import { Rover } from './class/rover';
import { Orientation } from './interface/rover.interface';
import { Map } from './class/map';
import {Obstacle} from "./class/obstacle";
import {Interpreter} from "./class/interpreter";

function moveRover() {
    const map = new Map(5, 5);
    const rover = new Rover(0, 0, Orientation.NORD, map);
    const obstacles = new Obstacle(1, 1)
    const interpreter =  new Interpreter(map, rover, ['A', 'D', 'G', 'G', 'G', 'G', 'G', 'A', 'A'], obstacles);



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