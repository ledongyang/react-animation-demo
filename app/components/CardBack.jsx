import React from 'react';
import flipCard from './flipCard';

class CardBack extends React.Component {

  render() {
    return (
      <div className="back" >
        {/* <p>{type}</p> */}
        <h1>Back</h1>
      </div>
    )
  }
}

export default flipCard(CardBack);
