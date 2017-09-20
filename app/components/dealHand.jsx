import React from 'react';
import Animation from './Animation/animation';
import { findDOMNode } from 'react-dom';
import myHand from './MyHand';
import opponentHand from './OpponentHand';

const dealHand = (Component) => {
  return class DealHand extends React.Component {

    componentWillEnter(cb) {
      // console.log('enter')
      const {isPlayer} = this.props;
      let cards = findDOMNode(this).getElementsByClassName('card');
      cards = [].slice.call(cards, 0)
      const frontCards = cards.map(card =>
        card.getElementsByClassName('cardFront')[0]
      )
      const backCards = cards.map(card =>
        card.getElementsByClassName('cardBack')[0]
      )
      Animation.dealHand(cards, frontCards, backCards, {isPlayer}, cb)
    }

    componentWillLeave(cb) {
      // console.log('leave')
      const {isPlayer, initial} = this.props;
      // console.log(this.props)
      const cards = findDOMNode(this).getElementsByClassName('card');
      if (!initial) {
        Animation.emptyHand(cards, {isPlayer}, cb);
      } else {
        cb();
      }
    }

    render() {
      // console.log(this.props)
      return (
        <Component { ...this.props } />
      )
    }
  }
}

export const MyHand = dealHand(myHand);
export const OpponentHand = dealHand(opponentHand);
