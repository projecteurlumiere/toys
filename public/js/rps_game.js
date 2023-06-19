alert("Welcome challenger! \nYou are about to play a (kind of) best of 5 game in Rock Paper Scissors against the mighty random computer \nThe rules are: \nWin awards 1 point, and game ends when you or your adversary achieves 3 points in total \nTies do not give any points \nThere can be 10 rounds in total \nGood luck challenger");

game();

function game() {

    let totalPlayerScore = 0;
    let totalComputerScore = 0;

    playBo5Game();

    function playBo5Game() {
        
        let playerScore = 0;
        let computerScore = 0;

        function playRound() {

            function getComputerChoice() {

            let randomNumber = Math.floor(Math.random() * 3) + 1;
            if (randomNumber == 1) {
                return "Rock";
            }
                else if (randomNumber == 2) {
                    return "Paper";
                }
                else {
                    return "Scissors";
                }
            }

            function getPlayerChoice() {
                let playerSelection = prompt("Go ahead!\nRock, Paper, or Scissors?")
                if (playerSelection != null) {
                    playerSelection = playerSelection.toLowerCase();
                }

                if (playerSelection == "rock") {
                    return "Rock";
                }
                else if (playerSelection == "paper") {
                    return "Paper";
                }
                else if (playerSelection == "scissors") {
                    return "Scissors";
                }
                else {
                    return "Are you kidding me?";
                }
            }

            let computerChoice = getComputerChoice();
            let playerChoice = getPlayerChoice();

            function getGameResult() {
                if (computerChoice == playerChoice) {
                    alert("Computer has chosen the same")
                    return 1; // tie
                }
                else if (playerChoice == "Are you kidding me?") {
                    return 0; // no game
                }
                else if (computerChoice == "Rock" && playerChoice == "Scissors") {
                    alert("Computer throws Rock at you, and your Scissors fall apart");
                    return 2; // Computer wins
                }
                else if (computerChoice == "Rock" && playerChoice == "Paper") {
                    alert("Computer throws Rock at you but you catch it with your Paper");
                    return 3; // Computer loses
                }
                else if (computerChoice == "Paper" && playerChoice == "Rock") {
                    alert("You throw Rock at the computer but it catches it with its Paper");
                    return 2;
                }
                else if (computerChoice == "Paper" && playerChoice == "Scissors") {
                    alert("Computer takes Paper out of its pocket, and you immediately cut it into pieces with your Scissors");
                    return 3;
                }
                else if (computerChoice == "Scissors" && playerChoice == "Paper") {
                    alert("You take Paper out of your pocket, but computer immediately cuts it into pieces with its Scissors");
                    return 2;
                }
                else if (computerChoice == "Scissors" && playerChoice == "Rock") {
                    alert("Your throw Rock at the computer, and its Scissors fall apart");
                    return 3;
                }
            }

            let gameResult = getGameResult();

            if (gameResult == 1) {
                alert("It's a tie!");
            }
            else if (gameResult == 2) {
                alert("Computer wins!");
                return computerScore++;
            }
            else if (gameResult == 3) {
                alert("You win!");
                return playerScore++;
            }
            else {
                alert("Are you kidding me? \nI'm giving one point to computer");
                return computerScore++;
            }
        }

        for (round = 1; round < 12; round++) {
            playRound();
            alert("Round #" + round + " is over\nYour score is " + playerScore + "\nComputer's score is " + computerScore);
            if (playerScore == 3) {
                alert ("You championed over computer \nGood job!");
                return totalPlayerScore++;
                break;
            }
            else if (computerScore == 3) {
                alert("Computer wins \nNo one said it was going to be easy!");
                return totalComputerScore++;
                break;
            }
            else if (round == 11 && computerScore < 3 && playerScore < 3) {
                alert ("That was a good game \nBut no one triumphed.");
                break;
            }
        }
    }

    for (set = 1; set < Infinity; set++){
        let rematch = prompt("Sets played: "+ set + "\nYour overall score: " + totalPlayerScore + "\nComputer overall score: " + totalComputerScore + "\nOne more? \nType 'Yes'");

        if (rematch != null) {
            rematch = rematch.toLowerCase();
        }
    
        if (rematch == "yes") {
            playBo5Game();
        }
        else {
            alert ("Good luck, challenger!");
            window.location.href = "index.html";
            break;
        }
    }

}