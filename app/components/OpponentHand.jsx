import React from 'react';
import Card from './Card';

const OpponentHand = (props) => {
  const {opponentHandCards, cardBack} = props;
  return (
    <div className="opponentHand">
      {
        opponentHandCards.map((handCard) =>
          <Card key={handCard.id} {...handCard} cardBack={cardBack} />
        )
      }
    </div>
  )
}
export default OpponentHand;
