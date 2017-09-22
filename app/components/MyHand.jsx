import React from 'react';
import Card from './Card';
import { TransitionGroup } from 'react-transition-group';

const MyHand = (props) => {
  // console.log('my hand props===>', props)
  const {myHand, stage} = props;
  const {cardBack} = props.localState;
  // console.log('stage---->', stage)
  return (
    <div className="myHand">
      <TransitionGroup>
      {
        myHand.handCards.map((handCard, index) =>
          <Card key={handCard.id} {...handCard} index={index} stage={stage} cardBack={cardBack} />
        )
      }
      </TransitionGroup>
    </div>
  )
}
export default MyHand;
