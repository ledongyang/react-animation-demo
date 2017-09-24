import React from 'react';
import Animation from './animation/animation';
import { findDOMNode } from 'react-dom';
import myHand from './MyHand';
import opponentHand from './OpponentHand';
import boardHand from './Board';

const deal = (Component) => {
  return class Deal extends React.Component {

    componentWillEnter(cb) {
      const {isPlayer, stage} = this.props;
      let cards = findDOMNode(this).getElementsByClassName('card');
      cards = [].slice.call(cards, 0)
      const frontCards = cards.map(card =>
        card.getElementsByClassName('cardFront')[0]
      )
      const backCards = cards.map(card =>
        card.getElementsByClassName('cardBack')[0]
      )
      if (stage.gamePhase === 'deal') {
        Animation.dealHand(cards, frontCards, backCards, {isPlayer}, cb)
      }
    }

    componentWillLeave(cb) {
      const {isPlayer, stage} = this.props;
      const cards = findDOMNode(this).getElementsByClassName('card');
      if (stage.gamePhase !== 'initial') {
        Animation.emptyHand(cards, {isPlayer}, cb);
      } else {
        cb();
      }
    }

    render() {
      return (
        <Component { ...this.props } />
      )
    }
  }
}

export const MyHand = deal(myHand);
export const OpponentHand = deal(opponentHand);

