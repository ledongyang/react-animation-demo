import React from 'react';
import {Card} from './draw';
import { TransitionGroup } from 'react-transition-group';

const OpponentHand = (props) => {
  const {opponentHand, stage} = props;
  const {cardBack} = props.localState;
  return (
    <div className="opponentHand">
      <TransitionGroup>
      {
        opponentHand.handCards.map((handCard) =>
          <Card key={handCard.id} card={handCard} stage={stage} cardBack={cardBack} />
        )
      }
      </TransitionGroup>
    </div>
  )
}
export default OpponentHand;
