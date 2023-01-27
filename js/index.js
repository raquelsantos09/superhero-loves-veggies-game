console.log('JS connected'); // <== just a quick check up to make sure js doc is connected properly


//Images:
const bgImg = new Image(); // Create new <img> element
bgImg.src = './images/yellow-animals-background.jpg'; // Set source path

const cloudsImg = new Image(); 
cloudsImg.src = './images/clouds-background.jpg'; 

const superheroImg = new Image(); 
superheroImg.src = './images/superhero-dog.png'; 

const livesImg = new Image(); 
livesImg.src = './images/heart.png'; 

const sodaImg = new Image(); 
sodaImg.src = './images/soda.png'; 

const hamburguerImg = new Image(); 
hamburguerImg.src = './images/hamburger.png'; 

const appleImg = new Image(); 
appleImg.src = './images/apple.png'; 

const bananasImg = new Image(); 
bananasImg.src = './images/bananas.png'; 

const orangeImg = new Image(); 
orangeImg.src = './images/orange.png'; 

const grapesImg = new Image(); 
grapesImg.src = './images/grapes.png'; 

const watermelonImg = new Image(); 
watermelonImg.src = './images/watermelon.png'; 

const broccoliImg = new Image(); 
broccoliImg.src = './images/broccoli.png'; 



//Music:
let jungleSound = new Audio(); 
jungleSound.volume = 0.1;

let music = new Audio("./audio/Happy-Tree-Friends.mp3"); 
music.volume = 0.05;

let yeySound = new Audio("audio/2090_small-dog-bark-01.mp3"); 
yeySound.volume = 0.1;

let ohNoSound = new Audio("audio/1565_man-saying-im-in-touble-01.wav"); 
ohNoSound.volume = 0.2;

let gameOverAudio = new Audio("./audio/fail-trombone-03.wav"); 
gameOverAudio.volume = 0.1;

let winAudio = new Audio("./audio/win-sound.mp3"); 
winAudio.volume = 0.1;


//Variables:
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let startDiv = document.getElementById("start");
let gameOverScreen = document.getElementById("game-over");
let youWinScreen = document.getElementById("you-win");
const startButton = document.querySelector("#start-button");
const restartButton = document.getElementById("restart-button");
//const restartButtonWin = document.getElementById("restart-button-win");
let livesDiv = document.getElementById("player-lives");
let lives = document.querySelectorAll(".heart-img");
let heart1 = document.getElementById("heart1");
let heart2 = document.getElementById("heart2");
let heart3 = document.getElementById("heart3");
const footer = document.querySelector(".footer");
let scoreSpan = document.getElementById("score");
let scoreSpan2 = document.getElementById("score2");
let score = 0;
let speed = 2;

let badObstacles = [];
let goodObstacles = [];
let obsBadImages = [hamburguerImg, sodaImg];
let obsGoodImages = [bananasImg, appleImg, orangeImg, grapesImg, watermelonImg, broccoliImg];

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
let playerLives = 3;



