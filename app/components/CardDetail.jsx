import React from 'react';

export default (props) => {
  const {cardFront} = props.cardDetail;
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
