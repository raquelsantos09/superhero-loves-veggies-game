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

let superheroX = canvas.width/2-15;
let cloudsY = -myCanvas.height; //??

canvas.style.border = '2px solid black';


//Variables:
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let startDiv = document.getElementById("start");
let gameOverScreen = document.getElementById("game-over");
const startButton = document.querySelector("#start-button");

let isMovingLeft = false;
let isMovingRight = false;

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



function animate() {
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(cloudsImg, 0, bg2y, myCanvas.width, myCanvas.height);
    ctx.drawImage(superheroImg, superheroX, 400, 30, 60);
    if(isGameOver === true) {
        cancelAnimationFrame(animateId); 
    } else {
        animateId = requestAnimationFrame(animate);
    }
}


function gameOver() {
    startDiv.style.display = "none";
    canvas.style.display = "none";
    gameOverScreen.style.display = "block"; // Element is rendered as a block-level element
}
})