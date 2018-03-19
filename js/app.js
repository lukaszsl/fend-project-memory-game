
const deck = document.querySelector('.deck');

//Create a list that holds all of your cards
const cards = document.getElementsByClassName('card');


//Create an array of cards
let cardsList = Array.from(cards);


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


cardsList = shuffle(cardsList);
addShuffledCards();

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
 

 document.querySelector('.deck').addEventListener('click', function(event) {
 	showCard(event);
 });

// Add the open card to the list of open cards
 function addToList(card) {
	 listOfOpenCards.push(card);
 }

	 function showCard(card) {
		 card.target.classList.toggle('open');
		 card.target.classList.toggle('show');
	 }
