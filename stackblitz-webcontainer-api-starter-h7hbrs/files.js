/** @satisfies {import('@webcontainer/api').FileSystemTree} */

export const files = {

  // 'index.js': {
  //   file: {
  //     contents: `
  //                     import express from 'express';
  //                     const app = express();
  //                     const port = 3111;

  //                     app.get('/', (req, res) => {
  //                         res.send('Welcome to a WebContainers app! 🥳');
  //                     });

  //                     app.listen(port, () => {
  //                         console.log(\`App is live at http://localhost:\${port}\`);
  //                     });`,
  //   },
  // },

  // 'package.json': {
  //   file: {
  //     contents: `
  //         {
  //           "name": "example-app",
  //           "type": "module",
  //           "dependencies": {
  //             "express": "latest",
  //             "nodemon": "latest"
  //           },
  //           "scripts": {
  //             "start": "nodemon index.js"
  //           }
  //         }`,
  //   },
  // },

  'test.js': {
    file: {
      contents: `
    import postcss from 'postcss';
import tailwind from 'tailwindcss';

async function testing() {

    const css = "" +   
    "@tailwind base;" + 
    "@tailwind components;" + 
    "@tailwind utilities;";

    const result = await postcss()
        .use(tailwind(
            {
                config: {
                    content: [],
                    theme: {
                        extend: {
                            colors: {
                            },
                        },
                    },
                    plugins: [],
                }
            }
        ))
        .process(css, {from:undefined})

    console.log(result.css, {from:undefined});

    return result.css;

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
        "tailwindcss": "^3.4.4"
    }
}
`,
    },
  },

};