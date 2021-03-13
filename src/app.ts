import express from 'express'
import path from 'path'
import ejs from 'ejs'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'

import { seeFirstCard, removeTopCard, startGame, cardCount } from './game'

const port = process.env.PORT || 3333
const app = express()
const httpServer = createServer(app)
let deck

app.use(express.static('public'))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', ejs.renderFile)

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

io.on('connection', (socket: Socket) => {
  // A new user connected or reconnected
  console.log(`[server] new user connected (${socket.id})`)
  if (deck) {
    const foldedCard = seeFirstCard(deck)
    socket.emit('newCardReturn', {
      suit: foldedCard.suit, value: foldedCard.value
    })
  }

  socket.on('checkCardsLeft', () => {
    return cardCount(deck)
  })

  socket.on('newGame', () => {
    deck = startGame()
    const card = seeFirstCard(deck)
    io.emit('newCardReturn', {
      suit: card.suit, value: card.value
    })
  })

  socket.on('newCard', () => {
    if (deck) {
      removeTopCard(deck)
      const card = seeFirstCard(deck)
      io.emit('newCardReturn', {
        suit: card.suit, value: card.value
      })
      io.emit('checkCardsLeft', () => {
        return cardCount(deck)
      })
    } else {
      io.emit('endGame')
      console.error('[server] the game is over')
    }
  })

  socket.on('disconnect', () => {
    console.log(`[server] user desconected (${socket.id})`)
  })
})

httpServer.listen(port, () => console.log(`Server is running on port ${port}`))

// app.listen(3333, () => console.log('Server is running on port 3333'))

