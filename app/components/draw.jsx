import React from 'react';
import Animation from './animation/animation';
import { findDOMNode } from 'react-dom';
import card from './Card';

const draw = (Component) => {
  return class Draw extends React.Component {
    componentWillAppear(cb) {
      const {card, playACard, isPlayer, showDetailOfACard, stage} = this.props;
      const handCard = findDOMNode(this);
      const frontCard = handCard.getElementsByClassName('cardFront')[0];
      // console.log('stage==>', stage)
      if (isPlayer && stage.whosTurn === 'myturn') {
        Animation.draggable(handCard, card, playACard, isPlayer);
        Animation.onHover(handCard, showDetailOfACard, card);
      }
      cb()
    }

    componentWillEnter(cb) {
      const {stage, index, card, playACard, isPlayer, showDetailOfACard} = this.props;
      const handCard = findDOMNode(this);
      const frontCard = handCard.getElementsByClassName('cardFront')[0];
      const backCard = handCard.getElementsByClassName('cardBack')[0];
      // console.log('stage--->', stage)
      if (stage.gamePhase === 'draw') {
        Animation.draggable(handCard, card, playACard, isPlayer);
        Animation.onHover(handCard, showDetailOfACard, card);
        Animation.drawMyHand(handCard, frontCard, backCard, index, cb);
      }
    }

    componentWillLeave(cb) {
      const {stage, isPlayer} = this.props;
      // console.log('im leaving from my hand')
      // console.log('whos turn -- >', stage.whosTurn)
      if (!isPlayer) {
        console.log('opponent leave hand')
        const {opponentBoard} = this.props;
        const handCard = findDOMNode(this);
        const frontCard = handCard.getElementsByClassName('cardFront')[0];
        const backCard = handCard.getElementsByClassName('cardBack')[0];
        const index = opponentBoard.boardCards.length;
        Animation.leavingOpponentHand(handCard, frontCard, backCard, index, cb)
      } else {
        const {myBoard} = this.props;
        const handCard = findDOMNode(this);
        const index = myBoard.boardCards.length;
        Animation.leavingMyHand(handCard, index, cb)
      }
    }

    render() {
      return (
        <Component {...this.props} />
      )
    }
  }
}

export const Card = draw(card);
