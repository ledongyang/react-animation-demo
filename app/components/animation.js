import { TweenMax, TimelineLite } from 'gsap';

export default {

  deal: (targetArr, cb) => {
    const duration = 1;
    const stagger = 0.3;
    const position = 0;
    const tl = new TimelineLite();
    tl.staggerTo(targetArr, duration, {
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
    })
  },

  show: (target, cb, option) => {
    const duration = option.duration;
    TweenMax.fromTo(target, duration, {
      x: option.direction === 'right' ? -400 : 400,
      opacity: 0,
      scale: 0
    }, {
      x: 0,
      opacity: 1,
      scale: 1,
      onComplete() {
        console.log('show animation complete!');
        cb();
      }
    })
  },
  hide: (target, cb, option) => {
    const duration = option.duration;
    TweenMax.fromTo(target, duration, {
      x: 0,
      opacity: 1,
      scale: 1
    }, {
      x: option.direction === 'right' ? 400 : -400,
      opacity: 0,
      scale: 0,
      onComplete() {
        console.log('hide animation complete!');
        cb();
      }
    })
  }
}
