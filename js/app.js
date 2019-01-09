/******* LIST OF VARIABLES  *******/

// Cards and deck variables
let deck = document.querySelector(".deck");
let card = document.querySelectorAll(".card");
let cards = Array.from(card);
let openedCards = []; // Array that holds open cards
let open = document.getElementsByClassName("open");
let match = document.getElementsByClassName("match");
let show = document.getElementsByClassName("show");
let matchArray = [];
let matchedCards = 0;

// Declaration for moveCounter
let moves = 0;
let move = document.querySelector(".moves");

// Declarations for Timer and rating stars
let timer = document.querySelector(".timer");
let minutes = 0;
let seconds = 0;
let time;
let firstClick = true;
let star = document.querySelectorAll(".fa-star");
let stars = document.querySelectorAll(".stars li");

// Declarations for Modal
var modal = document.querySelector(".modal");
const play = document.querySelector(".playAgain");


/******* SHUFFLE *******/

document.onload = startGame();

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/******* START GAME *******/

    function startGame(){
        modal.style.display = "none"; // on the start modal is hidden
      cards = shuffle(cards); //shuffle deck
        for (let i = 0; i < cards.length; i++) {
          deck.innerHTML = ""; // clear deck
            for (let card of cards){ // and then add cards
                deck.appendChild(card);
      };
      cards[i].classList.remove("show", "open", "match", "disabled");
          }

          for (var i = 0; i < cards.length; i++){
            card.innerHTML = cards[i].innerHTML;
	         }
      deck.addEventListener('click', flip);
     }

     function flip(clicked) {

      card.innerHTML++;
      if(!clicked.target.classList.contains("card")) return;

          if(openedCards.length < 2){
            if(clicked.target === openedCards[0]){ // to stop error with double click and match
              return false;
            }
            clicked.target.classList.add("open","show");
              openedCards.push(clicked.target);
            }

          if(openedCards.length === 2){
            clicked.target.classList.add("open","show");
            moveCounter();
              checkCards();
              ratingStars();
            }
        };

      function moveCounter(){
          moves++;
          move.innerHTML = moves;
            if (moves === 1){
                seconds = 0;
                minutes = 0;
                startTime();
                seconds =  1;
              };
            }

      function checkCards(){
        if(openedCards[0].type !== openedCards[1].type){
          disable();
          setTimeout(function(){
            openedCards[0].classList.remove("open","show");
            openedCards[1].classList.remove("open","show");
            openedCards = [];
            enable();
          }, 700);
        }

         if(openedCards[0].type === openedCards[1].type){
            openedCards[0].classList.add("match");
            openedCards[1].classList.add("match");
            openedCards[0].classList.remove("show", "open");
            openedCards[1].classList.remove("show", "open");
            matchArray.push(openedCards[0]);
            matchArray.push(openedCards[1]);
            openedCards = [];
          }
          if (matchArray.length === 16) {
            clearInterval(time);
            endGame();
          }
        }


        function disable(){
          deck.removeEventListener("click",flip);
          Array.prototype.filter.call(cards, function(card){
            card.classList.add("disabled");
          });
        }

        function enable(){
          deck.addEventListener("click",flip);
          Array.prototype.filter.call(cards, function(card){
            card.classList.remove("disabled");
              for(var i = 0; i < match.length; i++){
              match[i].classList.add("disabled");
            }
          });
        }

        /******* TIMER *******/

      function startTime(){
        time = setInterval(function(){
          timer.innerHTML = minutes + " Minutes" + " and "  + seconds +" seconds ";
          seconds++;
            if (seconds == 60){
                minutes++;
                seconds = 0;
              }
            },1000);
          }

        /******* RATING *******/

      function ratingStars(){
        let starsNumber = 3;
        if( moves >=8 && moves <=17){
          star[2].classList.remove("fa-star");
          star[2].classList.add("fa=star-o");
          starsNumber = 2;
        } else if ( moves >=18) {
          star[1].classList.remove("fa-star");
          starsNumber = 1;
        }
      }

    function gameRestart(){
     modal.style.display ="none";

     location.reload(true); // reload the page when we click restart button on play again button
     startGame();
    }

    /*******MODAL *******/

    function endGame(){

      modal.style.display ="block";
      finalTime = timer.innerHTML;

      let starRating = document.querySelector(".stars").innerHTML;
      document.getElementById("finalMove").innerHTML = moves;
      document.getElementById("starRating").innerHTML = starRating;
      document.getElementById("totalTime").innerHTML = finalTime;
      }

    playAgain.addEventListener("click",gameRestart); // playAgain button
