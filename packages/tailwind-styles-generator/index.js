import { WebContainer } from '@webcontainer/api';
import { files } from './files';

let webContainerInstance;


/**
 * Installs dependencies for the Tailwind Styles Generator.
 * @returns {Promise<number>} A promise that resolves with the exit code of the install command.
 */
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

/**
 * Creates a container instance and performs necessary setup operations if it doesn't exist.
 * @returns {Promise<void>} A promise that resolves when the container instance is created and setup is complete.
 */
async function createContainerInstance() {

    if (!webContainerInstance) {

        // Call only once
        webContainerInstance = await WebContainer.boot();
        await webContainerInstance.mount(files);

        const exitCode = await installDependencies();
        if (exitCode !== 0) {
            throw new Error('Installation failed');
        };

    }
}


/**
 * Generates Tailwind styles using the provided handler function.
 *
 * @param {Function} handler - The handler function to process the generated styles.
 * @returns {Promise<void>} - A promise that resolves when the styles have been generated.
 */
async function generateTailwindStyles(handler) {

    const styleGeneratorProcess = await webContainerInstance.spawn('node', ['generator']);

    styleGeneratorProcess.output.pipeTo(new WritableStream({
        write(data) {
            handler(data);
        }
    }));

};

/**
 * Get the generator instance.
 * @returns {Promise<Object>} The generator instance.
 */
async function GetGeneratorInstance() {

    if (!webContainerInstance) {
        await createContainerInstance();
    }

    return {
        generateTailwindStyles
    }
}


/**
 * Get the instance of the generator.
 *
 * @returns {Object} The generator instance.
 */
export { GetGeneratorInstance };