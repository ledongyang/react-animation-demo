import React from 'react';
import Animation from './animation/animation';
import { findDOMNode } from 'react-dom';
import myHand from './MyHand';
import opponentHand from './OpponentHand';
import boardHand from './Board';
import Draggable from "gsap/Draggable";

const deal = (Component) => {
  return class Deal extends React.Component {

    componentWillEnter(cb) {
      // console.log('enter')
      // console.log(this.props)
      const {isPlayer, stage} = this.props;
      // const {isDealing} = this.props.localState;
      let cards = findDOMNode(this).getElementsByClassName('card');
      cards = [].slice.call(cards, 0)
      cards.forEach(card => {
        Draggable.create(card, {
          type:"x,y",
          edgeResistance:0.65,
          bounds:".table",
          throwProps:true
        })
      })
      // console.log('cards array--->', cards)
      const frontCards = cards.map(card =>
        card.getElementsByClassName('cardFront')[0]
      )
      const backCards = cards.map(card =>
        card.getElementsByClassName('cardBack')[0]
      )
      if (stage === 'deal') {
        Animation.dealHand(cards, frontCards, backCards, {isPlayer}, cb)
      }
    }

    componentWillLeave(cb) {
      // console.log('leave')
      const {isPlayer, stage} = this.props;
      // const {isDealing} = this.props.localState;
      // const {initial} = this.props.localState;
      // console.log(this.props)
      console.log('*****++++>', this.props.localState)
      const cards = findDOMNode(this).getElementsByClassName('card');
      if (stage !== 'initial') {
        // if (stage === 'deal') {
        Animation.emptyHand(cards, {isPlayer}, cb);
        // } else if (isBoard && stage === 'deal') {
        //   // console.log('test--->')
        //   Animation.emptyBoard(cards, {isBoard}, cb);
        // }
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
// export const BoardHand = deal(boardHand);
