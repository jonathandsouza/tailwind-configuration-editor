import { WebContainer } from '@webcontainer/api';
import { files } from './files';

let webContainerInstance;


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


export async function GenerateTailwindStyles() {

    // Call only once
    webContainerInstance = await WebContainer.boot();
    await webContainerInstance.mount(files);

    const exitCode = await installDependencies();
    if (exitCode !== 0) {
        throw new Error('Installation failed');
    };

    let output = '';

    const styleGeneratorProcess = await webContainerInstance.spawn('node', ['generator']);

    await styleGeneratorProcess.output.pipeTo(new WritableStream({
        write(data) {
            output += data;
        }
    }));

    return output;

};