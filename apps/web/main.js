import { GetGeneratorInstance } from 'tailwind-styles-generator';

console.log('main app loaded...');

async function compile(params) {

    const generator = await GetGeneratorInstance();

    window.css = '';
    const style = document.querySelector('style');


    generator.generateTailwindStyles((data) => {
        window.css += data;
        style.innerHTML = css;
        document.head.appendChild(style);
        console.log(window.css);
    });

}

const button = document.querySelector('button');
button.addEventListener('click', compile);