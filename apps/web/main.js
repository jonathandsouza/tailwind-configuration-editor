import { GenerateTailwindStyles } from 'tailwind-styles-generator';

console.log('main app loaded...');

async function compile(params) {

    // const response = await fetch('http://localhost:3000');
    // const css = await response.text();

    const css = await GenerateTailwindStyles();

    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);

}

const button = document.querySelector('button');
button.addEventListener('click', compile);