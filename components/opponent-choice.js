'use strict'
export default function opponentChoice(){
    const content = document.querySelector('#content')
    const container = document.createElement('div')
    container.classList.add('container')

    const startMessage = document.createElement('h2')
    startMessage.textContent = 'Start new Game'

    const vsHuman = document.createElement('button')
    vsHuman.textContent = "vs Human"
    vsHuman.classList.add('choice-buttons')
    vsHuman.setAttribute('data-key', 'human')

    const vsCPU = document.createElement('button')
    vsCPU.textContent = "vs CPU"
    vsCPU.classList.add('choice-buttons')
    vsCPU.setAttribute('data-key', 'cpu')

    content.appendChild(container)
    container.appendChild(startMessage)
    container.appendChild(vsHuman)
    container.appendChild(vsCPU)

    return new Promise((resolve) => {
        const handleClick = (e) => {
            document.querySelector('button[data-key = "human"').removeEventListener('click', handleClick)
            document.querySelector('button[data-key = "cpu"').removeEventListener('click', handleClick)
            if (e.target.dataset.key === 'human') resolve('human')
            if (e.target.dataset.key === 'cpu') resolve('cpu')
        }
        document.querySelector('button[data-key = "human"').addEventListener('click', handleClick)
        document.querySelector('button[data-key = "cpu"').addEventListener('click', handleClick)
    })
}

