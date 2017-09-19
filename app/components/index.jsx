import React, { Component } from 'react';
import { TransitionGroup } from 'react-transition-group';
import Deck from './Deck';
import {MyHand, OpponentHand} from './dealHand';

export default class Table extends Component {

  constructor() {
    super();
    this.state = {
      initial: true,
      myHandId: 1,
      opponentHandId: 2,
      cardBack: './images/cardback.jpg',
      myHandCards: [{
        id: 1,
        cardFront: './images/heart3.png'
      }, {
        id: 2,
        cardFront: './images/hearta.png'
      }, {
        id: 3,
        cardFront: './images/heart2.png'
      }, {
        id: 4,
        cardFront: './images/diamond10.png'
      }, {
        id: 5,
        cardFront: './images/black7.png'
      }],
      opponentHandCards: [{
        id: 6,
        cardFront: './images/heart3.png'
      }, {
        id: 7,
        cardFront: './images/heart3.png'
      }, {
        id: 8,
        cardFront: './images/heart3.png'
      }, {
        id: 9,
        cardFront: './images/heart3.png'
      }, {
        id: 10,
        cardFront: './images/heart3.png'
      }]
    }
    this.deal = this.deal.bind(this);
    this.draw = this.draw.bind(this);
  }

  deal() {
    this.setState({
      initial: false,
      myHandId: this.state.myHandId + 2,
      opponentHandId: this.state.opponentHandId + 2
    })
  }

  draw() {
    this.setState({
      myHandCards: [...this.state.myHandCards, {
        id: this.state.myHandCards.length + 1,
        cardFront: './images/black7.png'
      }]
    })
  }

  render() {
    return (
      <div className="table">
        <Deck onClick={this.draw} />
        <TransitionGroup>
          <MyHand key={this.state.myHandId} { ...this.state } isPlayer={true} />
          <OpponentHand key={this.state.opponentHandId} { ...this.state } isPlayer={false} />
        </TransitionGroup>
        <button onClick={this.deal} className="deal-btn btn-primary">Deal</button>
      </div>
    )
  }
}
