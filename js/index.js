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




//Variables:
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let startDiv = document.getElementById("start");
let gameOverScreen = document.getElementById("game-over");
const startButton = document.querySelector("#start-button");
let myObstacles = [];
let obsImages = [hamburguerImg, sodaImg, bananasImg, appleImg, orangeImg, grapesImg, watermelonImg];

let superheroX = canvas.width/2-15;
let cloudsY = 0;

canvas.style.border = '4px solid black';

let isMovingLeft = false;
let isMovingRight = false;

randomX =0;
randomY = 0;

//Game Variables:
let animateId = 0;
let isGameOver = false;



window.addEventListener ('load', () => {
canvas.style.display = 'none';

 startButton.addEventListener('click', () => {
    startGame();    
 })

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
}


setInterval(() => {
   new Obstacle(randomX, randomY, 80, 80)
    }, 2000);



function animate() {
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(cloudsImg, 0, cloudsY, canvas.width, canvas.height);
    ctx.drawImage(superheroImg, superheroX, 380, 80, 100);
    if(isGameOver === true) {
        cancelAnimationFrame(animateId); 
    } else {
        animateId = requestAnimationFrame(animate);
    }


   
      


  if (isMovingLeft === true) {
    superheroX -= 2
  }
  if (isMovingRight === true) {
    superheroX += 2
  }
  
  if (superheroX < 0) {
    superheroX = 0;
  }
  if (superheroX >= canvas.width - 50) {
    superheroX = canvas.width - 50;
  }

}

function gameOver() {
    startDiv.style.display = "none";
    canvas.style.display = "none";
    gameOverScreen.style.display = "block"; // Element is rendered as a block-level element
}
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
    // Making the superhero stop
    isMovingLeft = false
    isMovingRight = false
  })
  