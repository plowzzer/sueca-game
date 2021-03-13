import Deck from './deck'
let deck

export function startGame () {
  console.log('[game] starting a new game')
  deck = new Deck()
  deck.shuffle()
  return deck
}

export function cardCount (deck) {
  console.log(`[game] ${deck.numberOfCards()} left`)
  return deck.numberOfCards()
}

export function isGameOver (deck) {
  console.log('[game] the game is over')
  return deck.numberOfCards === 0
}

export function seeFirstCard (deck: Deck) {
  console.log('[game] checking the top card')
  return deck.seeFirstCard()
}

export function removeTopCard (deck: Deck) {
  console.log('[game] fliping a new card')
  return deck.newCard()
}
