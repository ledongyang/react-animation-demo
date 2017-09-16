import React from 'react';
import fadesIn from './fadesIn';
// import Animation from './animation';

// export default class Circle extends React.Component {

//   componentWillEnter(cb) {
//     console.log('enter')
//     const target = this.container;
//     Animation.show(target, cb);
//   }

//   componentWillLeave(cb) {
//     console.log('leave')
//     const target = this.container;
//     Animation.hide(target, cb);
//   }

//   render() {
//     return (
//       <div className="circle" ref={c => this.container = c} />
//     )
//   }
// }

function Circle(props) {
  return (
    <div className="circle" />
  )
}

export default fadesIn(Circle, {duration: 1});
