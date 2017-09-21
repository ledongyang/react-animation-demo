import React from 'react';
import Card from './Card';

const Board = (props) => {
  // console.log('my hand props===>', props)
  // const {myHand} = props;
  // const {cardBack} = props.localState;
  // console.log(myHand)
  console.log('board props===>', props)
  const {boardHand} = props;
  const {cardBack} = props.localState;
  return (
    <div className="board">
      {
        boardHand.map((card) =>
          <Card key={card.id} {...card} cardBack={cardBack} />
        )
      }
    </div>
  )
}
export default Board;
