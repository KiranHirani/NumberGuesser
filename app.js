/* Using skeleton framework for CSS - getskeleton.com */

/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

//Game Values 
let min = 1,
    max = 10,
    winningNumber = getRandomNum(min,max),
    guessesLeft = 3;

//UI Values
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

//Assign UI min and max 
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown',function(event){
if(event.target.className==='play-again'){
window.location.reload();
}
})

//Listen for Guess
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);

    //Validate our input
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    //Check if won 
    else {
        if (guess === winningNumber) {
            //game over- won 
            gameOver(true, `${winningNumber} is correct! YOU WIN`);
        } else {
            guessesLeft -= 1;
            if (guessesLeft === 0) {
                //Game over
                gameOver(false,`Game Over, You Lost. ${winningNumber} is the correct answer. Better luck next time.`)
            } else {
                //Game continues. Answer wrong
                //Change border color
                guessInput.style.borderColor = "red";
                //Clear input 
                guessInput.value = '';
                //tell user the no. of guesses left 
                setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
            }
        }
    }
})

//Game Over 
function gameOver(won, msg) {
    
    let color;
    won === true ? color = 'green' : color = 'red';
    guessInput.setAttribute('disabled', true);
    //guessInput.disabled=true;
    guessInput.style.borderColor = color;
    //Set Text color
    message.style.color=color;
    setMessage(msg);

    guessBtn.value='Play Again';
    guessBtn.className+='play-again'; 
}


//setMessage
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

//Get winning number
function getRandomNum(min,max){
  let val=Math.floor(Math.random()*(max-min+1)+min);
  return val; 
}
