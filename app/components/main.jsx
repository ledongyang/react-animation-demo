import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import Deck from './Deck';
import {MyHand, OpponentHand, BoardHand} from './deal';
import { initDeck, shuffleHand, drawToHand } from '../store';
import deckData from '../../public/data/deck';

class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cardBack: './images/cardBack/cardback.jpg',
      deck: props.deck
    }
    // console.log('props---->', props)
  }

  componentDidMount() {
    this.props.loadInitialData(deckData);
  }

  draw() {
    const deck = this.props.deck;
    this.props.draw(deck);
  }

  render() {
    return (
      <div className="table">
        <Deck />
        <TransitionGroup>
          <MyHand key={Math.random()} { ...this.props } isPlayer={true} localState={this.state}/>
          <OpponentHand key={Math.random()} { ...this.props } isPlayer={false} localState={this.state}/>
          <BoardHand key={Math.random()} {...this.props} isBoard={true} localState={this.state}/>
        </TransitionGroup>
        <button onClick={this.props.deal} className="deal-btn btn-primary">Deal</button>
        <button onClick={this.draw.bind(this)} className="draw-btn btn-primary">Draw</button>
      </div>
    )
  }
}

const mapState = (state) => {
  console.log('state--->', state)
  return {
    initial: state.playerHand.initial,
    deck: state.playerHand.deck,
    myHand: state.playerHand.myHand,
    opponentHand: state.playerHand.opponentHand,
    boardHand: state.playerHand.boardHand,
    drawingCard: state.playerHand.drawingCard
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadInitialData: (deckdata) => {
      dispatch(initDeck(deckdata));
    },
    deal: () => {
      dispatch(shuffleHand(deckData));
    },
    draw: (deck) => {
      // console.log('deck--->', deck)
      dispatch(drawToHand(deck));
    }
  }
}

export default connect(mapState, mapDispatch)(Table);
