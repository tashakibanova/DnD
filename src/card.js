import { createBoard, saveBoard, loadBoard } from './board';

const createCard = (text = '') => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.draggable = true;
  
    const cardInput = document.createElement('textarea');
    cardInput.classList.add('card-input');
    cardInput.value = text;
  
    card.appendChild(cardInput);
  
    const deleteButton = document.createElement('span');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = '\u274C';
    deleteButton.addEventListener('click', () => {
      card.remove();
      saveBoard();
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