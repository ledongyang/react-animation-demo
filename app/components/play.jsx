import React from 'react';
import Animation from './animation/animation';
import { findDOMNode } from 'react-dom';
import card from './Card';

const play = (Component) => {
  return class Play extends React.Component {
    componentWillEnter(cb) {
      console.log('i enter to board')
      const {stage, index} = this.props;
      // console.log('stage--->', stage)
      const card = findDOMNode(this);
      // console.log('card ---- > ', card)
      const frontCard = card.getElementsByClassName('cardFront')[0];
      // console.log('front card ----> ', frontCard)
      const backCard = card.getElementsByClassName('cardBack')[0];
    }

    componentWillLeave(cb) {
      console.log('i leaving from board')
      cb()
    }

    render() {
      return (
        <Component {...this.props} />
      )
    }
  }
}

export const Card = play(card);