//START SCREEN:
window.addEventListener ('load', () => {
  canvas.style.display = 'none';
  startDiv.style.display = "block";
  gameOverScreen.style.display = "none";
  livesDiv.style.display = "none";
  youWinScreen.style.display = "none";
  
  
  startButton.addEventListener('click', () => {
    startGame();
  })
  
  restartButton.addEventListener("click",() => {
    window.location.reload()
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
      isMovingLeft = false;
      isMovingRight = false;
    })
  })
  

 
 //GAME SCREEN:
 function startGame() {
   startDiv.style.display = "none";
   canvas.style.display = "block"; // Element is rendered as a block-level element
   gameOverScreen.style.display = "none";
   livesDiv.style.display = "flex";
   animate();
   music.loop = true;
   music.play();
  footer.style.display = "none";

  }
  
  

  //Good and bad obstacles and collisions: 
  class goodObstacle{
    constructor(x,y,width,height){
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.image = obsGoodImages[Math.floor(Math.random() * obsGoodImages.length)];
  }
  drawObstacle() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  checkCollision(goodObstacle) {
    if (
      superheroX < this.x + this.width &&
      superheroX + superheroWidth > this.x &&
      superheroY < this.y + this.height &&
      superheroHeight + superheroY > this.y
      ) {
        isGameOver = false
        let obstacleIndex = goodObstacles.indexOf(goodObstacle);
        goodObstacles.splice(obstacleIndex, 1);
        score += 10;
        yeySound.play();

       if(score === 100) {
        isGameOver = true;
        }
      }
    }
  }
  
  class badObstacle{
    constructor(x, y, width, height){
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.image = obsBadImages[Math.floor(Math.random() * obsBadImages.length)];
  }
  drawObstacle() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  checkCollision(obstacle) {
    if (
      superheroX < this.x + this.width &&
      superheroX + superheroWidth > this.x &&
      superheroY < this.y + this.height &&
      superheroHeight + superheroY > this.y
      ) {
        let obstacleIndex = badObstacles.indexOf(obstacle);
        playerLives -= 1;
        ohNoSound.play();
        badObstacles.splice(obstacleIndex, 1);
        if(playerLives === 2) {
          heart1.remove();
        }
        if(playerLives === 1) {
          heart2.remove();
        }
    }
  }
  }

  function checkLives() {
    if (playerLives <= 0) {
        isGameOver = true;
      }
    }
  
  function drawScore() {
    ctx.font = '18px monospace';
    ctx.fillStyle = 'black';
    ctx.fillText(`SCORE: ${score}`, 30, 50);
  }
  

  function animate() {
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(cloudsImg, 0, cloudsY, canvas.width, canvas.height);
    ctx.drawImage(superheroImg, superheroX, superheroY, superheroWidth, superheroHeight);
    
    if(animateId % 100 === 0) {
      goodObstacles.push (new goodObstacle(Math.random() * canvas.width, -80, 80, 80));
      badObstacles.push (new badObstacle(Math.random() * canvas.width, -80, 80, 80));
    } 
    
    goodObstacles.forEach(goodObstacle => {
      goodObstacle.drawObstacle();
      goodObstacle.y += speed;
      goodObstacle.checkCollision(goodObstacle);
    })      

    badObstacles.forEach(badObstacle => {
      badObstacle.drawObstacle();
      badObstacle.y += speed;
      badObstacle.checkCollision(badObstacle);
    })  
    

    drawScore()

    if(score === 50) {
      bgImg.src = "./images/animals-background.jpg";
      speed = 4;
    }
  
      
      if (isMovingLeft === true) {
        superheroX -= 6
      }
      if (isMovingRight === true) {
        superheroX += 6
      }
      
      if (superheroX < 0) {
        superheroX = 0;
      }
      if (superheroX >= canvas.width - 80) {
        superheroX = canvas.width - 80;
      }
      
      
      checkLives();
      
      
      if(isGameOver === true) {
        cancelAnimationFrame(animateId); 
        if (score === 100) {
          youWin()
        } else {
        gameOver();}
      } else {
        animateId = requestAnimationFrame(animate);
      }
    }
    
    

    //GAME OVER SCREEN:
    function gameOver() {
      startDiv.style.display = "none";
      canvas.style.display = "none";
      gameOverScreen.style.display = "flex"; // Element is rendered as a block-level element
      livesDiv.style.display = "none";
      footer.style.display = "none";
      music.pause();
      gameOverAudio.play();
      scoreSpan.innerText = score;
      }

         //WIN SCREEN:
    function youWin() {
      startDiv.style.display = "none";
      canvas.style.display = "none";
      gameOverScreen.style.display = "none"; 
      youWinScreen.style.display = "flex"; // Element is rendered as a block-level element
      livesDiv.style.display = "none";
      footer.style.display = "none";
      music.pause();
      winAudio.play();
      scoreSpan2.innerText = score;
      }

  


      