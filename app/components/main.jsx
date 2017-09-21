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
      // myHandId: 1,
      // opponentHandId: 1,
      cardBack: './images/cardBack/cardback.jpg',
      // myHandCards: [],
      // opponentHandCards: []
    }
    // console.log('props--->', this.props)
    // this.props.deal = this.props.deal.bind(this);
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
    // this.props.deal = this.props.deal.bind(this);
    this.props.loadInitialData(deckData);
    // console.log('props', this.props)
  }

  render() {
    console.log('props===>', this.props)
    return (
      <div className="table">
        <Deck />
        <TransitionGroup>
          <MyHand key={Math.random()} { ...this.props } isPlayer={true} localState = {this.state}/>
          <OpponentHand key={Math.random()} { ...this.props } isPlayer={false} localState = {this.state}/>
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
      // this.setState({
      //   initial: false,
      //   myHandId: this.state.myHandId + 2,
      //   opponentHandId: this.state.opponentHandId + 2
      // })
      // console.log('this-->', this)
      dispatch(shuffleHand(deckData));
    }
  }
}

export default connect(mapState, mapDispatch)(Table);
