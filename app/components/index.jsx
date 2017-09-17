import React, { Component } from 'react';
import { TransitionGroup } from 'react-transition-group';
// import Box from './box';
// import Circle from './circle';
// import Card from './Card';
import Deck from './Deck';
import CardBack from './CardBack';
import Hand from './Hand';

export default class Table extends Component {

  constructor() {
    super();
    this.state = {
      handCards: [{
        id: 1,
        name: 'A',
        type: 'Spade',
        value: 14
      }, {
        id: 2,
        name: '2',
        type: 'Diamond',
        value: 15
      }, {
        id: 3,
        name: 'K',
        type: 'Heart',
        value: 13
      }, {
        id: 4,
        name: 'J',
        type: 'Club',
        value: 11
      }, {
        id: 5,
        name: '7',
        type: 'Spade',
        value: 14
      }, {
        id: 6,
        name: '4',
        type: 'Diamond',
        value: 15
      }, {
        id: 7,
        name: '5',
        type: 'Heart',
        value: 13
      }, {
        id: 8,
        name: '10',
        type: 'Club',
        value: 11
      }],
      revealHand: false
    }
  }

  render() {
    // console.log('showbox: ', this.state.showBox);
    // console.log('showCircle: ', this.state.showCircle);
    // console.log(this.state.flag)

    return (
      <div className="table">
        <Deck />
        {/* <button className="toggle-btn-left" onClick={this.toggleBoxLeft}>{'<<<'}</button>
        <button className="toggle-btn-right" onClick={this.toggleBoxRight}>{'>>>'}</button> */}
        <TransitionGroup>
          {/* <Box key={`${this.state.index}`} direction={this.state.direction} dog={this.state.dogs[this.state.index]} /> */}
        {/* {
          this.state.showBox && <Box />
        } */}
        {/* {
          this.state.showCircle && <Circle />
        } */}

          {/* {
            this.state.handCards.map(card =>
              <Card key={card.id} card={card} />
            )
          } */}
          <Hand state={this.state} />
          {/* <Box /> */}

        </TransitionGroup>
      </div>
    )
  }
}
