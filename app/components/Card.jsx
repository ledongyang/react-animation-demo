import React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import Animation from './animation/animation';

export class Card extends React.Component{

  render () {
    const {cardFront} = this.props.card;
    const {cardBack, isBoard} = this.props;
    let frontStyle = {
      backgroundImage: `url(${cardFront})`,
      backgroundSize: 'cover'
    }
    let backStyle = {
      backgroundImage: `url(${cardBack})`,
      backgroundSize: 'cover'
    }
    return (
      <div className="card" >
        {
          !isBoard && <div className="cardFront" style={frontStyle} />
        }
        <div className="cardBack" style={backStyle} />
        {
          isBoard && <div className="cardFront" style={frontStyle} />
        }
      </div>
    )
  }
}

export default Card;
