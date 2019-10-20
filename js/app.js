/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score.
- After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
* Note To Generate random number bw 1 and 6 Follow the Following
-1 is the start number , 6 is the number of possible results (1 + start (6) - end (1))

*/

/* Game Varaibles :

- gamePlaying is a state variable tell us when we should stop gaming and block functionality of roll dice and hold
 buttons to enforce player click on new game button to restart the game .

- currentScore -> for both players we need one variable for holding data while a player is palying then reset it
 to 0 to reuse it for the other player.

- we need 2 global score variables or array of global scores
  for the 2 players to store their score permanent until the game finishes

*/

// Variables Declaration
var diceNumer, imgSrc, currentScore, activePlayer, gamePlaying, globalScores;

// for intialize variables
init();


document.querySelector('.btn-roll').addEventListener('click', rollDice);
document.querySelector('.btn-hold').addEventListener('click', hold);
document.querySelector('.btn-new').addEventListener('click', init);



function rollDice() {
    if (gamePlaying) {

        //1. Generate Random Number
        diceNumer = Math.floor(Math.random() * 6) + 1;

        // 2. Display corresponding images to that random number
        imgSrc.style.display = 'block';
        imgSrc.setAttribute('src', 'img/' + 'dice-' + diceNumer + '.png');
        //  imgSrc.src = 'img/' + 'dice-' + diceNumer + '.png';

        //update current score
        if (diceNumer > 1) {
            currentScore += diceNumer;
            //update ui
            document.querySelector('#current-score-' + activePlayer).textContent = currentScore;
        } else {
            // Next player
            nextPlayer();
        }
    }
}

function hold() {

    if (gamePlaying) {

        // update global score
        globalScores[activePlayer - 1] += currentScore;
        // update ui of global score
        document.getElementById('global-score-' + activePlayer).textContent = globalScores[activePlayer - 1];

        // check if the player won the game
        if (globalScores[activePlayer - 1] >= 100) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner !';
            imgSrc.style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            // set gameplaying with false cuz the game has finished
            gamePlaying = false;

        } else {
            nextPlayer();
        }
    }
}

function nextPlayer() {

    // check who is active
    activePlayer === 1 ? activePlayer = 2 : activePlayer = 1;

    // reset current value
    currentScore = 0;
    // also update ui
    document.querySelector('#current-score-1').textContent = 0;
    document.querySelector('#current-score-2').textContent = 0;

    //hide roll dice
    imgSrc.style.display = 'none';

    // toggle class active
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.player-2-panel').classList.toggle('active');

}


function init() {
    // reset all variables and intializing them
    diceNumer = 0;
    currentScore = 0;
    globalScores = [0, 0];
    gamePlaying = true;
    activePlayer = 1; // by default b 1 it will be 1 or 2
    imgSrc = document.querySelector('.dice');
    imgSrc.style.display = 'none';
    document.querySelector('#name-1').textContent = 'player 1';
    document.querySelector('#name-2').textContent = 'player 2';
    document.querySelector('#global-score-1').textContent = 0;
    document.querySelector('#global-score-2').textContent = 0;
    document.querySelector('#current-score-1').textContent = 0;
    document.querySelector('#current-score-2').textContent = 0;
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-2-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.player-2-panel').classList.remove('active');
}