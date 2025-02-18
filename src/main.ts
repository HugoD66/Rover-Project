import { Rover } from './class/rover';
import { Map } from './class/map';

function moveRover() {
    const map = new Map(5, 5);
    const rover = new Rover();

    rover.map = map;
    rover.goAhead();
    rover.turnOnRight();
    rover.goAhead();

    const position = rover.getActualPositions();
    const orientation = rover.getOrientation();

    console.log(`Position du rover : (${position.x}, ${position.y})`);
    console.log(`Orientation du rover : ${orientation}`);


}

moveRover();


/* const map = new Map(5, 5);
  const rover = new Rover(0, 0, Orientation.NORD, map);
  const obstacle = new Obstacle(1, 1)

  //Colision :
  //const interpreter =  new Interpreter(rover, ['A', 'G', 'G', 'G', 'A', 'A'], obstacle);

  //Pas de colision :
  const interpreter =  new Interpreter(rover, ['A', 'R', 'R', 'G', 'A', 'A'], obstacle);

  interpreter.execute();*/









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