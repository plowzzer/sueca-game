const suits = ['♠', '♣', '♥', '♦']
const values = [
  'ace',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'jack',
  'queen',
  'king'
]

export default class Deck {
  cards: Array<{suit: string, value: string}>

  constructor (cards = freshDeck()) {
    this.cards = cards
  }

  numberOfCards () {
    return this.cards.length
  }

  seeFirstCard () {
    const card = this.cards[0]
    return { suit: card.suit, value: card.value }
  }

  newCard () {
    this.cards.shift()
    const card = this.seeFirstCard()
    return { suit: card.suit, value: card.value }
  }

  shuffle () {
    for (let i = this.numberOfCards() - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1))
      const oldValue = this.cards[newIndex]
      this.cards[newIndex] = this.cards[i]
      this.cards[i] = oldValue
    }
  }
}

class Card {
  suit:string
  value:string

  constructor (suit, value) {
    this.suit = suit
    this.value = value
  }

  get color () {
    return this.suit === '♣' || this.suit === '♠' ? 'black' : 'red'
  }

  // getHTML () {
  //   const cardDiv = document.createElement('div')
  //   cardDiv.innerText = this.suits
  //   cardDiv.classList.add('card', this.color)
  //   cardDiv.dataset.value = `${this.values} ${this.suits}`
  //   return cardDiv
  // }
}

function freshDeck () {
  return suits.flatMap(suit => {
    return values.map(value => {
      return new Card(suit, value)
    })
  })
}
