import { createCard, moveCard } from './card';

const createBoard = () => {
    const board = document.createElement('div');
    board.classList.add('board');
  
    for (let i = 0; i < 3; i++) {
      const column = document.createElement('div');
      column.classList.add('column');
  
      const addCardButton = document.createElement('button');
      addCardButton.textContent = 'Add another card';
      addCardButton.addEventListener('click', () => {
        const card = createCard();
        column.insertBefore(card, column.lastElementChild);
        saveBoard();
      });
  
      column.appendChild(addCardButton);
      board.appendChild(column);
    }
  
    board.addEventListener('dragover', (e) => {
      e.preventDefault();
      const column = e.target.closest('.column');
      if (column) {
        column.style.backgroundColor = '#f1f1f1';
      }
    });
  
    board.addEventListener('dragleave', (e) => {
      const column = e.target.closest('.column');
      if (column) {
        column.style.backgroundColor = 'transparent';
      }
    });
  
    board.addEventListener('drop', (e) => {
      e.preventDefault();
      const column = e.target.closest('.column');
      if (column) {
        column.style.backgroundColor = 'transparent';
        const card = document.querySelector('.dragging');
        if (card) {
          moveCard(card, column);
        }
      }
    });
  
    loadBoard(board);
    return board;
  };
  
  

  const saveBoard = () => {
    const boardData = [];
    const columns = document.querySelectorAll('.column');
    columns.forEach((column, index) => {
      const columnData = {
        index,
        cards: [],
      };
      const cards = column.querySelectorAll('.card');
      cards.forEach((card) => {
        const cardData = {
          text: card.querySelector('.card-input').value,
        };
        columnData.cards.push(cardData);
      });
      boardData.push(columnData);
    });
    localStorage.setItem('board', JSON.stringify(boardData));
  };
  

const loadBoard = (board) => {
    const boardData = JSON.parse(localStorage.getItem('board'));
    if (boardData) {
      boardData.forEach((columnData) => {
        const column = board.children[columnData.index];
        columnData.cards.forEach((cardData) => {
          const card = createCard(cardData.text);
          column.insertBefore(card, column.lastElementChild);
        });
      });
    }
  };
  
  

export { createBoard, saveBoard, loadBoard };