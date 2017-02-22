var shipes = [];
var asteroides = [];
var guns = [];
var points = 0;
var shot = 0;
var canvas;
var ctx;
var game_over = false;
var pressing = [];


function Ship(id, x, y, radious, velocidad, estilo) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.radious = radious;
  this.estilo = estilo;
  this.velocidad = velocidad;
  this.speedX = 0;
  this.speedY = 0;

  this.ship = function(){
    img = new Image();
    img.src = 'nave.png';
    ctx.drawImage(img, this.x-15, this.y-15, 100, 50);
  }

  this.move = function() {

    this.y = this.y + this.speedY;
    this.x = this.x + this.speedX;

    if (this.x  > canvas.width){
      this.x = 0;
    }else if (this.x + this.radious < 0){
      this.x = canvas.width;
    }
    if(this.y > canvas.height){
      this.y = 0;
    }else if (this.y + this.radious <00){
      this.y = canvas.height;
    }

    drawShapes();
    return this.y;

  }

}

function Asteroide(id, x, y, radious, velocidad, estilo, sx) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.radious = radious;
  this.estilo = estilo;
  this.velocidad = velocidad;
  this.sx = sx;

  this.asteroide = function(){
    img = new Image();
    img.src = 'asteroide.png';
    ctx.drawImage(img, this.x-20, this.y-20, 60, 60);
  }

  this.move = function(despx) {
    this.x = this.x + despx;
    drawShapes();
  }

}

function Gun(id, x, y, radious, color){
	this.id = id; 
	this.x = x;
	this.y = y;
	this.disparo = 'o';
	this.radious = radious;
	this.color = color;


	this.gun = function(){
	    ctx.beginPath();
	    ctx.arc(this.x, this.y, this.radious, 0, 2 * Math.PI, false);
	    ctx.fillStyle = this.color;
	    ctx.fill();
	}

	this.move = function(despx){
		this.x = this.x + despx;
	}


}

function drawShapes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '40px PressStart2PRegular';
    ctx.fillText('Space Galaxy', 250, 50);
    ctx.font = '10px PressStart2PRegular';

    var score = 'Score: ' + points;
    ctx.fillText(score, 50, 25);

    if (game_over){
        gameOver();
    }else{
      for(x in asteroides) {
          asteroides[x].asteroide();
        }
    }
      shipes[0].ship();
   
      for (x in guns){
 		     guns[x].gun();
      }

    }

function getgun(id) {
  for(x in guns) {
    if(guns[x].id === id)
      return guns[x];
  }
}

function create_gun(){
	var obj = shipes[0];
  guns.push(new Gun('gun', obj.x+80, obj.y+20, 7.5, 'rgba(255, 035, 001, 0.5)'));
  
}

function shot_gun(){
  var obj = getgun('gun');
  if(obj !== undefined)
  {
    for (x in guns){
        guns[x].move(+7);
    }
    }

  }


function disparado(){
  for (x in guns){
    if(guns[0].x > canvas.width - guns[x].radious){
        guns.splice(x, 1);

      }
    }
}



function colision_shot(){
  var distancia_max, distancia;
  for (x in guns){
    var obj = guns[x];
      for (x in asteroides){
          distancia_max = obj.radious + asteroides[x].radious;
          dist_x = asteroides[x].x - obj.x;
          dist_y = asteroides[x].y - obj.y;
          distancia = Math.floor(Math.sqrt(Math.pow(dist_x, 2) + Math.pow(dist_y,2)));
          if (distancia < distancia_max){
            points += 500;
            asteroides[x].x = canvas.width;
            asteroides[x].y = num_random(400,200);
          }
        
        }
      }
    }


function getShape(id) {
  for(x in asteroides) {
    if(asteroides[x].id === id)
      return asteroides[x];
  }
}

function keydown(evt){
	pressing[evt.keyCode]=true;
}

