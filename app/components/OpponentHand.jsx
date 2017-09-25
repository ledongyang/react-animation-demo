import React from 'react';
import {Card} from './draw';
import { TransitionGroup } from 'react-transition-group';
import {connect} from 'react-redux';
import { playCard, changeGamePhase } from '../store';

const OpponentHand = (props) => {
  const {opponentHand, stage, isPlayer, opponentBoard, index} = props;
  const {cardBack} = props.localState;
  return (
    <div className="opponentHand">
      <TransitionGroup>
      {
        opponentHand.handCards.map((handCard) =>
          <Card key={handCard.id} card={handCard} playACard={props.playACard} isPlayer={isPlayer} index={index} stage={stage} cardBack={cardBack} opponentBoard={opponentBoard} />
        )
      }
      </TransitionGroup>
    </div>
  )
}

const mapState = (state) => {
  return {

  }
}

const mapDispatch = (dispatch) => {
  return {
    playACard: (card) => {
      dispatch(changeGamePhase('play'))
      dispatch(playCard(card));
    }
  }
}

export default connect(mapState, mapDispatch)(OpponentHand);

