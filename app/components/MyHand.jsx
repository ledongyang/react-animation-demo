import React from 'react';
import {Card} from './draw';
import { TransitionGroup } from 'react-transition-group';
import {connect} from 'react-redux';
import { playCard, changeStage, showCardDetail } from '../store';
import CardDetail from './CardDetail';

const MyHand = (props) => {
  // console.log('my hand props===>', props)
  const {myHand, stage, isPlayer, myBoard, cardDetail} = props;
  const {cardBack} = props.localState;
  // console.log('stage---->', stage)
  // console.log('card detail-->', cardDetail)
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
      // console.log('play the card ---> ', card)
      dispatch(changeStage('play'))
      dispatch(playCard(card));
    },
    showDetailOfACard: (card) => {
      // console.log('im going to show, hold on, ', card)
      dispatch(showCardDetail(card))
    }
  }
}

export default connect(mapState, mapDispatch)(MyHand);
