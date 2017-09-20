import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import Deck from './Deck';
import {MyHand, OpponentHand} from './dealHand';
import { initDeck, shuffleHand } from '../store';
import deckData from '../../public/data/deck';

class Table extends Component {

  constructor() {
    super();
    this.state = {
      initial: true,
      myHandId: 1,
      opponentHandId: 2,
      cardBack: './images/cardback.jpg',
      myHandCards: [],
      opponentHandCards: []
    }
    // console.log('props--->', this.props)
    // this.deal = this.deal.bind(this);
    // this.draw = this.draw.bind(this);
  }

  // deal() {
  //   this.setState({
  //     initial: false,
  //     myHandId: this.state.myHandId + 2,
  //     opponentHandId: this.state.opponentHandId + 2
  //   })
  // }

  // draw() {
  //   this.setState({
  //     myHandCards: [...this.state.myHandCards, {
  //       id: this.state.myHandCards.length + 1,
  //       cardFront: './images/black7.png'
  //     }]
  //   })
  // }

  componentDidMount() {
    // console.log('new deck--->', deckData)
    // const newDeck = deckData.slice();
    this.props.loadInitialData(deckData);
    // console.log('props', this.props)
  }

  render() {
    console.log('props===>', this.props)
    return (
      <div className="table">
        <Deck onClick={this.draw} />
        <TransitionGroup>
          <MyHand key={this.state.myHandId} { ...this.state } isPlayer={true} />
          <OpponentHand key={this.state.opponentHandId} { ...this.state } isPlayer={false} />
        </TransitionGroup>
        <button onClick={this.props.deal} className="deal-btn btn-primary">Deal</button>
      </div>
    )
  }
}

const mapState = (state) => {
  // console.log('state===>', state)
  return {
    deck: state.playerHand.deck,
    myHand: state.playerHand.myHand,
    opponentHand: state.playerHand.opponentHand
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData: (deckdata) => {
      dispatch(initDeck(deckdata))
    },
    deal: () => {
      // const newDeck = deckData.slice();
      // console.log('deck after shuffle---->', deck)
      // dispatch(initDeck(deck));
      dispatch(shuffleHand(deckData));
    }
  }
}

export default connect(mapState, mapDispatch)(Table);
