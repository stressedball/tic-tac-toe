'use strict';

export default function winner(player) {
    const container = document.querySelector('.container');
    const winContainer = document.createElement('div');
    const message = document.createElement('p');
    const replay = document.createElement('button');

    container.appendChild(winContainer);
    winContainer.appendChild(message);
    winContainer.appendChild(replay);
    winContainer.classList.add('winner-container');
    replay.classList.add('choice-buttons');

    message.textContent = getText(player);

    replay.textContent = 'Play again?';

    replay.addEventListener('click', () => {
        location.reload();
    });
}

const getText = (player) => {
    if (typeof player === 'string') {
        return "It's a tie!";
    } else {
        return `The winner is Player ${player.handle}`;
    }
};
