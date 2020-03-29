export default class Controller
{
	constructor(camera, display, picker, map)
	{
		let canvas = display.canvas;
		
		this.canvas = canvas;
		this.camera = camera;
		this.picker = picker;
		this.map = map;
		this.keymap = {};
		this.locked = false;
		this.movespeed = 8;
		
		window.addEventListener("keydown", e => this.keydown(e));
		window.addEventListener("keyup", e => this.keyup(e));
		canvas.addEventListener("mousedown", e => this.mousedown(e));
		canvas.addEventListener("mousemove", e => this.mousemove(e));
		document.addEventListener("pointerlockchange", e => this.lockchange(e));
	}
	
	getKey(e)
	{
		let key = e.key.toLowerCase();
		
		if(key === " ") {
			key = "space";
		}
		
		return key;
	}
	
	keydown(e)
	{
		let key = this.getKey(e);
		
		this.keymap[key] = true;
	}
	
	keyup(e)
	{
		let key = this.getKey(e);
		
		this.keymap[key] = false;
	}
	
	mousedown(e)
	{
		if(this.locked) {
			if(e.button === 0 && this.picker.hasHit) {
				this.map.setBlock(...this.picker.hitVox, 0);
			}
		}
		else {
			this.canvas.requestPointerLock();
			this.locked = true;
		}
	}
	
	mousemove(e)
	{
		if(this.locked) {
			this.camera.rx -= e.movementY;
			this.camera.rz -= e.movementX;
		}
	}
	
	lockchange(e)
	{
		if(document.pointerLockElement !== this.canvas) {
			this.locked = false;
		}
	}
	
	update(delta)
	{
		if(this.keymap.w) {
			this.camera.moveForward(delta * this.movespeed);
		}
		if(this.keymap.s) {
			this.camera.moveBackward(delta * this.movespeed);
		}
		if(this.keymap.d) {
			this.camera.moveRightward(delta * this.movespeed);
		}
		if(this.keymap.a) {
			this.camera.moveLeftward(delta * this.movespeed);
		}
		if(this.keymap.space) {
			this.camera.moveUpward(delta * this.movespeed);
		}
		if(this.keymap.shift) {
			this.camera.moveDownward(delta * this.movespeed);
		}
	}
}
