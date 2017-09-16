import React, { Component } from 'react';
import { TransitionGroup } from 'react-transition-group';
import Box from './box';
import Circle from './circle';

export default class Main extends Component {

  constructor() {
    super();
    this.state = {
      // showBox: true,
      // showCircle: false
      // flag: true,
      dogs: ['http://img2.zergnet.com/731737_300.jpg',
      'https://i.pinimg.com/736x/68/de/1c/68de1c30a5e0e373fd6ee7fd143714b8.jpg',
      'https://www.what-dog.net/Images/faces2/scroll001.jpg',
      'https://www.what-dog.net/Images/faces2/scroll0015.jpg',
      'http://www.nationalgeographic.com/content/dam/animals/thumbs/rights-exempt/mammals/d/domestic-dog_thumb.jpg',
      'https://yt3.ggpht.com/EdjnobpzppDl5pSVU2s2AUIiFS0qBfT8Jdodw-FHMhugJK5zmzWDLkpqDVtpnaLSP66M5F8nqINImLKGtQ=s900-nd-c-c0xffffffff-rj-k-no',
      'http://urbanmilwaukee.com/wp-content/uploads/2017/06/Too-cute-doggone-it-video-playlist-1.jpg'],
      index: 0,
      direction: 'right'
    }
    this.toggleBoxLeft = this.toggleBoxLeft.bind(this);
    this.toggleBoxRight = this.toggleBoxRight.bind(this);
  }

  toggleBoxLeft() {
    this.setState({
      index: this.state.index === 0 ? this.state.dogs.length - 1 : this.state.index - 1,
      direction: 'left'
    })
  }

  toggleBoxRight() {
    this.setState({
      // showBox: !this.state.showBox,
      // showCircle: !this.state.showCircle
      index: this.state.index === this.state.dogs.length - 1 ? 0 : this.state.index + 1,
      direction: 'right'
      // flag: !this.state.flag
    })
  }

  render() {
    // console.log('showbox: ', this.state.showBox);
    // console.log('showCircle: ', this.state.showCircle);
    // console.log(this.state.flag)
    return (
      <div className="page">
        <button className="toggle-btn-left" onClick={this.toggleBoxLeft}>{'<<<'}</button>
        <button className="toggle-btn-right" onClick={this.toggleBoxRight}>{'>>>'}</button>
        <TransitionGroup>
          <Box key={`${this.state.index}`} direction={this.state.direction} dog={this.state.dogs[this.state.index]} />
        {/* {
          this.state.showBox && <Box />
        } */}
        {/* {
          this.state.showCircle && <Circle />
        } */}
        </TransitionGroup>
      </div>
    )
  }
}
