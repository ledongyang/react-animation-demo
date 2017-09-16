import React from 'react';
import Animation from './animation';
import { findDOMNode } from 'react-dom';

export default (Component, option = {duration: 0.3, direction: 'right'}) => {

  return class FadesIn extends React.Component {
    // constructor(props) {
    //   super(props);
    //   console.log(props);
    // }

    componentWillEnter(cb) {
      console.log('enter')
      const target = findDOMNode(this);
      option.direction = this.props.direction;
      Animation.show(target, cb, option);
    }

    // componentWillLeave(cb) {
    //   console.log('leave')
    //   const target = findDOMNode(this);
    //   option.direction = this.props.direction;
    //   Animation.hide(target, cb, option);
    // }

    render() {
      // console.log(this.props)
      // findDOMNode(this).style = {backgroundColor: this.props.color}
      return (
        <Component dog={this.props.dog} />
      )
    }
  }
}
