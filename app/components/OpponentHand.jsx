import React from 'react';
import Card from './Card';

const OpponentHand = (props) => {
  const {opponentHand} = props;
  const {cardBack} = props.localState;
  return (
    <div className="opponentHand">
      {
        opponentHand.map((handCard) =>
          <Card key={handCard.id} {...handCard} cardBack={cardBack} />
        )
      }
    </div>
  )
}
export default OpponentHand;
