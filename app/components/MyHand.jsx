import React from 'react';
import {Card} from './draw';
import { TransitionGroup } from 'react-transition-group';
import {connect} from 'react-redux';
import { playCard, changeStage } from '../store';

const MyHand = (props) => {
  // console.log('my hand props===>', props)
  const {myHand, stage, isPlayer, myBoard} = props;
  const {cardBack} = props.localState;
  // console.log('stage---->', stage)
  return (
    <div className="myHand">
      <TransitionGroup>
      {
        myHand.handCards.map((handCard, index) =>
          <Card key={handCard.id} card={handCard} playACard={props.playACard} isPlayer={isPlayer} index={index} stage={stage} cardBack={cardBack} myBoard={myBoard} />
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
      console.log('play the card ---> ', card)
      dispatch(changeStage('play'))
      dispatch(playCard(card));
    }
  }
}

export default connect(mapState, mapDispatch)(MyHand);
