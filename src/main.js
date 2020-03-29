import Display from "./display.js";
import Camera from "./camera.js";
import Controller from "./controller.js";
import Map from "./map.js";
import Vector from "./vector.js";
import {radians} from "./math.js";
import Picker from "./picker.js";
import Crosshairs from "./crosshairs.js";
import Debugger from "./debugger.js";

let display = new Display();

display.appendToBody();

let crosshairs = new Crosshairs();

crosshairs.appendToBody();

let map = new Map(display);
let camera = new Camera(map, 90, 800/600, 0.1, 1000, 8,8,16, 30,0);
let picker = new Picker(display, map);
let controller = new Controller(camera, display, picker, map);

let dbg = new Debugger(camera, map);

dbg.enable();
dbg.appendToBody();

let sun = new Vector(0,0,1);

sun.rotateX(radians(30));

display.onframe = () =>
{
	dbg.frame();
	
	let cx = Math.floor(camera.pos.x / 16);
	let cy = Math.floor(camera.pos.y / 16);
	
	for(let y = cy - 1; y <= cy + 1; y++) {
		for(let x = cx - 1; x <= cx + 1; x++) {
			map.loadChunk(x, y);
		}
	}
	
	controller.update(1/60);
	
	camera.aspect = display.getAspect();
	camera.update();
	
	picker.pick(camera.pos, camera.lookat, 16);
	
	map.update();
	
	map.draw(camera, sun);
	picker.draw(camera);
};