function keyup(evt){
	pressing[evt.keyCode]=false;
}

function keyHandler(event) {
  var obj_key = shipes[0];
  if(obj_key === undefined)
    return;

  var KEY_LEFT=37;
  var KEY_UP=38;
  var KEY_RIGHT=39;
  var KEY_DOWN=40;
  var ESPACE=32;
  var ENTER=13;


  if (!game_over){

  if (pressing[KEY_RIGHT]){
    obj_key.speedX += 0.35;
  }
  if (pressing[KEY_LEFT]){
       obj_key.speedX -= 0.35;
  }
  if (pressing[KEY_UP]){
        obj_key.speedY -= 0.35;
  }
  if (pressing[KEY_DOWN]){
        obj_key.speedY += 0.35;
  }
  if (pressing[ESPACE]){
    if (shot < 0){
        create_gun();
        shot = 10;
    }  
  }
}
if (pressing[ENTER]){
  start_game();
}

  obj_key.move();
}
var num_random = function(N,M){
  var rand_num;
  rand_num = Math.floor((Math.random()*(N-M))+M);
  return rand_num;
}

function mover_asteroide(){
	for(x in asteroides){
		var obj = asteroides[x];
		if (obj != undefined){
			obj.move(obj.velocidad);
			if (obj.x < 0){
				obj.x = canvas.width;
				obj.y = num_random(500,200);
			}
		}
		drawShapes();

	}

}


function collision(){
  var radio_ship = shipes[0].radious;
  var x_ship = shipes[0].x;
  var y_ship = shipes[0].y;
  var distancia_max;
  var distancia;
  var explosion = false;
  for (x in asteroides){
    if (asteroides[x].id != shipes[0].id){
      distancia_max = radio_ship + asteroides[x].radious;
      dist_x = asteroides[x].x - x_ship;
      dist_y = asteroides[x].y - y_ship;
      distancia = Math.floor(Math.sqrt(Math.pow(dist_x, 2) + Math.pow(dist_y,2)));
      if (distancia <= distancia_max){
         game_over = true;
         asteroides[x].y = num_random(400,200);
         asteroides[x].x = canvas.width;
      }

    }
  }

}

function gameOver(){
  ctx.font = '40px PressStart2PRegular';
  ctx.fillText('GAME OVER', canvas.width*0.32, canvas.height*0.5);
  ctx.font = '10px PressStart2PRegular';

  ctx.fillText('Pressing Enter to star again', canvas.width*0.36, canvas.height*0.55);
  shipes[0].speedY =0;
  shipes[0].speedX =0;

}

function start_game(){
    shipes.length = 0;
    asteroides.length = 0;
    guns.length = 0;
    game_over = false;
    points = 0;
    crear_obj();
  
}


function render() {
  shot_gun();
  disparado();
  colision_shot();
  mover_asteroide();
  collision();
  shot += -1;
}

function crear_obj (){

  shipes.push(new Ship("c0", 100, 150, 30, 'rgba(255, 0, 0, 0.5)'));
  asteroides.push(new Asteroide("c1", canvas.width, num_random(450,350), 20, num_random(-4, -8), 'asteroide_malo'));
  asteroides.push(new Asteroide("c2", canvas.width, num_random(300,200), 20, num_random(-5, -8), 'asteroide_malo'));
  asteroides.push(new Asteroide("c3", canvas.width, num_random(500,300), 20, num_random(-5, -10), 'asteroide_malo'));
  asteroides.push(new Asteroide("c4", canvas.width, num_random(500,450), 20, num_random(-5, -9), 'asteroide_malo'));

}

function main() {
  var image = document.getElementById('myImage');
  canvas = document.getElementById('example');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }

  ctx = canvas.getContext('2d');
  document.addEventListener('keydown', keydown, false);
  document.addEventListener('keyup', keyup, false);

  start_game();

  setInterval(render, 50);
  setInterval(keyHandler, 15);


}
