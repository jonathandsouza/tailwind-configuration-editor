/** @satisfies {import('@webcontainer/api').FileSystemTree} */

export const files = {

    'generator.js': {
        file: {
            contents: `
                        import postcss from 'postcss';
                        import tailwind from 'tailwindcss';
                        import cssnano from 'cssnano';
                        import litePreset from 'cssnano-preset-lite';
                        import autoprefixer from 'autoprefixer';
                        const preset = litePreset({ discardComments: false });

                        async function testing() {

                        const css = "" +
                            "@tailwind base;" +
                            "@tailwind components;" +
                            "@tailwind utilities;";

                        const tailwindCSS = await postcss()
                            .use(tailwind(
                                {
                                    content: [],
                                    safelist: [
                                        {
                                            pattern: /text-3xl/
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

                        const cssNano = await postcss([cssnano({ preset, plugins: [autoprefixer] })])
                            .process(tailwindCSS.css);

                        return cssNano.css;

                    }

                    console.log(await testing());

        `
        },
    },


    'package.json': {
        file: {
            contents: `
                        {
                            "name": "tailwind-config",
                            "type": "module",
                            "dependencies": {
                                "postcss": "^8.4.39",
                                "autoprefixer": "^10.4.19",
                                "cssnano": "^7.0.4",
                                "tailwindcss": "^3.4.4",
                                "cssnano-preset-lite": "^4.0.1"
                            }
                    }
                `,
        },
    },

};