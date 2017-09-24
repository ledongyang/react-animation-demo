import React from 'react';
import {Card} from './draw';
import { TransitionGroup } from 'react-transition-group';
import {connect} from 'react-redux';
import { playCard, changeGamePhase, showCardDetail } from '../store';
import CardDetail from './CardDetail';

const MyHand = (props) => {
  const {myHand, stage, isPlayer, myBoard, cardDetail} = props;
  const {cardBack} = props.localState;
  return (
    <div className="myHand">
      {
        myHand.handCards.find(handCard => +handCard.id === +cardDetail.id) && <CardDetail cardDetail={cardDetail} />
      }
      <TransitionGroup>
      {
        myHand.handCards.map((handCard, index) =>
          <Card key={handCard.id} card={handCard} showDetailOfACard={props.showDetailOfACard} playACard={props.playACard} isPlayer={isPlayer} index={index} stage={stage} cardBack={cardBack} myBoard={myBoard} />
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
    },
    showDetailOfACard: (card) => {
      dispatch(showCardDetail(card))
    }
  }
}

export default connect(mapState, mapDispatch)(MyHand);
