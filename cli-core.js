/**
 * https://www.npmjs.com/package/@0bdx/cli-core
 * @version 0.0.1
 * @license Copyright (c) 2023 0bdx <0@0bdx.com> (0bdx.com)
 * SPDX-License-Identifier: MIT
 */
/**
 * Checks whether the environment has a writable temporary-items directory.
 *
 * @typedef {Object} FilesysToolkit
 * @property {import('node:os').tmpdir} tmpdir
 *     A function which returns the path to the OS's default temporary-items
 *     directory, as a string
 * @property {import('node:path').join} join
 *     A function which joins path-fragments together, normalize the resulting
 *     path, and returns it as a string
 * @property {import('node:fs').mkdtempSync} mkdtempSync
 *     A function which creates a uniquely-named directory, by appending six
 *     random characters to the passed-in filename
 * @property {import('node:fs').rmSync} rmSync
 *     A function which creates a directory
 * 
 * @param {FilesysToolkit} filesysToolkit
 *     An object containing functions which can read and write to a filesystem
 * @return {void}
 *     Does not return anything
 * @throws
 *     Throws an `Error` if any of the arguments are invalid, or if the
 *     passed-in functions throw an error.
 */
function checkTmpDirectory(filesysToolkit) {
    // Validate the filesysToolkit argument.
    const ep = 'Error: checkTmpDirectory():'; // error prefix
    if (filesysToolkit === null) throw Error(`${ep
        } filesysToolkit is null`);
    if (typeof filesysToolkit !== 'object') throw Error(`${ep
        } filesysToolkit is type '${typeof filesysToolkit}' not 'object'`);
    if (Object.keys(filesysToolkit).length !== 4) throw Error(`${ep
        } ${Object.keys(filesysToolkit).length} not 4 props in filesysToolkit`);
    const { tmpdir, join, mkdtempSync, rmSync } = filesysToolkit;
    if (typeof tmpdir !== 'function') throw Error(`${ep
        } tmpdir is type '${typeof tmpdir}' not 'function'`);
    if (typeof join !== 'function') throw Error(`${ep
        } join is type '${typeof join}' not 'function'`);
    if (typeof mkdtempSync !== 'function') throw Error(`${ep
        } mkdtempSync is type '${typeof mkdtempSync}' not 'function'`);
    if (typeof rmSync !== 'function') throw Error(`${ep
        } rmSync is type '${typeof rmSync}' not 'function'`);

    // Try to get the temporary-items directory.
    let temporaryFilesDirectory; try {
        temporaryFilesDirectory = tmpdir();
        if (typeof temporaryFilesDirectory !== 'string') throw Error(
            `Returned type '${typeof temporaryFilesDirectory}' not 'string'`);
    } catch (e) { throw Error(`${ep} tmpdir(): ${e}`) }

    // Try assembling the path to a new folder in the temporary-items directory.
    let assembledPath; try {
        assembledPath = join(temporaryFilesDirectory, '0bdx-cli-core-');
        if (typeof assembledPath !== 'string') throw Error(
            `Returned type '${typeof assembledPath}' not 'string'`);
    } catch (e) { throw Error(`${ep} join(): ${e}`) }

    // Try to create a new folder in the temporary-items directory.
    let fullPath; try {
        fullPath = mkdtempSync(assembledPath);
        if (typeof fullPath !== 'string') throw Error(
            `Returned type '${typeof fullPath}' not 'string'`);
    } catch (e) {
        throw Error(`${ep} mkdtempSync(): ${e}`);
    } finally {
        try {
            if (fullPath) {
                const rmSyncResult = rmSync(fullPath, { recursive: true });
                if (typeof rmSyncResult !== 'undefined') throw Error(
                    `Returned type '${typeof rmSyncResult}' not 'undefined'`);
            }
        } catch (e) { throw Error(`${ep} rmSync():\n` +
            `    An error has occurred while removing the temporary folder\n` + 
            `    '${fullPath}'\n` +
            `    Please remove it manually.\n` +
            `    ${e}`);
        }
    }
}

// import { tmpdir } from 'os';
// import { join } from 'path';
// import { mkdtempSync, rmSync } from 'fs';

// import checkTmpDirectory from './check-tmp-directory.js';

/**
 * Common helpers for the 0bdx command line utilities.
 *
 * @return  {string}
 *     Returns "cliCore()" [TODO change this]
 */
function cliCore() {

    // checkTmpDirectory(
    //     tmpdir,
    //     join,
    //     mkdtempSync,
    //     // rmSync,
    //     () => { throw Error('yikes') },
    // );

    // console.log('cliCore() ok', tmpdir());
    return 'cliCore()';
}
// cliCore();

export { checkTmpDirectory, cliCore };
