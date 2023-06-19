let playerScore = 0;
let computerScore = 0;
let playerChoice = "";
let computerChoice = "";

const descriptionText = document.getElementsByClassName("description")[0];
const scoreText = document.getElementsByClassName("score")[0];

getScoreText();

function getScoreText(){
    scoreText.textContent = `${computerScore}:${playerScore}`;
}


descriptionText.textContent = "Choose your fighter!";

let resetScore = document.querySelector(".resetScore");
resetScore.addEventListener('click', () => {
  rollPics();
  buttonGray();
  setTimeout(function(){
    playerScore = 0;
    computerScore = 0;
    getScoreText();
    imgComp.innerHTML = `<img src="images/cube.png" alt="dice">`;
    imgPlayer.innerHTML = `<img src="images/question.png" alt="question mark" style="-webkit-transform: scaleX(1); transform: scaleX(1);">`;
    descriptionText.textContent = "Choose your fighter!";
  }, 625);
});

let buttons = document.querySelectorAll("button");
function buttonGray(){
    buttons.forEach(button => button.disabled = true);
    setTimeout(() => {buttons.forEach(button => button.disabled = false)}, 625);
}


let buttonRock = document.querySelector('.buttonRock');
buttonRock.addEventListener('click', () => {
  playerChoice = "rock";
  rollPics();
  buttonGray();
  setTimeout(playRound, 625);
  setTimeout(getScoreText, 625);
});


let buttonPaper = document.querySelector('.buttonPaper');
buttonPaper.addEventListener('click', () => {
  playerChoice = "paper";
  rollPics();
  buttonGray();
  setTimeout(playRound, 625);
  setTimeout(getScoreText, 625);
});

let buttonScissors = document.querySelector('.buttonScissors');
buttonScissors.addEventListener('click', () => {
  playerChoice = "scissors";
  rollPics();
  buttonGray();
  setTimeout(playRound, 625);
  setTimeout(getScoreText, 625);
});

function getComputerChoice() {

    let randomNumber = Math.floor(Math.random() * 3) + 1;
    if (randomNumber == 1) {
        return "rock";
    }
    else if (randomNumber == 2) {
        return "paper";
    }
    else {
        return "scissors";
    }
}

function getGameResult(){
    playerChoice.toLowerCase();
    computerChoice.toLowerCase();
    imgComp.innerHTML = `<img src="images/${computerChoice}.png" alt="${computerChoice}">`;
    imgPlayer.innerHTML = `<img src="images/${playerChoice}.png" alt="${playerChoice}">`;
    if (playerChoice == computerChoice) {
        descriptionText.textContent = "Computer has chosen the same";
        return 1;
    }
    else if (computerChoice == "rock" && playerChoice == "scissors") {
        descriptionText.textContent = "Computer throws Rock at you, and your Scissors fall apart";
        return 2;
    }
    else if (computerChoice == "rock" && playerChoice == "paper") {
        descriptionText.textContent = "Computer throws Rock at you but you catch it with your Paper";
        return 3;
    }
    else if (computerChoice == "paper" && playerChoice == "rock") {
        descriptionText.textContent = "You throw Rock at the computer but it catches it with its Paper";
        return 2;
    }
    else if (computerChoice == "paper" && playerChoice == "scissors") {
        descriptionText.textContent = "Computer takes Paper out of its pocket, and you immediately cut it into pieces with your Scissors";
        return 3;
    }
    else if (computerChoice == "scissors" && playerChoice == "paper") {
        descriptionText.textContent = "You take Paper out of your pocket, but computer immediately cuts it into pieces with its Scissors";
        return 2;
    }
    else if (computerChoice == "scissors" && playerChoice == "rock") {
        descriptionText.textContent = "Your throw Rock at the computer, and its Scissors fall apart";
        return 3;
    }
}

function playRound() {
    computerChoice = getComputerChoice();
    gameResult = getGameResult();
    
    if (gameResult == 1) {
        return (computerScore++, playerScore++);
    }
    else if (gameResult == 2) {
        return computerScore++;
    }
    else if (gameResult == 3) {
        return playerScore++;
    }
    else {
        return computerScore++;
    }
}


let imgComp = document.querySelector(".imgComp");
let imgPlayer = document.querySelector(".imgPlayer");

function changeRock(){
    imgComp.innerHTML = `<img src="images/rock.png" alt="rock">`
}

function changePaper(){
    imgComp.innerHTML = `<img src="images/paper.png" alt="paper">`
}

function changeScissors(){
    imgComp.innerHTML = `<img src="images/scissors.png" alt="scissors">`
}

function getRandomPick(div){
    let randomNumber = Math.floor(Math.random() * 3) + 1;
    if (randomNumber == 1) {
        div.innerHTML = `<img src="images/rock.png" alt="rock">`;
    }
    else if (randomNumber == 2) {
        div.innerHTML = `<img src="images/paper.png" alt="paper">`;
    }
    else {
        div.innerHTML = `<img src="images/scissors.png" alt="scissors">`;
    }
}


function rollPics(){
    for (i=0; i<=25; i++) {
        setTimeout(function() {getRandomPick(imgComp)}, 25 * i);
        setTimeout(function() {getRandomPick(imgPlayer)}, 25 * i);
    }
}

