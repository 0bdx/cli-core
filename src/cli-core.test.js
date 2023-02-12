import equal from './private-methods/equal.js';

/**
 * cliCore() unit tests.
 * 
 * @typedef {import('./cli-core').default} cliCore
 * 
 * @param   {cliCore}  f  cliCore()
 * @return  {void}
 * @throws  Throws an `Error` if a test fails
 */
export default function cliCoreTest(f) {

    // Ok.
    equal(f(), 'cliCore()');
}
