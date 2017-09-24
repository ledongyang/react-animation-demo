import React from 'react';
import {Card} from './play';
import { TransitionGroup } from 'react-transition-group';
import {connect} from 'react-redux';
import { evolve, changeGamePhase, changeTurn } from '../store';
import { findDOMNode } from 'react-dom';
// import CardDetail from './CardDetail';

class OpponentBoard extends React.Component {

  render() {
    const {opponentBoard, evolveCards, stage, changeTurn} = this.props;
    const {cardBack} = this.props.localState;
    const totalBP = opponentBoard.boardCards.reduce(function(sum, card) {
      return sum + card.bp;
    }, 0)
    return (
      <div>
        <div className="opponentBoard">

          <div className="opponentBpBoard">Battle Points: {totalBP}</div>
          <TransitionGroup>
          {
            opponentBoard.boardCards.map((boardCard) =>
              <Card key={boardCard.id} card={boardCard} evolveCards={evolveCards} opponentBoard={opponentBoard} stage={stage} cardBack={cardBack} changeTurn={changeTurn} isBoard={true}/>
            )
          }
          </TransitionGroup>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {

  }
}

const mapDispatch = (dispatch) => {
  return {
    evolveCards: (card1, card2) => {
      dispatch(changeGamePhase('evolve'))
      dispatch(evolve(card1, card2, 'opponentturn'));
    },
    changeTurn: () => {
      dispatch(changeGamePhase('endturn'))
      dispatch(changeTurn('myturn'));
    }
  }
}

export default connect(mapState, mapDispatch)(OpponentBoard);
