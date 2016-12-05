var app= angular.module('my-app', []);

// Memory Game Controller
app.controller('MemoryController', function($scope, $timeout) {
  // create a new instance of Deck
  $scope.deck = new Deck();
  // set the first card and second card picked to null
  $scope.firstCard = null;
  $scope.secondCard = null;
  // set firstState to true initially
  $scope.firstState = true;
  $scope.gameInPlay = true;
  // set moves and matches to 0 initially
  $scope.deck.moves = 0;
  $scope.deck.matches = 0;
  // set deck.won to false because no one has won
  $scope.deck.won = false;

  // when calling this function, we pass in a card
  $scope.revealCard = function(card) {
    // if the card hasn't found its match yet and the game is still in play, continue
    if ((card.matched === false) && ($scope.gameInPlay === true)) {
      // if this is the first state, then this is the first card we need to compare
      if ($scope.firstState === true) {
        // we set the card as the first picked card
        $scope.firstCard = card;
        // we keep the first picked card open
        $scope.firstCard.open = true;
        // we reset first card value to null
        $scope.firstState = null;
        // if we are not in the first state we check this condition
        // it checks if the first card picked is not the same exact card
        // as the current card picked (checks to make sure we don't pick the same card)
      } else if ($scope.firstCard['$$hashKey'] !== card['$$hashKey']) {
        // we set the 2nd card picked as the second picked card
        $scope.secondCard = card;
        // we keep the 2nd card picked open
        $scope.secondCard.open = true;
        // we update the moves count by 1
        $scope.deck.moves += 1;
        // check if the first card image is the same as the second card image
        if ($scope.firstCard.url === $scope.secondCard.url) {
          // set the first card and second card matched value to true
          $scope.firstCard.matched = true;
          $scope.secondCard.matched = true;
          // we update the matches count by 1
          $scope.deck.matches += 1;
          // we check if the matches count is the same as half the length of the card deck
          // that would mean all the possible matches have been found
          if ($scope.deck.matches === ($scope.deck.currentCards.length / 2)) {
            // set the deck won value to true
            $scope.deck.won = true;
          }
          // if the cards are not a match
        } else {
          // this part below sets a delay of 500 seconds
          // then hides the first card and second card
          $timeout(function() {
            $scope.firstCard.open = false;
            $scope.secondCard.open = false;
          }, 500);
        }
        // now that the second card has been picked
        // we set firstState to true
        // sets a delay of 500 seconds, then sets gameInPlay from false to true
        // this is important because it disables the ability to click other cards while game is in progress
        // reset value of first card and second card to null
        $scope.firstState = true;
        $scope.gameInPlay = false;
        $timeout(function() {
          $scope.gameInPlay = true;
          $scope.firstCard = null;
          $scope.secondCard = null;
        }, 500);
      }
    }
  }
});

// create a Card Constructor
function Card(url, open, matched) {
  this.url = url;
  this.open = open;
  this.matched = matched;
}

// create a Deck Constructor
function Deck() {
  this.currentCards = [];
  this.generateCards();
  this.moves = 0;
  this.matches = 0;
  this.won = false;
}

// create a Deck method that generates cards
// you pass numCards (the amount of cards in the deck)
Deck.prototype.generateCards = function(numCards) {
  var cards = [];
  this.currentCards = [];
  this.moves = 0;
  this.matches = 0;
  this.won = false;

  for(var j = 0; j < 2; j++) {
    for (var i = 1; i <= (numCards / 2); i++) {
      var url = "assets/pokemon" + i + ".png"
      cards.push(new Card(url, false, false));
    };
  }

  var length = cards.length;

  while (this.currentCards.length != length) {
    var randomIndex = Math.floor(Math.random() * cards.length);

    this.currentCards.push(cards[randomIndex]);
    cards.splice(randomIndex, 1);
  }
}
