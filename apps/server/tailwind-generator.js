import postcss from 'postcss';
import tailwind from 'tailwindcss';
import cssnano from 'cssnano';
import litePreset from 'cssnano-preset-lite';
import autoprefixer from 'autoprefixer';
const preset = litePreset({ discardComments: true });

export async function GenerateTailwindCSS() {

    const css = "" +
        "@tailwind base;" +
        "@tailwind components;" +
        "@tailwind utilities;";

    const tailwindCSS = await postcss()
        .use(tailwind(
            {
                safelist: [
                    'text-3xl',
                    {
                        pattern: /.*/
                    }
                ],
                theme: {
                    extend: {
                        colors: {
                        },
                    },
                },
                plugins: [],
            }
        ))
        .process(css, { from: undefined })

    const cssNano = postcss([cssnano({ preset, plugins: [autoprefixer] })])
        .process(tailwindCSS.css);

    return cssNano.css;

}
