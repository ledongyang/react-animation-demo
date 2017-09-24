import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import Deck from './Deck';
import { MyHand, OpponentHand } from './deal';
import MyBoard from './Board';
import OpponentBoard from './OpponentBoard';
import { initDeck, shuffleHand, drawToHand, changeGamePhase, changeTurn, playCard } from '../store';
import deckData from '../../public/data/deck';

class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cardBack: './images/cardBack/cardBack-dragon.jpg',
      deck: props.deck
    }
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

  endTurn(card) {
    // get a random card from computer hand
    if (this.props.stage.whosTurn === 'myturn'){
      const opponentHandCards = this.props.opponentHand.handCards
      // console.log('opponent hand cards', opponentHandCards)
      const randomNum = Math.floor(Math.random() * opponentHandCards.length);
      this.props.endTurn(opponentHandCards[randomNum]);
    }
  }

  render() {
    return (
      <div className="table">
        <Deck />
        <TransitionGroup>
          <MyHand key={this.props.myHand.id} { ...this.props } isPlayer={true} localState={this.state}/>
          <OpponentHand key={this.props.opponentHand.id} { ...this.props } isPlayer={false} localState={this.state}/>
          <MyBoard key={this.props.myBoard.id} {...this.props} isPlayer={true} isBoard={true} localState={this.state}/>
          <OpponentBoard key={this.props.opponentBoard.id} {...this.props} isPlayer={false} isBoard={true} localState={this.state}/>
        </TransitionGroup>
        <button onClick={this.deal.bind(this)} className="deal-btn btn-primary">Start</button>
        <button onClick={this.endTurn.bind(this)} className="end-turn-btn btn-primary">End Turn</button>
        {/* <button onClick={this.draw.bind(this)} className="draw-btn btn-primary">End Turn</button> */}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    stage: state.stage,
    deck: state.playerHand.deck,
    myBoard: state.playerHand.myBoard,
    opponentBoard: state.playerHand.opponentBoard,
    myHand: state.playerHand.myHand,
    opponentHand: state.playerHand.opponentHand,
    cardDetail: state.playerHand.cardDetail,
    // drawingCard: state.playerHand.drawingCard //add this new card to my hand
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadInitialData: (deckdata) => {
      dispatch(initDeck(deckdata));
    },
    deal: () => {
      dispatch(changeTurn('myturn'));
      dispatch(changeGamePhase('deal'))
      dispatch(shuffleHand(deckData));
    },
    draw: (deck) => {
      dispatch(changeGamePhase('draw'))
      dispatch(drawToHand(deck));
    },
    endTurn: (card) => {
      dispatch(changeGamePhase('endturn'));
      dispatch(changeTurn('opponentturn'));
      dispatch(changeGamePhase('play'));
      dispatch(playCard(card, 'opponentturn'));
      // console.log('play this card-->', card)
    }
   }
}

export default connect(mapState, mapDispatch)(Table);
