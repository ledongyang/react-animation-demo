import { TweenMax, TimelineLite } from 'gsap';

export default {
  dealHand: (cards, frontCards, backCards, option, cb) => {
    TweenMax.set(frontCards, {rotationY: -180})
    const duration = 1;
    const stagger = 0.2;
    const position = 0;
    // console.log('option--->', option)
    let {isPlayer, isBoard} = option;
    let ypos = isPlayer ? 600 : -50;
    let xpos = isPlayer ? 100 : 600;
    if (isBoard) {
      // console.log('testest')
      ypos = 300;
      xpos = 300;
    }
    const tl = new TimelineLite();
    tl.staggerTo(cards, duration, {
      cycle: {
        y: function() {
          return ypos
        },
        x: function(index) {
          return xpos + (index + 1) * 50
        }
      }
    }, stagger, position, cb)
    if (isPlayer || isBoard) {
      tl
      .staggerTo(backCards, 1, {
        rotationY: -180
      }, stagger, position)
      .staggerTo(frontCards, 1, {
        rotationY: 0
      }, stagger, position, cb)
    }
  },
  emptyHand: (cards, option, cb) => {
    const {isPlayer} = option;
    let ypos = isPlayer ? 800 : -200;
    const duration = 0.5;
    const stagger = 0.2;
    const position = 0;
    const tl = new TimelineLite();
    tl.staggerTo(cards, duration, {
      y: ypos
    }, stagger, position, cb)
  },
  emptyBoard: (cards, option, cb) => {
    // console.log('testeteteteetet===>')
    // const {isBoard} = option;
    let xpos = 1000;
    const duration = 0.5;
    const stagger = 0.2;
    const position = 0;
    const tl = new TimelineLite();
    tl.staggerTo(cards, duration, {
      x: xpos
    }, stagger, position, cb)
  }
}
