import React from 'react';
import fadesIn from './fadesIn';
// import Animation from './animation';
// import { TweenMax } from 'gsap';

// export default class Box extends React.Component {
  // componentWillAppear(cb) {
  //   console.log('appear')
  //   const target = this.container;
  //   Animation.show(target, cb);
  // }

  // componentWillEnter(cb) {
  //   console.log('enter')
  //   const target = this.container;
  //   Animation.show(target, cb);
  // }

  // componentWillLeave(cb) {
  //   console.log('leave')
  //   const target = this.container;
  //   Animation.hide(target, cb);
  // }

//   render() {
//     return (
//       <div className="box" ref={c => this.container = c} />
//     )
//   }
// }
function Box(props) {
  // console.log(props);
  const divStyle = {
    backgroundImage: `url(${props.dog})`,
    backgroundSize: 'cover'
  }
  return (
    <div className="box" style={divStyle} />
  )
}

export default fadesIn(Box, {duration: 1});
