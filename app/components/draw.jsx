import React from 'react';
import Animation from './animation/animation';
import { findDOMNode } from 'react-dom';
import card from './Card';

const draw = (Component) => {
  return class Draw extends React.Component {
    componentWillAppear(cb) {
      // console.log('draw props', this.props)
      const {card, playACard, isPlayer, showDetailOfACard} = this.props;
      const handCard = findDOMNode(this);
      const frontCard = handCard.getElementsByClassName('cardFront')[0];
      // console.log('handcard-->', handCard);
      // if (isPlayer) {
      //   playACard();
      // }
      if (isPlayer) {
        Animation.draggable(handCard, card, playACard, isPlayer);
        Animation.onHover(handCard, showDetailOfACard, card);
      }
      cb()
    }

    componentWillEnter(cb) {
      // console.log('enter')
      const {stage, index, card, playACard, isPlayer, showDetailOfACard} = this.props;
      // console.log('draw props--->', this.props)
      const handCard = findDOMNode(this);
      // console.log('card ---- > ', card)
      const frontCard = handCard.getElementsByClassName('cardFront')[0];
      // console.log('front card ----> ', frontCard)
      const backCard = handCard.getElementsByClassName('cardBack')[0];
      if (stage === 'draw') {
        Animation.draggable(handCard, card, playACard, isPlayer);
        Animation.onHover(handCard, showDetailOfACard, card);
        // console.log('card ---- > ', card)
        // console.log('index--->', index)
        Animation.drawMyHand(handCard, frontCard, backCard, index, cb);
      }
    }

    componentWillLeave(cb) {
      // console.log('i leaving from hand')
      // console.log('props--->', this.props)
      const {myBoard} = this.props;
      const handCard = findDOMNode(this);
      const index = myBoard.boardCards.length;
      Animation.leavingMyHand(handCard, index, cb)
    }

    render() {
      return (
        <Component {...this.props} />
      )
    }
  }
}

export const Card = draw(card);
