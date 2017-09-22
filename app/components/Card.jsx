import React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import Animation from './animation/animation';
import { playCard, changeStage } from '../store';

class Card extends React.Component{
  // console.log('card props--->', props)

  // componentWillAppear(cb) {

  // }

  playACard() {
    const card = this.props;
    // this.props.playACard(card)
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
    // console.log('card props-->', this.props.id)
    return (
      <div className="card" onClick={this.playACard.bind(this)} >
        <div className="cardFront" style={frontStyle} />
        <div className="cardBack" style={backStyle} />
      </div>
    )
  }
}

const mapState = (state) => {
  return {

  }
}

const mapDispatch = (dispatch) => {
  return {
    playACard: (card) => {
      // console.log('play the card ---> ', card)
      dispatch(changeStage('play'))
      dispatch(playCard(card));
    }
  }
}

export default connect(mapState, mapDispatch)(Card);
// export default Card;
