import {
    checkTmpDirectory,
    cliCore,
} from './index.js';

import checkTmpDirectoryTest from './check-tmp-directory.test.js';
import cliCoreTest from './cli-core.test.js';

checkTmpDirectoryTest(checkTmpDirectory);
cliCoreTest(cliCore);
