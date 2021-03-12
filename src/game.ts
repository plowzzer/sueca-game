import express from 'express'
import Deck from './deck'

const app = express()
app.listen(3332, () => console.log('Server is running on port 3333'))

var deck

function startGame () {
  console.clear()
  deck = new Deck()
  deck.shuffle()
}

function cardCount (deck) {
  return deck.numberOfCards
}

function isGameOver (deck) {
  return deck.numberOfCards === 0
}

function flipCard () {
  const card = deck.pop()
  console.log(deck.pop())
  return card
}

startGame()

for (let i = 0; i < 10; i++) {
  flipCard()
}
