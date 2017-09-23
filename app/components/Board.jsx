import React from 'react';
import {Card} from './play';
import { TransitionGroup } from 'react-transition-group';
import {connect} from 'react-redux';
import { showCardDetail, evolve } from '../store';
import CardDetail from './CardDetail';

class Board extends React.Component {

  // componentWillEnter(cb) {
  //   console.log('enter board')
  //   cb();
  // }
  constructor(props) {
    super(props);
    this.checkEvolve = this.checkEvolve.bind(this);
  }

  checkEvolve(boardCards) {
    const evolveCards = [];
    for (let i = 0; i < boardCards.length; i++) {
      for (let j = i + 1; j < boardCards.length; j++) {
        if (boardCards[i].type === boardCards[j].type) {
          evolveCards.push(boardCards[i]);
          evolveCards.push(boardCards[j]);
        }
      }
    }
    if (evolveCards.length) {
      this.props.evolveCards(evolveCards[0], evolveCards[1]);
    }
  }

  render() {
    // console.log('my board --- > ', this.props.myBoard)
    const {myBoard, showDetailOfACard, cardDetail} = this.props;
    const {cardBack} = this.props.localState;
    this.checkEvolve(myBoard.boardCards);
    const totalBP = myBoard.boardCards.reduce(function(sum, card) {
      return sum + card.bp;
    }, 0)
    // console.log('my board --- > ', myBoard);
    return (
      <div>
        {
          myBoard.boardCards.find(boardCard => +boardCard.id === cardDetail.id) && <CardDetail cardDetail={cardDetail} />
        }
        <div className="myBoard">

          <div className="myBpBoard">Battle Points: {totalBP}</div>
          <TransitionGroup>
          {
            myBoard.boardCards.map((boardCard) =>
              <Card key={boardCard.id} card={boardCard} showDetailOfACard={showDetailOfACard} myBoard={myBoard} cardBack={cardBack} isBoard={true}/>
            )
          }
          </TransitionGroup>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {

  }
}

const mapDispatch = (dispatch) => {
  return {
    showDetailOfACard: (card) => {
      // console.log('im going to show, hold on, ', card)
      dispatch(showCardDetail(card))
    },
    evolveCards: (card1, card2) => {
      dispatch(evolve(card1, card2));
      // console.log('evolve-->', card1, card2)
    }
  }
}

export default connect(mapState, mapDispatch)(Board);

