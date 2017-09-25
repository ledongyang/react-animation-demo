import React from 'react';
import {Card} from './play';
import { TransitionGroup } from 'react-transition-group';
import {connect} from 'react-redux';
import { showCardDetail, evolve, changeGamePhase } from '../store';
import { findDOMNode } from 'react-dom';
import CardDetail from './CardDetail';

class Board extends React.Component {

  render() {
    const {myBoard, opponentBoard, showDetailOfACard, evolveCards, cardDetail, stage} = this.props;
    const {cardBack} = this.props.localState;
    const totalBP = myBoard.boardCards.reduce(function(sum, card) {
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
    return (
      <div>
        {
          myBoard.boardCards.find(boardCard => +boardCard.id === +cardDetail.id) && <CardDetail cardDetail={cardDetail} />
        }
        <div className="myBoard">

          <div className="myBpBoard"><h1>BP: {totalBP}</h1></div>
          <TransitionGroup>
          {
            myBoard.boardCards.map((boardCard, index) =>
              <Card key={boardCard.id} card={boardCard} isPlayer={true} showDetailOfACard={showDetailOfACard} evolveCards={evolveCards} myBoard={myBoard} stage={stage} cardBack={cardBack} index={index} isBoard={true}/>
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
    showDetailOfACard: (card) => {
      dispatch(showCardDetail(card))
    },
    evolveCards: (card1, card2) => {
      dispatch(changeGamePhase('evolve'))
      dispatch(evolve(card1, card2));
    }
  }
}

export default connect(mapState, mapDispatch)(Board);

