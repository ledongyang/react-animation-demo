import React from 'react';
import Animation from './animation/animation';
import { findDOMNode } from 'react-dom';
import card from './Card';

const play = (Component) => {
  return class Play extends React.Component {
    componentWillEnter(cb) {
      const {stage, index, myBoard, opponentBoard, card,
        isPlayer, changeTurn, showDetailOfACard, evolveCards} = this.props;
      // console.log('enter my board')
      // console.log('whos turn ---> ', stage.whosTurn)
      // console.log('stage-->', stage.round, stage.gamePhase)
      let evolvedCardsArr;
      if (isPlayer) {
        evolvedCardsArr = checkEvolve(myBoard.boardCards);
      } else {
        evolvedCardsArr = checkEvolve(opponentBoard.boardCards);
      }
      if (evolvedCardsArr.length) {
        evolveCards(evolvedCardsArr[0], evolvedCardsArr[1]);
      }
      const handCard = findDOMNode(this);
      // let index = isPlayer ? myBoard.boardCards.length
      //     : opponentBoard.boardCards.length;
      if (isPlayer) {
        Animation.onHover(handCard, showDetailOfACard, card)
        if (stage.gamePhase === 'play') {
          Animation.playToMyBoard(handCard, index + 1, cb);
        }
        if (stage.gamePhase === 'evolve') {
          Animation.evolveEnter(handCard, index + 1, cb);
        }
      } else {
        console.log('opponent play to board')
        if (stage.gamePhase === 'play') {
          // console.log(changeTurn);
          Animation.playToOpponentBoard(handCard, changeTurn, index + 1, cb);
        }
        if (stage.gamePhase === 'evolve') {
          Animation.evolveEnter(handCard, index + 1, cb, changeTurn);
        }
      }
    }

    componentWillLeave(cb) {
      const handCard = findDOMNode(this);
      Animation.evolveLeave(handCard, cb);
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
