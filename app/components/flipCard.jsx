import React from 'react';
import { findDOMNode } from 'react-dom';
import { TweenMax, TimelineLite } from 'gsap';

export default (Component) => {
  return class flipCard extends React.Component {
    componentWillAppear(cb) {
      console.log('card appear');
      cb()
    }

    componentWillEnter(cb) {
      console.log('card enter')
      const target = findDOMNode(this);
      console.log(target)
      TweenMax.to(target, 0.5, {
        rotationY: '90',
        z: 50,
        onComplete() {
          console.log('front flip half complete')
          cb()
        }
      })
    }

    componentDidEnter() {
      console.log('card did enter')
      const target = findDOMNode(this);
      TweenMax.fromTo(target, 0.5, {rotationY: '-90'}, {
        rotationY: '0',
        onComplete() {
          console.log('front flip all complete')
        }
      })
    }

    componentWillLeave(cb) {
      console.log('card leave')
      const target = findDOMNode(this);
      console.log(target);
      TweenMax.to(target, 0.5, {
        rotationY: '90',
        onComplete() {
          console.log('flip complete!')
          cb()
        }
      })
    }

    // componentDidLeave() {
    //   console.log('card did leave')
    //   const target = findDOMNode(this);
    //   console.log(target)
    // }

    render() {
      return <Component state={this.props.state} index={this.props.index} />
    }
  }
}
