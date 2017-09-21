import React from 'react';
import Card from './Card';

const MyHand = (props) => {
  console.log('my hand props===>', props)
  const {myHand} = props;
  const {cardBack} = props.localState;
  console.log(myHand)
  return (
    <div className="myHand">
      {
        myHand.map((handCard) =>
          <Card key={handCard.id} {...handCard} cardBack={cardBack} />
        )
      }
    </div>
  )
}
export default MyHand;
