
var options = ["KARATE","PUNCH","CHOP","KICK"];
const maxTries = 10;           
var usedLetters = [];        
var secretWord;          
var wordProgress = [];          
var guessesLeft = 0;       
var gameOver = false;             
var wins = 0;                  

   
     
// At beginning of game or after win sets values to default

function restartGame() {
  guessesLeft = maxTries;

  // randomly chooses array item from 'options' word list
  secretWord = Math.floor(Math.random() * (options.length));

  // Clear out arrays
  usedLetters = [];
  wordProgress = [];

  // Gets number of dashes secret word has & resets to new number after win or loss condition
  for (var i = 0; i < options[secretWord].length; i++) {
      wordProgress.push("_ ");
  }   

  
  
  onScreen(); 
};  


function onScreen() {

  document.getElementById("numofWins").innerText = wins;

  // Prints out number of blank dashes of secretWord on screen
  var guessProgress = "";
  for (var i = 0; i < wordProgress.length; i++) {
      guessProgress += wordProgress[i];
  }

  //Displays letters guess correctly,guesses left, and letters already guessed
  document.getElementById("wordguess").innerText = guessProgress;
  document.getElementById("guessesLeft").innerText = guessesLeft;
  document.getElementById("lettersGuessed").innerText = usedLetters;
};


function checkGuess(letter) {
  // Array used to store letter guessed by user
  var usrLetter = [];

  // Iterates through secretWord looking for user guessed letter, if found, stores instances in usrLetter
  for (var i = 0; i < options[secretWord].length; i++) {
      if(options[secretWord][i] === letter) {
          usrLetter.push(i);
      }
  }

  // if user guess letter isn't found, subtracts one from guessesLeft
  if (usrLetter.length <= 0) {
      guessesLeft--;
     
  } else {
      // replaces '-' in wordProgress by using usrLetter[i]
      //(which is position of correct userguess in secretWord), and replaces dash in corresponding position
      for(var i = 0; i < usrLetter.length; i++) {
          wordProgress[usrLetter[i]] = letter;
      }
  }
};

// Checks for a win by seeing if there are any remaining underscores in the wordProgress we are building.
function winCon() {
  if(wordProgress.indexOf("_ ") === -1) {
      document.getElementById("winAlert").innerHTML = "YOU WIN";
      document.getElementById("playAgain").innerHTML = "Press any letter to play again";
      wins++;
      gameOver = true;
  }
};


// Checks for a loss
function lossCon()
{
  if(guessesLeft <= 0) {
      document.getElementById("loseAlert").innerHTML = "YOU LOSE";
      document.getElementById("playAgain").innerHTML = "Press any letter to play again";
      gameOver = true;
  }
};

// Makes a guess
function usrguess(letter) {
  if (guessesLeft > 0) {
      // Make sure we didn't use this letter yet
      if (usedLetters.indexOf(letter) === -1) {
          usedLetters.push(letter);
          checkGuess(letter);
      }
  }
  
};

// Event listener
document.onkeydown = function(event) {
  // If we finished a game, dump one keystroke and reset.
  if(gameOver) {
      restartGame();
      gameOver = false;
  } else {
      // Check to make sure a-z was pressed.
      if(event.keyCode >= 65 && event.keyCode <= 90) {
          
          usrguess(event.key.toUpperCase());
          onScreen();
          winCon();
          lossCon();
      }
  }
};
     
    
    
      
    
    
  