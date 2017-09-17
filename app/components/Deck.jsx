import React from 'react';
import CardBack from './CardBack';

const Deck = (props) => {
  // console.log('props--->', props)
  // let {id, name, type, value} = props.card;
  // let divStyle = {
  //   left: (id * 150)
  // }
  // console.log(name)
  return (
    <div className="deck">
      <CardBack />
    </div>
  )
}

export default Deck;
