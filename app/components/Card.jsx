import React from 'react';

const Card = (props) => {
  // console.log('card props--->', props)
  const {cardFront, cardBack} = props;
  let frontStyle = {
    backgroundImage: `url(${cardFront})`,
    backgroundSize: 'cover'
  }
  let backStyle = {
    backgroundImage: `url(${cardBack})`,
    backgroundSize: 'cover'
  }
  return (
    <div className="card">
      <div className="cardFront" style={frontStyle} />
      <div className="cardBack" style={backStyle} />
    </div>
  )
}

export default Card;
