'use strict';
export default function symbolChoice() {
    removeFirstScreen();
    domManipulation();
    const cross = document.querySelector('img[alt="cross"]');
    const circle = document.querySelector('img[alt="circle"]');
    const message = document.querySelector('p');

    return new Promise((resolve) => {
        const handleClick = (e) => {
            cleanScreen(cross, circle, message);
            cross.removeEventListener('click', handleClick);
            circle.removeEventListener('click', handleClick);
            resolve(e.target.alt);
        };
        cross.addEventListener('click', handleClick);
        circle.addEventListener('click', handleClick);
    });
}

const cleanScreen = (cross, circle, message) => {
    const container = document.querySelector('.container');
    
    const wrapper1 = document.querySelector('.container .symbol-container:nth-of-type(1)');
    wrapper1.removeChild(cross)
    
    const wrapper2 = document.querySelector('.container .symbol-container:nth-of-type(2)');
    wrapper2.removeChild(circle)
    
    container.removeChild(wrapper1);
    container.removeChild(wrapper2);
    container.removeChild(message);
};

const domManipulation = () => {
    const container = document.querySelector('.container');
    const message = document.createElement('p');
    message.textContent = "Player one, choose your symbol.\nDon't forget, X plays first!";
    message.classList.add('instruction');
    container.appendChild(message);

    // react does help :)
    // adding containers for styling shadows on img elements

    const wrapper1 = document.createElement('div');
    wrapper1.classList.add('symbol-container')
    const wrapper2 = document.createElement('div');
    wrapper2.classList.add('symbol-container')

    const cross = document.createElement('img');
    cross.src = './assets/cross-sign-svgrepo-com.svg';
    cross.classList.add('symbols');
    cross.alt = 'cross';
    wrapper1.appendChild(cross);
    container.appendChild(wrapper1);

    const circle = document.createElement('img');
    circle.src = './assets/circle-stroked-svgrepo-com.svg';
    circle.classList.add('symbols');
    circle.alt = 'circle';
    wrapper2.appendChild(circle);
    container.appendChild(wrapper2);
};

const removeFirstScreen = () => {
    const container = document.querySelector('.container');
    container.removeChild(document.querySelector('h2'));
    container.removeChild(document.querySelector('button.choice-buttons'));
    container.removeChild(document.querySelector('button.choice-buttons'));
};
