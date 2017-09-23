import React from 'react';

export default (props) => {
  // console.log('card detail props', props.cardDetail)
  const {cardFront} = props.cardDetail;
  // console.log(cardFront)
  let frontStyle = {
    backgroundImage: `url(${cardFront})`,
    backgroundSize: 'cover',
    right: 10,
    top: 130,
  }
  return (
    <div className="card-detail" style={frontStyle}></div>
  )
}
