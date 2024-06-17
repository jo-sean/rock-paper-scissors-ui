// Author: Sean Perez

const WIN = "win", LOSE = "lose", OPTIONS = ["rock", "paper", "scissors"], BUTTONS = document.getElementByClass('choiceButtons');


// Func that randomly selects Computer's choice in the game rock, paper, scissors 
function computerPlay() {
    playIndex = Math.floor(Math.random() * OPTIONS.length);
    return OPTIONS[playIndex];
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


// // Gets player choice
// function playerChoice(choice) {
//     let playerSelection = choice;
//     return playerSelection;
// };


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


    let playerName = getName(),
        score = {
            Player: 0,
            Computer: 0
        },
        playerSelection = null,
        quitMsg = "Game terminated, thanks for playing!";

    // Shift page from home to game page and add player's name on top of page
    document.getElementById("startBlock").onclick = function () {
        document.getElementById("startBlock").style.display = "none";
        document.getElementById("template").style.display = "flex";
        document.getElementById('playerName').innerHTML = playerName;
    };


    //Round to win = 5
    while (score.Player + score.Computer !== 5) {
        document.getElementById('round').innerHTML =
            `Round: ${(score.Player + score.Computer) + 1} - ${playerName}, 
    what is your move?`

        wrapper.addEventListener('click', (event) => {
            const isButton = event.target.nodeName === 'BUTTON';
            if (!isButton) {
                return;
            }

            console.dir(event.target.id);
        });

        // if (playerSelection !== null) {
        //     outcome = playRound(playerSelection, computerPlay());
        //     console.log(outcome);
        //     calcWinner(score, outcome);
        //     currentScore(playerName, score);
        //     playerSelection = null;
        // }


    };

    showWinner(score, playerName);
};

window.addEventListener('keydown', function (event) {
    let press = event.key;
    if (press === "Enter") {
        key = document.querySelector(`button[value='${press}']`);
    } else if (!`button[value='${press}']`) { return; }
    key.click();
});


// Take out the loop and create smaller, event listening functions. 
// Keep the count so that user can still finish after 5 games.
//If time permits, add an exit game button.


