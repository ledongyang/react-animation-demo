import React from 'react';
import Animation from './animation/animation';
import { findDOMNode } from 'react-dom';
import card from './Card';

const draw = (Component) => {
  return class Draw extends React.Component {
    componentWillEnter(cb) {
      // console.log('enter')
      const {stage, index} = this.props;
      // console.log('stage--->', stage)
      const card = findDOMNode(this);
      // console.log('card ---- > ', card)
      const frontCard = card.getElementsByClassName('cardFront')[0];
      // console.log('front card ----> ', frontCard)
      const backCard = card.getElementsByClassName('cardBack')[0];
      if (stage === 'draw') {
        // console.log('card ---- > ', card)
        console.log('index--->', index)
        Animation.drawMyHand(card, frontCard, backCard, index, cb);
      }
    }

    componentWillLeave(cb) {
      console.log('i leaving from hand')
      cb()
    }

    render() {
      return (
        <Component {...this.props} />
      )
    }
  }
}

export const Card = draw(card);
