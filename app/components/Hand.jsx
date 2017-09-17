import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import CardFront from './Card';
import CardBack from './CardBack';
import dealHand from './dealHand';

class Hand extends React.Component {

  constructor(props) {
    super(props);
    // this.state = props.state;
    console.log(this.props.state)
  }
  // const { handCards } = props;

  render () {
    let {handCards, revealHand} = this.props.state;
    console.log(revealHand)
    let Card = revealHand ? CardFront : CardBack;
    return (
      <div className="hand">
        {/* <TransitionGroup>
          {
            handCards.map(handCard =>
              <CardBack key={handCard.id} />
            )
          }
        </TransitionGroup> */}
        <TransitionGroup>
          {
            handCards.map((handCard, index) =>
              <Card key={`${handCard.id}${revealHand}`} state={handCard} index={index} />
            )
          }
        </TransitionGroup>
      </div>
    )
  }
}

export default dealHand(Hand);
