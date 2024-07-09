import { createBoard, saveBoard, loadBoard } from './board';

const createCard = (text = '') => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.draggable = true;

    const cardInput = document.createElement('textarea');
    cardInput.classList.add('card-input');
    cardInput.value = text;

    // Добавляем автофокус для текстового поля
    cardInput.focus();

    card.appendChild(cardInput);

    // Добавляем иконку крестика
    const deleteButton = document.createElement('span');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = '\u274C';
    deleteButton.addEventListener('click', () => {
        // Проверяем, что текст был введен
        if (cardInput.value) {
            card.remove();
            saveBoard();
        }
    });

    card.appendChild(deleteButton);

    cardInput.addEventListener('input', () => {
        saveBoard();
    });

    card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', null);
        card.classList.add('dragging');
    });

    card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
    });

    // Обработчик события mouseover для отображения иконки крестика
    card.addEventListener('mouseover', () => {
      deleteButton.style.visibility = 'visible';
  });

    // Обработчик события mouseout для скрытия иконки крестика
    card.addEventListener('mouseout', () => {
      deleteButton.style.visibility = 'hidden';
  });

    return card;
};

const moveCard = (card, newParent) => {
  const oldParent = card.parentElement;
  newParent.appendChild(card);
  if (oldParent !== newParent) {
    saveBoard();
  }
};

export { createCard, moveCard };