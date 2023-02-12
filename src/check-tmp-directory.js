/**
 * Checks whether the environment has a writable temporary-items directory.
 *
 * @param  {import('node:os').tmpdir} tmpdir
 *     A function which returns the path to the OS's default temporary-items
 *     directory, as a string
 * @param  {import('node:path').join} join
 *     A function which joins path-fragments together, normalize the resulting
 *     path, and returns it as a string
 * @param  {import('node:fs').mkdtempSync} mkdtempSync
 *     A function which creates a uniquely-named directory, by appending six
 *     random characters to the passed-in filename.
 * @param  {import('node:fs').rmSync} rmSync
 *     A function which creates a directory.
 * @return  {string}
 *     Returns an empty string if the current environment has a writable
 *     temporary-items directory, or else returns a message explaining the fault
 * @throws
 *     Throws an `Error` if any of the arguments are invalid, or if the
 *     passed-in functions throw an error.
 */
export default function checkTmpDirectory(
    tmpdir,
    join,
    mkdtempSync,
    rmSync,
) {
    // Validate the arguments.
    const ep = 'Error: checkTmpDirectory():'; // error prefix
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

    return '';
}
