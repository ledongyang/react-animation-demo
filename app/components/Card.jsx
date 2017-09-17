import React from 'react';
import flipCard from './flipCard';

class Card extends React.Component {

  constructor(props) {
    super(props);
    console.log('card--->', props.state);
    console.log('index--->', props.index)
    // this.card = props.card;
    // this.divStyle = {
    //   left: this.card.id * 150
    // }
  }

  render() {
    let {name, type} = this.props.state;
    let index = this.props.index;
    let divStyle = {
      left: (index + 1) * 50 + 100,
      top: 600
    }
    return (
      <div className="card" style={divStyle}>
        <p>{type}</p>
        <h1>{name}</h1>
      </div>
    )
  }
}

export default flipCard(Card);
