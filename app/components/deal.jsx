import React from 'react';
import Animation from './Animation/animation';
import { findDOMNode } from 'react-dom';
import myHand from './MyHand';
import opponentHand from './OpponentHand';
import boardHand from './Board';

const deal = (Component) => {
  return class Deal extends React.Component {

    componentWillEnter(cb) {
      // console.log('enter')
      // console.log(this.props)
      const {isPlayer, isBoard} = this.props;
      const {isDealing} = this.props.localState;
      let cards = findDOMNode(this).getElementsByClassName('card');
      cards = [].slice.call(cards, 0)
      const frontCards = cards.map(card =>
        card.getElementsByClassName('cardFront')[0]
      )
      const backCards = cards.map(card =>
        card.getElementsByClassName('cardBack')[0]
      )
      if (isDealing) {
        Animation.dealHand(cards, frontCards, backCards, {isPlayer, isBoard}, cb)
      }
    }

    componentWillLeave(cb) {
      // console.log('leave')
      const {isPlayer, initial, isBoard} = this.props;
      const {isDealing} = this.props.localState;
      // const {initial} = this.props.localState;
      // console.log(this.props)
      // console.log('*****++++>', this.props)
      const cards = findDOMNode(this).getElementsByClassName('card');
      if (!initial) {
        if (!isBoard && isDealing) {
          Animation.emptyHand(cards, {isPlayer}, cb);
        } else if (isBoard && isDealing) {
          // console.log('test--->')
          Animation.emptyBoard(cards, {isBoard}, cb);
        }
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

export const MyHand = deal(myHand);
export const OpponentHand = deal(opponentHand);
export const BoardHand = deal(boardHand);
