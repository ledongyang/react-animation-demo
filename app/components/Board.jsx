import React from 'react';
import {Card} from './play';
import { TransitionGroup } from 'react-transition-group';
import {connect} from 'react-redux';
import { showCardDetail, evolve, changeGamePhase } from '../store';
import { findDOMNode } from 'react-dom';
import CardDetail from './CardDetail';

class Board extends React.Component {

  render() {
    const {myBoard, showDetailOfACard, evolveCards, cardDetail, stage} = this.props;
    const {cardBack} = this.props.localState;
    const totalBP = myBoard.boardCards.reduce(function(sum, card) {
      return sum + card.bp;
    }, 0)
    return (
      <div>
        {
          myBoard.boardCards.find(boardCard => +boardCard.id === cardDetail.id) && <CardDetail cardDetail={cardDetail} />
        }
        <div className="myBoard">

          <div className="myBpBoard">Battle Points: {totalBP}</div>
          <TransitionGroup>
          {
            myBoard.boardCards.map((boardCard) =>
              <Card key={boardCard.id} card={boardCard} isPlayer={true} showDetailOfACard={showDetailOfACard} evolveCards={evolveCards} myBoard={myBoard} stage={stage} cardBack={cardBack} isBoard={true}/>
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

