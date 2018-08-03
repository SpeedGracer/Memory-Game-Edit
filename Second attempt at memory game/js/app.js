const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb" ];

const cardsContainer = document.querySelector(".deck");

let openedCards = [];
let matchedCards = [];


/*
*Notes: 8/2/18
  Find a new shuffle funtion
  figure out how to make the pop up appear when game is finished
  make the button init() the games
  check through everything
  submit!
*/


/*
* Shuffling the cards, function taken from https://bost.ocks.org/mike/shuffle/ due to other function causing duplicates for unknown reasons
*/
// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle (array) {
  var i = 0
    , j = 0
    , temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array;
}

console.log(icons);
/*
 * Initialize the game
 */
function init() {
    for(let i = 0; i < icons.length; i++) {
      // Shuffles the icons
      shuffle(icons);
      //Creates icons withing the cardsContainer
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${icons[i]}"></i>`;

        cardsContainer.appendChild(card);

        // Adds a click Event to each Card
        click(card);
    }
}

/*
*Click event
*/

let isFirstClick = true;

// CLick function
function click(card){

  //Click Event
  card.addEventListener("click", function(){

    // Timer
    if(isFirstClick){
      startTimer();
      // Change value of isFirstClick to not mess up startTimer
      isFirstClick = false;
    }

    const currentCard = this;
    const previousCard = openedCards[0];

      //When single card is opened
      if(openedCards.length === 1){

        card.classList.add("open", "show", "disable");
        openedCards.push(this);

        //comparing our two cards
        compare(currentCard, previousCard);

      }else{
      //When any of the existing cards aren't opened
      currentCard.classList.add("open", "show","disable");
      openedCards.push(this);
      };
    });
  }

  /*
  * Compare
  */
  function compare(currentCard, previousCard) {

    //matcher
    if(currentCard.innerHTML === previousCard.innerHTML){

      //It's a match!
      currentCard.classList.add("match");
      previousCard.classList.add("match");

      matchedCards.push(currentCard, previousCard);

      openedCards = [];

      //Check games status
      isOver();

    } else {
        //closes cards after .5 seconds
        setTimeout(function(){
          currentCard.classList.remove("open", "show", "disable");
          previousCard.classList.remove("open", "show", "disable");
        }, 500);
        openedCards = [];

    }
    addMove();
  }


  // Hides endGame pop up untill isOver

  function disable(){
    if( matchedCards !== icons.length){
      gameOver.classlist.add("hidden", "disable")
    }
  }
    /*
      * Check is game is over
      */
      const gameOver = document.querySelector(".endGame");
      const body = document.querySelector("#main")
      function isOver() {
        if(matchedCards.length === icons.length) {
            stopTimer();
            //Shows the congrats box and blurs baxkground
            endGame.classList.remove("hidden")
            endGame.ClassList.add("notBlur")
            body.classList.add("blur")
            /*
                    * Display your popup here, the `alert` is for explanation only!
                    *
                    * In your popup, you should create a button,
                    * To let the user play a new game
                    *
                    * After clicking on that button, you should:
                    *  - Call the `init` function to re-create the cards
                    *  - Call the `reset` function to reset all variables
                    */
        }
      }


    /*
    *Add move
    */
    const movesContainer = document.querySelector(".moves");
    movesContainer.innerHTML = 0;
    let moves = 0;
    function addMove(){
      moves++;
      movesContainer.innerHTML = moves;

      rating();
    }


  /*
   * Rating
   */
  const starsContainer = document.querySelector(".stars");
  const star = `<li><i class="fa fa-star"></i></li>`;
  starsContainer.innerHTML = star + star + star;
  function rating(){

    if(moves < 10){
      starsContainer.innerHTML = star + star + star;
    } else if ( moves < 15){
      starsContainer.innerHTML = star + star;
    } else {
      starsContainer.innerHTML = star;
    }
  }



  /*
   * Timer
   */
   const timerContainer = document.querySelector(".timer");
   let liveTimer,
       totalSeconds = 0;

   // Set the default value to the timer's container
   timerContainer.innerHTML = totalSeconds + 's';

    function startTimer() {
       liveTimer = setInterval(function() {
           // Increase the totalSeconds by 1
           totalSeconds++;
           // Update the HTML Container with the new time
           timerContainer.innerHTML = totalSeconds + 's';
       }, 1000);
   }

   function stopTimer() {
       clearInterval(liveTimer);
   }

   /*
 * Restart Button
 */
 const restartBtn = document.querySelector(".restart");
 restartBtn.addEventListener("click", function(){
 // Deletes ALL cards
 cardsContainer.innerHTML = "";

 // Calls 'init' to create new cards
 init();

 // Resets any and all related varibles
 reset();
});

/*
*Reset Game
*/
function reset(){
  //Clear matched cards
  matchedCards = [];

  //Resets moves
  moves = 0;
  movesContainer.innerHTML = moves;

  //Resets ratings
  starsContainer.innerHTML = star + star + star;

  /*
  *Resetting the timer
  */

  stopTimer();
  isFirstClick = true;
  totalSeconds = 0;
  timerContainer.innerHTML = totalSeconds + "s";
}


  // Start the game for the first time
  init();
































/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
