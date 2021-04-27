import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import './index.css';

const Game = () =>
{
  return (
    <div className=" game" >
      Tic Tac Toe
      <Board></Board>
    </div>
  )
}
const Board = () =>
{
  const initialSquares = Array(9).fill(null);
  const [square, setSquares] = useState(initialSquares);
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(square);
  const status = winner ? `Winner: ${winner}` : `Next Player: ${xIsNext ? 'X' : 'O'}`;
  const handleClickEvent = (i) =>
  {
    const newSquares = [...square];
    const win = Boolean(calculateWinner(newSquares));
    const filled = Boolean(newSquares[i]);
    if (win || filled) {
      const blankSquares = Array(9).fill(null);
      setSquares(blankSquares);
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }
  const renderSquare = (i) =>
  {
    return (
      <Square value={square[i]} onClickEvent={() => handleClickEvent(i)} />
    )
  }
  return (

    <div>
      <div className="status">{status}</div>
      <div className="board-row" >
        {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
      </div>
      <div className="board-row" >
        {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
      </div>
      <div className="board-row" >
        {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
      </div>
    </div>
  )
}
const Square = (props) =>
{
  return (
    <button className="square" onClick={props.onClickEvent}>{props.value}</button>
  )
}


ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares)
{
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]
  for (let l of lines) {
    const [a, b, c] = l;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
