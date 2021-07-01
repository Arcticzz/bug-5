class Boat{
    constructor(x,y,w,h,boatPos){
        var op = {
            restitution: 0.8,
            friction: 1,
            density: 1
        }
        this.boatImage = loadImage("assets/boat.png");
        this.width = w;
        this.height = h;
        this.boatPos = boatPos
        this.body = Bodies.rectangle(x, y, this.width, this.height, op);
        World.add(world, this.body);
    }
    display(){
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.boatImage, 0, this.boatPos, this.width, this.height);
    noTint()
    pop();
    }
}