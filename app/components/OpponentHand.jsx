import React from 'react';
import Card from './Card';
import { TransitionGroup } from 'react-transition-group';

const OpponentHand = (props) => {
  const {opponentHand, stage} = props;
  const {cardBack} = props.localState;
  return (
    <div className="opponentHand">
      <TransitionGroup>
      {
        opponentHand.handCards.map((handCard) =>
          <Card key={handCard.id} {...handCard} stage={stage} cardBack={cardBack} />
        )
      }
      </TransitionGroup>
    </div>
  )
}
export default OpponentHand;
