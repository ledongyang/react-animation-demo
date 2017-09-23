import React from 'react';
import {Card} from './play';
import { TransitionGroup } from 'react-transition-group';

class Board extends React.Component {

  // componentWillEnter(cb) {
  //   console.log('enter board')
  //   cb();
  // }

  render() {
    // console.log('my board --- > ', this.props.myBoard)
    const {myBoard} = this.props;
    const {cardBack} = this.props.localState;
    // console.log('my board --- > ', myBoard);
    return (
      <div className="myBoard">
        <TransitionGroup>
        {
          myBoard.boardCards.map((boardCard) =>
            <Card key={boardCard.id} card={boardCard} myBoard={myBoard} cardBack={cardBack} isBoard={true}/>
          )
        }
        </TransitionGroup>
      </div>
    )
  }
}
export default Board;
