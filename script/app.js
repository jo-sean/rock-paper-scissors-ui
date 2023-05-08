// Author: Sean Perez

const WIN = "win", LOSE = "lose", OPTIONS = ["rock", "paper", "scissors"];


// Func that randomly selects Computer's choice in the game rock, paper, scissors 
function computerPlay() {
    playIndex = Math.floor(Math.random() * OPTIONS.length);
    return OPTIONS[playIndex];
};


// Func plays one round of rock, paper, scissors comparing the choice from human player vs computer's randomly seclected choice
function playRound(playerChoice, computerChoice) {
    const errMessage = `You have typed word or number that is not recognized. Please try again with one of the following:
    * Rock
    * Paper
    * Scissors`;

    let outcome = undefined;

    if (playerChoice === computerChoice) {
        return "It is a tied, try again!";
    };

    // Compares player's input vs randomly seclected choice for the computer and records the outcome of win or lose. 
    // If tied or invalid, returns false
    switch (playerChoice) {
        case OPTIONS[0]:
            if (computerChoice === OPTIONS[2]) {
                outcome = WIN;
            } else {
                outcome = LOSE;
            }
            break;
        case OPTIONS[1]:
            if (computerChoice === OPTIONS[0]) {
                outcome = WIN;
            } else {
                outcome = LOSE;
            }
            break;
        case OPTIONS[2]:
            if (computerChoice === OPTIONS[1]) {
                outcome = WIN;
            } else {
                outcome = LOSE;
            }
            break;
        default:
            outcome = false;
    };

    switch (outcome) {
        case WIN:
            return `You ${outcome}, ${playerChoice} beats ${computerChoice}`;
        case LOSE:
            return `You ${outcome}, ${computerChoice} beats ${playerChoice}`;
        default:
            return errMessage;
    };
};


// Get name of player
function getName() {
    let playerName = prompt("What is your name?") || "HUMAN PLAYER";
    return playerName;
};

// Remove spaces in string and change to lower case
function removeSpaces(stringContent) {
    if (typeof stringContent === "string") {
        return stringContent.trim().toLowerCase();
    };
}


// Gets player choice
function playerChoice(playerName, score) {
    let playerSelection = prompt(`Round: ${(score.Player + score.Computer) + 1} - ${playerName}, what is your move? (Options are rock, paper or scissors)`);
    if (typeof playerSelection === "string") {
        playerSelection = removeSpaces(playerSelection);
    };
    return playerSelection;
};


// Calculate winner or loser - Records valid wins or loses; if invalid, re-starts loop
function calcWinner(score, outcome) {
    if (outcome.includes("try again")) {
        return;
    } else if (outcome.includes(WIN)) {
        score.Player = score.Player + 1;
        return;
    } else {
        score.Computer = score.Computer + 1;
        return;
    };
};


// Find overall winner; print out results
function showWinner(score, playerName) {
    let winner = "Computer";
    if (score.Player > score.Computer) {
        winner = playerName;
    };

    console.log(`Game over! Overall winner was ${winner}. 
    \Final score is ${score.Player} for ${playerName} and ${score.Computer} for Computer. 
    \Thanks for playing, come play again!`);
};


function currentScore(playerName, score) {
    console.log(`Current score: 
        ${playerName}: ${score.Player}
        Computer: ${score.Computer}`);
};


// Plays until there have been 5 valid rounds; ties, invalid inputs, etc do not count
function game() {

    alert(`Welcome to the game of Rock-Paper-Scissors. To play, type either: Rock, Paper, or Scissors. You will play 5 rounds against THE COMPUTER. Good luck!!`);
    let playerName = getName(),
        score = {
            Player: 0,
            Computer: 0
        },
        playerSelection,
        quitMsg = "Game terminated, thanks for playing!";

    console.log(`${playerName} vs THE COMPUTER
    Let the game...BEGIN! `
    );

    while (score.Player + score.Computer !== 5) {
        playerSelection = playerChoice(playerName, score);

        if (playerSelection === null) {
            let response = prompt('Are you sure you want to quit? Type "y" if yes or "n" if no') || "n";
            response = removeSpaces(response);
            switch (response) {
                case "y":
                    return console.log(quitMsg);
                default:
                    continue;
            };
        };

        console.log("Rock..Paper..Scissors....", playerSelection);
        outcome = playRound(playerSelection, computerPlay());
        console.log(outcome);
        calcWinner(score, outcome);
        currentScore(playerName, score);
    };

    showWinner(score, playerName);
};

game();
