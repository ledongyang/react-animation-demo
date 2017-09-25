import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import Deck from './Deck';
import { MyHand, OpponentHand } from './deal';
import MyBoard from './Board';
import OpponentBoard from './OpponentBoard';
import { initDeck, shuffleHand, drawToHand, changeGamePhase, changeTurn, playCard, updateRound, UpdateMyScore, UpdateOpponentScore, clearBoard } from '../store';
import deckData from '../../public/data/deck';

class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isStarted: false,
      cardBack: './images/cardBack/cardBack-dragon.jpg',
      deck: props.deck
    }
  }

  componentDidMount() {
    this.props.loadInitialData(deckData);
  }

  deal() {
    this.setState({
      isStarted: true
    })
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

  endRound() {
    const {round, myScore, opponentScore} = this.props.stage;
    const {updateRound, endTurn, myBoard, opponentBoard, opponentHand, UpdateMyScore, UpdateOpponentScore, clearBoard} = this.props;
    if (round <= 3) {
      const myBP = myBoard.boardCards.reduce(function(sum, card) {
        if (card.type === 'fire' && opponentBoard.boardCards.find(card => card.type === 'water')) {
          return sum + Math.round(card.bp / 2)
        } else if (card.type === 'water' && opponentBoard.boardCards.find(card => card.type === 'earth')) {
          return sum + Math.round(card.bp / 2)
        } else if (card.type === 'earth' && opponentBoard.boardCards.find(card => card.type === 'fire')) {
          return sum + Math.round(card.bp / 2)
        } else {
          return sum + card.bp;
        }
      }, 0)
      const opponentBP = opponentBoard.boardCards.reduce(function(sum, card) {
        if (card.type === 'fire' && myBoard.boardCards.find(card => card.type === 'water')) {
          return sum + Math.round(card.bp / 2)
        } else if (card.type === 'water' && myBoard.boardCards.find(card => card.type === 'earth')) {
          return sum + Math.round(card.bp / 2)
        } else if (card.type === 'earth' && myBoard.boardCards.find(card => card.type === 'fire')) {
          return sum + Math.round(card.bp / 2)
        } else {
          return sum + card.bp;
        }
      }, 0)
      // console.log('opponent bp', opponentBP);
      // if (opponentBP <= myBP) {
      //   const opponentHandCards = opponentHand.handCards;
      //   const randomNum = Math.floor(Math.random() * opponentHandCards.length);
      //   this.props.endTurn(opponentHandCards[randomNum]);
      // } else {
      //   console.log('hello')
      // }
      if (myBP >= opponentBP) {
        UpdateMyScore(myScore+1);
        if (myScore === 1) {
          window.alert('Congrats, You won this game!')
        } else {
          window.alert('You Win This Round!')
        }
      } else {
        UpdateOpponentScore(opponentScore+1)
        if (opponentScore === 1) {
          window.alert('Sorry, You lose this game!')
        } else {
          window.alert('You Lose This Round!')
        }
      }
      updateRound(round+1);
      clearBoard(myBoard, opponentBoard);
    }
  }

  render() {
    const {myScore, opponentScore, round} = this.props.stage;
    const {isStarted} = this.state;
    return (
      <div className="table">
        <Deck />
        { isStarted && <div className="round">
              <h1>Round #{round}</h1>
          </div> }
        <TransitionGroup>
          <MyHand key={this.props.myHand.id} { ...this.props } isPlayer={true} localState={this.state}/>
          <OpponentHand key={this.props.opponentHand.id} { ...this.props } isPlayer={false} localState={this.state}/>
          {isStarted && <div className="myscore"><h1>{myScore}</h1></div>}
          <MyBoard key={this.props.myBoard.id} {...this.props} isPlayer={true} isBoard={true} localState={this.state}/>
          {isStarted && <div className="opponentscore"><h1>{opponentScore}</h1></div>}
          <OpponentBoard key={this.props.opponentBoard.id} {...this.props} isPlayer={false} isBoard={true} localState={this.state}/>
        </TransitionGroup>
        <button onClick={this.deal.bind(this)} className="deal-btn btn-primary">Start</button>
        <button onClick={this.endTurn.bind(this)} className="end-turn-btn btn-warning">End Turn</button>
        <button onClick={this.endRound.bind(this)} className="end-round-btn btn-danger">End Round</button>
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
    },
    updateRound: (round) => {
      dispatch(changeGamePhase('endround'));
      dispatch(updateRound(round));
    },
    UpdateMyScore: (score) => {
      dispatch(UpdateMyScore(score));
    },
    UpdateOpponentScore: (score) => {
      dispatch(UpdateOpponentScore(score));
    },
    clearBoard: (myBoard, opponentBoard) => {
      dispatch(clearBoard(myBoard, opponentBoard));
    }
   }
}

export default connect(mapState, mapDispatch)(Table);
