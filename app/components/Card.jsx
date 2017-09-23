import React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import Animation from './animation/animation';

export class Card extends React.Component{
  // console.log('card props--->', props)

  // componentWillAppear(cb) {

  // }

  // constructor(props) {
  //   super(props);
  //   this.state = props;
  //   this.playACard = this.playACard.bind(this);
  // }

  // playACard() {
  //   console.log('hello')
  //   // const card = this.props;
  //   // this.props.playACard(card)
  // }

  render () {
    // console.log(this.props)
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
    // console.log('card props-->', this.props.id)
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

// Card.prototype.playACard = function() {
//   console.log(this.props)
// }

// const mapState = (state) => {
//   return {

//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     playACard: (card) => {
//       console.log('play the card ---> ')
//       // dispatch(changeStage('play'))
//       // dispatch(playCard(card));
//     }
//   }
// }

// export default connect(mapState, mapDispatch)(Card);
export default Card;
