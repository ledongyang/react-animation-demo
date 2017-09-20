import React from 'react';
import Card from './Card';

const MyHand = (props) => {
  const {myHandCards, cardBack} = props;
  // console.log(myHandCards)
  return (
    <div className="myHand">
      {
        myHandCards.map((handCard) =>
          <Card key={handCard.id} {...handCard} cardBack={cardBack} />
        )
      }
    </div>
  )
}
export default MyHand;
