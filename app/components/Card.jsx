import React from 'react';
import { findDOMNode } from 'react-dom';
import Animation from './animation/animation';

class Card extends React.Component{
  // console.log('card props--->', props)

  // componentWillAppear(cb) {

  // }

  componentWillEnter(cb) {
    const {stage, index} = this.props;
    // console.log('stage--->', stage)
    const card = findDOMNode(this);
    // console.log('card ---- > ', card)
    const frontCard = card.getElementsByClassName('cardFront')[0];
    // console.log('front card ----> ', frontCard)
    const backCard = card.getElementsByClassName('cardBack')[0];
    if (stage === 'draw') {
      // console.log('card ---- > ', card)
      console.log('index--->', index)
      Animation.drawMyHand(card, frontCard, backCard, index, cb);
    }
    // cb()
  }

  componentWillLeave(cb) {
    cb()
  }

  render () {
    const {cardFront, cardBack} = this.props;
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
}

export default Card;
