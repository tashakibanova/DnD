import './style.css';
import { createBoard } from './board';

document.addEventListener('DOMContentLoaded', () => {
  const board = createBoard();
  document.getElementById('app').appendChild(board);
});
