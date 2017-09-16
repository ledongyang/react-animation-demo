import { TweenMax } from 'gsap';

export default {
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
