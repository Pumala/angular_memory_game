# Memory Game
---
### Objective:
create a memory game in AngularJS that offers different playing levels

### Live Demo:

[Pokemon Memory Game] (http://iamclamclam.com/angular_memory_game/)

### Languages used:

* HTML
* CSS
* Javascript
* AngularJS

### Authors:

Carolyn Lam
### Screenshots
  * what the page looks like upon loading

  ![Initial Page](assets/home.png)
  * when player chooses pro mode

  ![Initial Page](assets/begin.png)

  * pro game in progress

  ![Initial Page](assets/play.png)

  * when the player has won the game

  ![Initial Page](assets/won.png)

### Code Samples

* the card constructor has three properties:

  1. url => will be used as the value for image src
  2. open => will be a boolean value of either true or false (if true, the card's front side will be shown, else the card's back image will be shown)
  3. matched => will be a boolean value of true or false (if true, this card will have already found its match, else, it hasn't)
```
// create a Card Constructor
function Card(url, open, matched) {
  this.url = url;
  this.open = open;
  this.matched = matched;
}
```
* the deck constructor has five properties:

  1. currentCards => set up initially as an empty array. Once the game is in play mode, it will store cards that are still available (cards that haven't found a pair)
  2. generateCards => a method that takes 1 argument (amount of cards in the deck) and generates an array of cards of that size
  3. moves => set up initially as 0; when the game is in play mode, each time the player selects 2 cards as a possible match, we add 1 to moves
  4. matches => set up initially as 0; whenever the player chooses 2 cards that are a match, we add 1 to matches
  5. won => initially set up false; when all the possible matches have been found, then this value turns true and the game is no longer in play mode
```
// create a Deck Constructor
function Deck() {
  this.currentCards = [];
  this.generateCards();
  this.moves = 0;
  this.matches = 0;
  this.won = false;
}
```
* below shows the deck's method for generating cards
```
// create a Deck method that generates cards
// you pass numCards (the amount of cards in the deck)
Deck.prototype.generateCards = function(numCards) {
  var cards = [];
  this.currentCards = [];
  this.moves = 0;
  this.matches = 0;
  this.won = false;

  // here we have a nested for loop inside another for loop
  // the outer for loop runs twice, meaning that the nest array will happen twice
  for(var j = 0; j < 2; j++) {
    // the nested for loop runs through half the number of cards => numCards / 2
    for (var i = 1; i <= (numCards / 2); i++) {
      // url is the image src => this value is dynamic because the value of i changes
      var url = "assets/pokemon" + i + ".png"
      // we create a new instance of Card and add it to our array 'cards'
      cards.push(new Card(url, false, false));
    };
  }
  // when the for loops have finished running, the card array contains an array of cards that each have a match
  // for instance, if numCards = 8, then afterward each card gets a match, meaning there are 16 cards total now in the cards array

  // save the length of the cards array
  var length = cards.length;

  // the section below randomizes the cards and how they will be spread out on board
  // check while the currentCards length is not the same as the original cards length
  while (this.currentCards.length != length) {
    // find the random index
    var randomIndex = Math.floor(Math.random() * cards.length);

    // push a random card onto current cards array
    this.currentCards.push(cards[randomIndex]);
    // delete the card we just added to current cards from card array
    cards.splice(randomIndex, 1);
  }
}
```

### What To Do Next

  * add more styling
  * offer player different themes other than pokemon
