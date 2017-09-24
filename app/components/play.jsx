import React from 'react';
import Animation from './animation/animation';
import { findDOMNode } from 'react-dom';
import card from './Card';

const play = (Component) => {
  return class Play extends React.Component {
    componentWillEnter(cb) {
      console.log('i enter to board')
      console.log('board', this.props)
      const {stage, myBoard, card, showDetailOfACard, evolveCards} = this.props;
      const evolvedCardsArr = checkEvolve(myBoard.boardCards);
      if (evolvedCardsArr.length) {
        evolveCards(evolvedCardsArr[0], evolvedCardsArr[1]);
      }
      // console.log('stage--->', stage)
      const handCard = findDOMNode(this);
      const index = myBoard.boardCards.length;
      console.log('#####-->', myBoard.boardCards)
      // console.log('index', index)
      Animation.onHover(handCard, showDetailOfACard, card)
      if (stage === 'play') {
        Animation.playToMyBoard(handCard, index, cb);
      }
      if (stage === 'evolve') {
        console.log('play evolve enter')
        console.log(handCard)
        Animation.evolveEnter(handCard, index, cb);
        // Animation.arrageBoard(myBoard.boardCards, cb)
      }
      // console.log('card ---- > ', card)
      // const frontCard = card.getElementsByClassName('cardFront')[0];
      // console.log('front card ----> ', frontCard)
      // const backCard = card.getElementsByClassName('cardBack')[0];

    }

    componentWillLeave(cb) {
      console.log('play evolve leave')
      const handCard = findDOMNode(this);
      console.log('stage', this.props.stage)
      // if (this.props.stage === 'evolve') {
      //   console.log('hello')
      Animation.evolveLeave(handCard, cb);
      // }
    }

    render() {
      return (
        <Component {...this.props} />
      )
    }
  }
}

export const Card = play(card);

const checkEvolve = (boardCards) => {
  const evolveCards = [];
  for (let i = 0; i < boardCards.length; i++) {
    for (let j = i + 1; j < boardCards.length; j++) {
      if (boardCards[i].type === boardCards[j].type) {
        evolveCards.push(boardCards[i]);
        evolveCards.push(boardCards[j]);
      }
    }
  }
  return evolveCards;
}
