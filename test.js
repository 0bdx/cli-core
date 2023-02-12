import {
    checkTmpDirectory,
    cliCore,
} from './cli-core.js';

import checkTmpDirectoryTest from './src/check-tmp-directory.test.js';
import cliCoreTest from './src/cli-core.test.js';

checkTmpDirectoryTest(checkTmpDirectory);
cliCoreTest(cliCore);
