// Author: Sean Perez

const WIN = "win", LOSE = "lose", OPTIONS = ["rock", "paper", "scissors"], score = {
    Player: 0,
    Computer: 0,
    playerName: null
};


// Func that randomly selects Computer's choice in the game rock, paper, scissors 
function computerPlay() {
    playIndex = Math.floor(Math.random() * OPTIONS.length);
    return OPTIONS[playIndex];
};


function humanPlay(playerSelection) {

    if (score.Player + score.Computer < 5) {
        outcome = playRound(playerSelection, computerPlay());
        calcWinner(outcome);
        currentScore();
    };

    if (score.Player + score.Computer == 5) { showWinner(score); }
};


// Func plays one round of rock, paper, scissors comparing the choice from human player vs computer's randomly seclected choice
function playRound(playerChoice, computerChoice) {

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
            return;
    };
};


// Get name of player
function getName() {
    let playerName = document.getElementById('userName').value
        || "HUMAN PLAYER";
    return playerName;
};


// Calculate winner or loser - Records valid wins or loses; if invalid, re-starts loop
function calcWinner(outcome) {
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
function showWinner() {
    let winner = "HAL 2024";
    if (score.Player > score.Computer) {
        winner = score.playerName;
    };

    document.getElementById('results').innerHTML =
        `Game over! Overall winner was ${winner}. 
    Final score is ${score.Player} for ${score.playerName} and ${score.Computer} for Computer. 
    Thanks for playing, come play again!`;
};


function currentScore() {
    document.getElementById('outcome').innerHTML = outcome;
    document.getElementById('halScore').innerHTML = score.Computer;
    document.getElementById('humScore').innerHTML = score.Player;
    document.getElementById('results').innerHTML = `Round: ${(score.Player + score.Computer) + 1} - ${score.playerName}, 
        what is your move?`
};


// Plays until there have been 5 valid rounds; ties, invalid inputs, etc do not count
function game() {

    score.playerName = getName();

    // Shift page from home to game page and add player's name on top of page
    document.getElementById("startBlock").onclick = function () {
        document.getElementById("startBlock").style.display = "none";
        document.getElementById("template").style.display = "flex";
        document.getElementById('playerName').innerHTML = score.playerName;
        document.getElementById('results').innerHTML = `Round: ${(score.Player + score.Computer) + 1} - ${score.playerName}, 
    what is your move?`
    };
};


// document.querySelector("userName").addEventListener('change', (e) => {
//         alert(e.currentTarget.value);
//     });


window.addEventListener('keydown', function (event) {
    let press = event.key;
    if (press === "Enter") {
        key = document.querySelector(`button[value='${press}']`);
        // score.playerName = document.getElementById('userName').value;
    } else if (!`button[value='${press}']`) { return; }
    key.click();
});

// fix the enter key input value



