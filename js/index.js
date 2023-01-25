console.log('JS connected'); // <== just a quick check up to make sure js doc is connected properly


//Images:
const bgImg = new Image(); // Create new <img> element
bgImg.src = '../images/yellow-animals-background.jpg'; // Set source path

const cloudsImg = new Image(); 
cloudsImg.src = '../images/clouds-background.jpg'; 

const superheroImg = new Image(); 
superheroImg.src = '../images/superhero-dog.png'; 

const livesImg = new Image(); 
livesImg.src = '../images/heart.png'; 

const sodaImg = new Image(); 
sodaImg.src = '../images/soda.png'; 

const hamburguerImg = new Image(); 
hamburguerImg.src = '../images/hamburger.png'; 

const appleImg = new Image(); 
appleImg.src = '../images/apple.png'; 

const bananasImg = new Image(); 
bananasImg.src = '../images/bananas.png'; 

const orangeImg = new Image(); 
orangeImg.src = '../images/orange.png'; 

const grapesImg = new Image(); 
grapesImg.src = '../images/grapes.png'; 

const watermelonImg = new Image(); 
watermelonImg.src = '../images/watermelon.png'; 

const broccoliImg = new Image(); 
broccoliImg.src = '../images/broccoli.png'; 


//Music:
let jungleSound = new Audio(); 
jungleSound.volume = 0.1;

let music = new Audio("./audio/Happy-Tree-Friends.mp3"); 
music.volume = 0.2;

let yeySound = new Audio(); 
yeySound.volume = 0.1;

//let gameOverAudio = new Audio(./audio/fail-trombone-03.wav); 
//gameOverAudio.volume = 0.1;




//Variables:
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let startDiv = document.getElementById("start");
let gameOverScreen = document.getElementById("game-over");
const startButton = document.querySelector("#start-button");
const restartButton = document.querySelector("#restart-button");

let myObstacles = [];
let obsImages = [hamburguerImg, sodaImg, bananasImg, appleImg, orangeImg, grapesImg, watermelonImg, broccoliImg];

let superheroX = canvas.width/2-15;
let superheroY = 380; 
let superheroWidth = 80;
let superheroHeight = 100;
let cloudsY = 0;

canvas.style.border = '4px solid black';

let isMovingLeft = false;
let isMovingRight = false;

//Game Variables:
let animateId = 0;
let isGameOver = false;



window.addEventListener ('load', () => {
  canvas.style.display = 'none';
  startDiv.style.display = "block";
  gameOverScreen.style.display = "none";
      


  startButton.addEventListener('click', () => {
      startGame();    
  })

  restartButton.addEventListener('click', () => {
      startGame();    
  })

  // Moving the superhero:
document.addEventListener('keydown', event => {
  console.log(event);
  if (event.code == 'ArrowLeft') {
    // move superhero to the left
    isMovingLeft = true
  }
  if (event.code == 'ArrowRight') {
    // move superhero to the right
    isMovingRight = true
  }
})


document.addEventListener('keyup', (event) => {
  // making the superhero stop
  isMovingLeft = false
  isMovingRight = false
})
})


//function initialScreen() {
  //startDiv.style.display = "block";
    //canvas.style.display = "none"; 
    //gameOverScreen.style.display = "none";
    
  
//
//}


function startGame() {
    startDiv.style.display = "none";
    canvas.style.display = "block"; // Element is rendered as a block-level element
    gameOverScreen.style.display = "none";
    animate();
}


class Obstacle{
  constructor(x,y,width,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = obsImages[Math.floor(Math.random() * obsImages.length)];
  }
  drawObstacle() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  checkCollision() {
    if (
      superheroX < this.x + this.width &&
      superheroX + superheroWidth > this.x &&
      superheroY < this.y + this.height &&
      superheroHeight + superheroY > this.y
    ) {
      isGameOver = true
    }
  }
}

  
function animate() {
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(cloudsImg, 0, cloudsY, canvas.width, canvas.height);
    ctx.drawImage(superheroImg, superheroX, superheroY, superheroWidth, superheroHeight);
   
    if(animateId % 100 === 0) {
      myObstacles.push (new Obstacle(Math.random() * canvas.width, -80, 80, 80));
    } 

    myObstacles.forEach(obstacle => {
      obstacle.drawObstacle();
      obstacle.y += 2;
      obstacle.checkCollision();
    })      


 // score: function () {
   // const points = Math.floor(this.frames / 5);
    //this.context.font = '18px serif';
    //this.context.fillStyle = 'black';
   // this.context.fillText(`Score: ${points}`, 350, 50);
  //}


       
  if (isMovingLeft === true) {
    superheroX -= 6
  }
  if (isMovingRight === true) {
    superheroX += 6
  }
  
  if (superheroX < 0) {
    superheroX = 0;
  }
  if (superheroX >= canvas.width - 50) {
    superheroX = canvas.width - 50;
  }



         if(isGameOver === true) {
          cancelAnimationFrame(animateId); 
          gameOver();
      } else {
          animateId = requestAnimationFrame(animate);
      }
    }
  

function gameOver() {
    startDiv.style.display = "none";
    canvas.style.display = "none";
    gameOverScreen.style.display = "block"; // Element is rendered as a block-level element


      }

  


