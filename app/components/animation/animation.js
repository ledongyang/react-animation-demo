import { TweenMax, TweenLite, TimelineLite } from 'gsap';
import Draggable from "gsap/Draggable";
// import Card from '../Card';

export default {
  dealHand: (cards, frontCards, backCards, option, cb) => {
    TweenMax.set(frontCards, {rotationY: -180});
    TweenMax.set(cards, {perspective:600});
    const duration = 1;
    const stagger = 0.5;
    const position = 0;
    // console.log('option--->', option)
    let {isPlayer} = option;
    let ypos = isPlayer ? 570 : -50;
    let xpos = isPlayer ? 0 : 600;
    const tl = new TimelineLite();
    tl.staggerFromTo(cards, duration, {
      cycle: {
        y: 10,
        x: 10
      }
    }, {
      cycle: {
        y: function() {
          return ypos
        },
        x: function(index) {
          return xpos + (index + 1) * 100
        }
      }
    }, stagger, position, cb)
    if (isPlayer) {
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
  },
  drawMyHand: (card, frontCard, backCard, index, cb) => {
    TweenMax.set(frontCard, {rotationY: -180})
    const duration = 1;
    const position = 0;
    const ypos = 570;
    const xpos = (index + 1) * 100;
    const tl = new TimelineLite({onComplete:cb});
    tl.to(card, duration, {x: xpos, y: ypos}, position)
    .to(backCard, duration, {rotationY: -180}, position)
    .to(frontCard, duration, {rotationY: 0}, position)
  },
  draggable: (handCard, card, playACard, isPlayer) => {
    let StartX, StartY;
    Draggable.create(handCard, {
      type:"x,y",
      edgeResistance:0.65,
      bounds:".table",
      throwProps:true,
      onPress:function() {
        // TweenLite.to(this.target, 0.5, {scale: 1, y: 570})
        StartX = this.x;
        StartY = 570;
      },
      onRelease:function(){
        if ( !this.hitTest(".myBoard", "50%") ) {
          TweenLite.to( this.target , 0.5 , { x:StartX , y:StartY })
        }
        if (this.hitTest(".myBoard", "50%")) {
          if (isPlayer){
              playACard(card);
          }
        }
      }
    })
  },
  onHover: (handCard, showDetailOfACard, card) => {
    // console.log('on onhover')
    handCard.onmouseenter = function() {
      TweenLite.to(handCard, 0.5, {css:{scale: 1.2, "z-index": 2}});
      // console.log('mouse enter')
      showDetailOfACard(card);
    }
    handCard.onmouseleave = function() {
      TweenLite.to(handCard, 0.5, {css:{scale: 1, "z-index": 1}})
      showDetailOfACard({});
    }
  },
  leavingMyHand: (card, index, cb) => {
    // console.log('invoked')
    // console.log('index-->', index)
    const duration = 0.5;
    const position = 0;
    const ypos = 400;
    const xpos = 100 + (index + 1) * 110
    const tl = new TimelineLite({onComplete:cb});
    tl.to(card, duration, {x: xpos, y:ypos}, position)
  },
  playToMyBoard: (card, index, cb) => {
    // console.log('hello')
    const duration = 0;
    const position = 0.5;
    const xpos = 100 + (index - 1) * 110
    const tl = new TimelineLite({onComplete:cb});
    tl.to(card, duration, {opacity: 0}, 0)
    .to(card, duration, {x: xpos, opacity: 1}, position)
  }
}
