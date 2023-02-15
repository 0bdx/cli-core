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

    // Mock filesysToolkit.
    /** @type {import('./check-tmp-directory').FilesysToolkit} */
    const ft = {
        join: (...paths) => paths.join('/'),
        // @ts-expect-error
        mkdtempSync: (prefix='') => `${prefix}a1b2c3`,
        rmSync: () => void 0,
        tmpdir: () => '/path/to/tmpdir',
    }

    // `filesysToolkit` is invalid.
    throws(()=>f(null),
        `${ep} filesysToolkit is null`);
    // @ts-expect-error
    throws(()=>f(),
        `${ep} filesysToolkit is type 'undefined' not 'object'`);
    // @ts-expect-error
    throws(()=>f({}),
        `${ep} 0 not 4 props in filesysToolkit`);
    // @ts-expect-error
    throws(()=>f({ ...ft, extraFunction:()=>{} }),
        `${ep} 5 not 4 props in filesysToolkit`);

    // `join` causes an exception.
    throws(()=>f({ ...ft, join:undefined }),
        `${ep} join is type 'undefined' not 'function'`);
    throws(()=>f({ ...ft, join:() => { throw Error('Nope!') } }),
        `${ep} join(): Error: Nope!`);
    // @ts-expect-error
    throws(()=>f({ ...ft, join:() => true }),
        `${ep} join(): Error: Returned type 'boolean' not 'string'`);

    // `mkdtempSync` causes an exception.
    throws(()=>f({ ...ft, mkdtempSync:undefined }),
        `${ep} mkdtempSync is type 'undefined' not 'function'`);
    throws(()=>f({ ...ft, mkdtempSync:() => { throw Error('err') } }),
        `${ep} mkdtempSync(): Error: err`);
    // @ts-expect-error
    throws(()=>f({ ...ft, mkdtempSync:() => [] }),
        `${ep} mkdtempSync(): Error: Returned type 'object' not 'string'`);

    // `rmSync` causes an exception.
    // @ts-expect-error
    throws(()=>f({ ...ft, rmSync:123 }),
        `${ep} rmSync is type 'number' not 'function'`);
    throws(()=>f({ ...ft, rmSync:() => { throw Error('!') } }),
        `${ep} rmSync():
    An error has occurred while removing the temporary folder
    '/path/to/tmpdir/0bdx-cli-core-a1b2c3'
    Please remove it manually.
    Error: !`);
    throws(()=>f({ ...ft, rmSync:() => 'no!' }),
        `${ep} rmSync():
    An error has occurred while removing the temporary folder
    '/path/to/tmpdir/0bdx-cli-core-a1b2c3'
    Please remove it manually.
    Error: Returned type 'string' not 'undefined'`);

    // `tmpdir` causes an exception.
    throws(()=>f({ ...ft, tmpdir:undefined }),
        `${ep} tmpdir is type 'undefined' not 'function'`);
    throws(()=>f({ ...ft, tmpdir:() => { throw Error('Oops!') } }),
        `${ep} tmpdir(): Error: Oops!`);
    // @ts-expect-error
    throws(()=>f({ ...ft, tmpdir:() => 123 }),
        `${ep} tmpdir(): Error: Returned type 'number' not 'string'`);

    // Ok.
    equal(f(ft), void 0);
}
