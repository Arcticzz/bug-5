const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls = [];
var boats = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  
}

function setup() {
  canvas = createCanvas(windowWidth - 200, windowHeight - 150);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(width / 2 - 650, height - 320, 250, 580);
  cannon = new Cannon(width / 2 - 600, height / 2 - 220, 120, 40, angle);

  
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

 

  Engine.update(engine);
  ground.display();

 showBoats()

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    for (var j = 0; j < boats.length; j++) {
      if (balls[i]!==undefined && boats[i]!==undefined ){
        var collision = Matter.SAT.collides(balls[i].body, boats[j].body)
        if (collision.collided){
          boats[j].remove(j)
          Matter.World.remove(world,balls[i].body)
          balls.splice(i,1)
          i--
        }
      }
    }
  }
//Matter.Body.setVelocity(boat.body, {x:-1,y:0})
  cannon.display();
  tower.display();

 
  
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}

//function to show the ball
function showCannonBalls(ball, index) {
  ball.display();
  if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
    Matter.World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}

function showBoats(){
 if(boats.length > 0){
   if(boats.length < 4 && boats[boats.length - 1].body.position.x < width - 300){
     var p = [-130, -100, -80, - 120, -110]
     var p1 = random(p)
      var boat = new Boat (width, height - 100, 200, 200, p1)
      boats.push(boat)
      
   }
   for(var i = 0; i < boats.length; i ++){
    Matter.Body.setVelocity(boats[i].body, {x:-2,y:0})
    boats[i].display()
   }
 }
 else {
   var boat = new Boat(width, height -100, 200,200, - 100)
   boats.push(boat)
 }
}


function keyReleased() {
  if (keyCode === DOWN_ARROW) { 
    balls[balls.length - 1].shoot();
  }
}


