import equal from './private-methods/equal.js';
import throws from './private-methods/throws.js';

/**
 * checkTmpDirectory() unit tests.
 * 
 * @param   {import('./check-tmp-directory').default}  f  checkTmpDirectory()
 * @return  {void}
 * @throws  Throws an `Error` if a test fails
 */
export default function checkTmpDirectoryTest(f) {
    const ep = 'Error: checkTmpDirectory():'; // error prefix

    // Mock functions.
    const mockTmpdir = () => '/path/to/tmpdir';
    /** @type {import('node:path').join} */
    const mockJoin = (...paths) => paths.join('/');
    /** @type {import('node:fs').mkdtempSync} */
    // @ts-expect-error
    const mockMkdtempSync = (path='') => `${path}a1b2c3`;
    /** @type {import('node:fs').rmSync} */
    const rmDir = (_path) => void 0;

    // `tmpdir` causes an exception.
    // @ts-expect-error
    throws(()=>f(),
        `${ep} tmpdir is type 'undefined' not 'function'`);
    throws(()=>f(() => { throw Error('Oops!') }, mockJoin, mockMkdtempSync, rmDir),
        `${ep} tmpdir(): Error: Oops!`);
    // @ts-expect-error
    throws(()=>f(() => 123, mockJoin, mockMkdtempSync, rmDir),
        `${ep} tmpdir(): Error: Returned type 'number' not 'string'`);

    // `join` causes an exception.
    // @ts-expect-error
    throws(()=>f(mockTmpdir),
        `${ep} join is type 'undefined' not 'function'`);
    throws(()=>f(mockTmpdir, () => { throw Error('Nope') }, mockMkdtempSync, rmDir),
        `${ep} join(): Error: Nope`);
    // @ts-expect-error
    throws(()=>f(mockTmpdir, () => true, mockMkdtempSync, rmDir),
        `${ep} join(): Error: Returned type 'boolean' not 'string'`);

    // `mkdtempSync` causes an exception.
    // @ts-expect-error
    throws(()=>f(mockTmpdir, mockJoin),
        `${ep} mkdtempSync is type 'undefined' not 'function'`);
    throws(()=>f(mockTmpdir, mockJoin, () => { throw Error('err') }, rmDir),
        `${ep} mkdtempSync(): Error: err`);
    // @ts-expect-error
    throws(()=>f(mockTmpdir, mockJoin, () => [], rmDir),
        `${ep} mkdtempSync(): Error: Returned type 'object' not 'string'`);

    // `rmSync` causes an exception.
    // @ts-expect-error
    throws(()=>f(mockTmpdir, mockJoin, mockMkdtempSync),
        `${ep} rmSync is type 'undefined' not 'function'`);
    throws(()=>f(mockTmpdir, mockJoin, mockMkdtempSync, () => { throw Error('!') }),
        `${ep} rmSync():
    An error has occurred while removing the temporary folder
    '/path/to/tmpdir/0bdx-cli-core-a1b2c3'
    Please remove it manually.
    Error: !`);
    throws(()=>f(mockTmpdir, mockJoin, mockMkdtempSync, () => 'no'),
        `${ep} rmSync():
    An error has occurred while removing the temporary folder
    '/path/to/tmpdir/0bdx-cli-core-a1b2c3'
    Please remove it manually.
    Error: Returned type 'string' not 'undefined'`);

    // Ok.
    equal(f(mockTmpdir, mockJoin, mockMkdtempSync, rmDir), '');
}
