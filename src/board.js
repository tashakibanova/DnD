import { createCard, moveCard } from './card';

const createBoard = () => {
  const board = document.createElement('div');
  board.classList.add('board');

  for (let i = 0; i < 3; i++) {
    const column = document.createElement('div');
    column.classList.add('column');

    // Добавляем кнопку добавления карточки в каждую колонку
    const addCardButton = document.createElement('button');
    addCardButton.textContent = 'Add another card';
    addCardButton.addEventListener('click', () => {
      const card = createCard();
      column.insertBefore(card, column.lastElementChild);
      card.querySelector('.card-input').focus();
      saveBoard();
    });

    column.appendChild(addCardButton);
    board.appendChild(column);
  }


  // Добавляем обработчик события dragover для всего контейнера доски
  board.addEventListener('dragover', (e) => {
    e.preventDefault();
    const column = e.target.closest('.column');
    if (column) {
      column.style.backgroundColor = '#f1f1f1';
    }
  });

  // Добавляем обработчик события dragleave для всего контейнера доски
  board.addEventListener('dragleave', (e) => {
    const column = e.target.closest('.column');
    if (column) {
      column.style.backgroundColor = 'transparent';
    }
  });

  // Добавляем обработчик события drop для всего контейнера доски
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
  const columns = Array.from(document.querySelectorAll('.column')).map((column) => {
    return Array.from(column.children)
      .filter((child) => child.classList.contains('card'))
      .map((card) => {
        const cardInput = card.querySelector('.card-input');
        return cardInput.value || ''; // Используем пустую строку вместо null
      });
  });
  localStorage.setItem('board', JSON.stringify(columns));
};

const loadBoard = (board) => {
  const columns = JSON.parse(localStorage.getItem('board')) || [[], [], []];
  columns.forEach((column, index) => {
    const columnElement = board.children[index];
    column.forEach((cardText) => {
      if (cardText) {
        const card = createCard(cardText);
        if (card) {
          columnElement.insertBefore(card, columnElement.lastElementChild.previousSibling);
        }
      }
    });
  });
};

export { createBoard, saveBoard, loadBoard };