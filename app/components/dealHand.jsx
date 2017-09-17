import React from 'react';
import Animation from './animation';
import { findDOMNode } from 'react-dom';
import { TweenMax, TimelineLite } from 'gsap';

export default (Component) => {

  return class dealHand extends React.Component {

    constructor(props) {
      super(props);
      // this.state = props.state;
      console.log(props.state);
      this.state = props.state;
    }

    componentWillEnter(cb) {
      console.log('enter')
    }

    componentWillAppear(cb) {
      console.log('hand appear')
      console.log(findDOMNode(this))
      const targetArr = findDOMNode(this).getElementsByClassName('back')
      // console.log(targetArr);
      // console.log(this)
      // option.direction = this.props.direction;
      // console.log(this.props.isFront)
      // let state = this.props;
      // Animation.deal(targetArr, cb);
      // this.setState({isFront: !this.state.isFront})
      const duration = 1;
      const stagger = 0.2;
      const position = 0;
      const tl = new TimelineLite();
      tl.staggerFromTo(targetArr, duration, {
        cycle: {
          y: function() {
            return 10
          },
          x: function() {
            return 10
          }
        }
      }, {
        cycle: {
          y: function() {
            return 600
          },
          x: function(index) {
            return 100 + (index + 1) * 50
          }
        }
      }, stagger, position, () => {
        console.log('animation completed!')
        // console.log(state)
        // state.setState(state.isFront = !state.isFront)
        // console.log(cb)
        cb()
        console.log(this)
        this.setState({revealHand: !this.state.revealHand})
      })
    }

    // componentWillLeave() {
    //   console.log('hand leave')
    // }

    render() {
      return (
        <Component state={this.state} />
      )
    }
  }
}
