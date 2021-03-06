const game = document.querySelector('.game');
const deck = document.querySelector('.deck');
const modalFinal = document.querySelector('.modal--final');
const modalWelcome = document.querySelector('.modal--welcome');
const moves = document.querySelector('.moves');
const movesNumber = document.querySelector('.moves-number');
const starsNumber = document.querySelector('.stars-number');
const startGameBtn = document.querySelector('.button--start');
const playAgainBtn = document.querySelector('.button--again');
const restartBtn = document.querySelector('.restart');
const stars = document.querySelector('.stars');
const time = document.querySelector('.time');
const showTime = document.querySelector('.show-time');

//Create a list that holds all of your cards
const cards = document.getElementsByClassName('card');

//Create an array of cards
let cardsList = Array.from(cards);
let matchCounter = 0;
let moveCounter = 0;
let openCardsList = [];
let countMovesVar;
let seconds = 0, minutes = 0, t;

/*
	* Display the cards on the page
	*   - shuffle the list of cards using the provided "shuffle" method
	*   - loop through each card and create its HTML
	*   - add each card's HTML to the page
	*/

	modalWelcome.style.display='flex';
	game.style.display = 'none';
	modalFinal.style.display = 'none';

	startGameBtn.addEventListener('click', function() {
		newGame();
	});

	deck.addEventListener('click', function(event) {
		showCard(event); // Show card after click
		addToList(event); // Add card to the list to compare
		compareCards(); // Compare two open cards
		countMovesVar = countMoves(event);
		starsCounter(countMovesVar);
		// Display final message if all cards match
		if (ifAllMatch()) {
			finalMessage();
		}
	});

	restartBtn.addEventListener('click', function(event) {
		newGame(event);
	});

	playAgainBtn.addEventListener('click', function(event) {
		newGame(event);
	});

function newGame() {
	moveCounter = 0;
	openCardsList = [];
	moves.innerText = moveCounter;
	cardsList = shuffle(cardsList);
	addShuffledCards();
	resetStarsCounter();
	game.style.display = 'flex';
	modalWelcome.style.display='none';
	modalFinal.style.display = 'none';
	stopTimer();
	resetTime();
	deck.addEventListener('click', firstCardClicked);
}

//Add shuffled cards to the DOM
function addShuffledCards() {
	deck.innerHTML = '';
	for (let i = 0; i < cardsList.length; i++) {
		deck.innerHTML += cardsList[i].outerHTML;
	}
}

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


// Add the open card to the list of open cards
function addToList(card) {
	if (card.target.classList[0] === 'card') {
		openCardsList.push(card);
		card.target.style.pointerEvents = "none";
	}
}

function showCard(card) {
	card.target.classList.toggle('open');
	card.target.classList.toggle('show');
}

function compareCards() {
	if(openCardsList.length > 1) {
		if(openCardsList[0].target.innerHTML === openCardsList[1].target.innerHTML) {
			console.log('match');
			ifMatch(openCardsList);
		} else {
			console.log('do not much');
			ifDontMatch(openCardsList);
		}
			openCardsList = [];
	}
}

function ifMatch(cards) {
	for (card of cards) {
		card.target.classList.toggle('match');
		card.target.style.pointerEvents = "none";
	}
}

// Hide cards(with delay) if not match
function ifDontMatch(cards) {
	setTimeout(function() {
		for (card of cards) {
			card.target.classList.remove('open');
			card.target.classList.remove('show');
			card.target.style.pointerEvents = "auto";
		}
	}, 700);
}

function countMoves(card) {
	if (card.target.classList[0] === 'card' && openCardsList[0] !== openCardsList[1]) {
		moveCounter++;
		moves.innerText = moveCounter;
	}
	return moveCounter;
}

// Check if all cards match
function ifAllMatch() {
	matchCounter = 0;

	for (card of cards) {
		if (card.className === 'card open show match') matchCounter++;
	}

		if (matchCounter === 16) {
			clearTimeout(t);
			return true;
		}
		else {
			return false;
		}
}

//Function which display modal with scores in the end of the game
function finalMessage() {
	game.style.display = 'none';
	modalFinal.style.display = 'flex';
	movesNumber.innerText = moveCounter;
	starsNumber.innerHTML = stars.outerHTML;
	showTime.innerText = time.innerText;
}

function starsCounter(movesNumber) {
	switch(movesNumber) {
		case 20:
			stars.children[2].firstChild.className = 'fa fa-star-o';
			break;
		case 30:
			stars.children[1].firstChild.className = 'fa fa-star-o';
			break;
	}
}

function resetStarsCounter() {
	for (star of stars.children) {
		star.firstChild.className = 'fa fa-star';
	}
}

function timer() {
	t = setTimeout(function () {
		seconds++;
		if (seconds >= 60) {
			seconds = 0;
			minutes++;
		}

		time.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

		timer();
	}, 1000);
	// prevent start timer() again
	deck.removeEventListener('click', firstCardClicked);
}

function firstCardClicked(event) {
	if (event.target.classList[0] === 'card') {
		timer();
	}
}

function stopTimer() {
	clearTimeout(t);
}

function resetTime() {
	seconds = 0;
	minutes = 0;
	time.innerHTML = '00:00';
}
