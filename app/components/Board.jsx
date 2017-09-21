import React from 'react';
import Card from './Card';

const Board = (props) => {
  // console.log('my hand props===>', props)
  // const {myHand} = props;
  // const {cardBack} = props.localState;
  // console.log(myHand)
  const boardCards = [];
  return (
    <div className="board">
      {
        boardCards.map((card) =>
          <Card key={card.id} {...card} />
        )
      }
    </div>
  )
}
export default Board;
