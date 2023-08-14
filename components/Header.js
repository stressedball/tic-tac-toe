'use strict';
export default function Header() {
    const content = document.querySelector('#content');
    const header = document.createElement('div');
    header.classList.add('header');
    content.appendChild(header);

    const hero = document.createElement('div');
    hero.classList.add('hero');

    header.appendChild(hero);

    const title = document.createElement('h1');
    title.textContent = 'Tic Tac Toe !';

    const logo = document.createElement('img');
    logo.src = './assets/tic-tac-toe-svgrepo-com.svg';
    logo.alt = 'logo';

    hero.appendChild(title);
    hero.appendChild(logo);

    const footer = document.createElement('div');
    header.appendChild(footer);
    footer.textContent = 'Made By TS';
    footer.classList.add('credit');
}
