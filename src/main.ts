import { Rover } from './class/rover';
import { Orientation } from './interface/rover.interface';

function moveRover() {
    const rover = new Rover(0, 0, Orientation.NORD, 5, 5);

    const states = [];
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
}

moveRover();
