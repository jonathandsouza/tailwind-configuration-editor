import './style.css'
import { WebContainer } from '@webcontainer/api';
import { files } from './files';

let webContainerInstance;

window.addEventListener('load', async () => {
  // textareaEl.value = files['index.js'].file.contents;

  // textareaEl.addEventListener('input', (e) => {
  //   writeIndexJS(e.currentTarget.value);
  // });

  // Call only once
  webContainerInstance = await WebContainer.boot();
  await webContainerInstance.mount(files);

  const exitCode = await installDependencies();
  if (exitCode !== 0) {
    throw new Error('Installation failed');
  };

  // startDevServer();

  buttonEl.onclick = async function () {

    let output = '';

    console.log(`HELLO WORLD!!! TESTING`);

    const installProcess = await webContainerInstance.spawn('node', ['test']);

    await installProcess.output.pipeTo(new WritableStream({
      write(data) {
        output += data;
        document.querySelector("style").innerHTML = output;
      }
    }));

    // Wait for install command to exit
    return installProcess.exit;
  }
});

async function installDependencies() {
  // Install dependencies
  const installProcess = await webContainerInstance.spawn('npm', ['install']);
  installProcess.output.pipeTo(new WritableStream({
    write(data) {
      console.log(data);
    }
  }))
  // Wait for install command to exit
  return installProcess.exit;
}

async function startDevServer() {
  // Run `npm run start` to start the Express app
  await webContainerInstance.spawn('npm', ['run', 'start']);

  // Wait for `server-ready` event
  webContainerInstance.on('server-ready', (port, url) => {
    iframeEl.src = url;
  });
}

async function writeIndexJS(content) {
  await webContainerInstance.fs.writeFile('/index.js', content);
}

document.querySelector('#app').innerHTML = `
  <div class="container">
    <div class="editor">
      <textarea>I am a textarea</textarea>
    </div>
    <div class="preview">
      <iframe src="loading.html"></iframe>
    </div>
    <button>HELLO WORLD</button>
  </div>
`

const iframeEl = document.querySelector('iframe');

const textareaEl = document.querySelector('textarea');

const buttonEl = document.querySelector('button');