import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import Deck from './Deck';
import { MyHand, OpponentHand } from './deal';
import MyBoard from './Board';
import { initDeck, shuffleHand, drawToHand, changeStage } from '../store';
import deckData from '../../public/data/deck';

class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cardBack: './images/cardBack/cardback.jpg',
      deck: props.deck
    }
    // console.log('default state', this.state)
  }

  componentDidMount() {
    this.props.loadInitialData(deckData);
  }

  deal() {
    this.props.deal();
  }

  draw() {
    const remainingDeck = this.props.deck;
    this.props.draw(remainingDeck);
  }

  render() {
    const keys = []
    return (
      <div className="table">
        <Deck />
        <TransitionGroup>
          <MyHand key={this.props.myHand.id} { ...this.props } isPlayer={true} localState={this.state}/>
          <OpponentHand key={this.props.opponentHand.id} { ...this.props } isPlayer={false} localState={this.state}/>
          <MyBoard key={this.props.myBoard.id} {...this.props} isBoard={true} localState={this.state}/>
        </TransitionGroup>
        <button onClick={this.deal.bind(this)} className="deal-btn btn-primary">Start</button>
        <button onClick={this.draw.bind(this)} className="draw-btn btn-primary">Draw</button>
      </div>
    )
  }
}

const mapState = (state) => {
  // console.log('state--->', state)
  return {
    stage: state.stage,
    deck: state.playerHand.deck,
    myBoard: state.playerHand.myBoard,
    myHand: state.playerHand.myHand,
    opponentHand: state.playerHand.opponentHand,
    // boardHand: state.playerHand.boardHand,
    drawingCard: state.playerHand.drawingCard //add this new card to my hand
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadInitialData: (deckdata) => {
      dispatch(initDeck(deckdata));
    },
    deal: () => {
      dispatch(changeStage('deal'))
      dispatch(shuffleHand(deckData));
    },
    draw: (deck) => {
      // console.log('deck--->', deck)
      dispatch(changeStage('draw'))
      dispatch(drawToHand(deck));
    }
  }
}

export default connect(mapState, mapDispatch)(Table);
