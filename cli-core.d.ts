/// <reference types="node" />
/// <reference types="node" />
/**
 * https://www.npmjs.com/package/@0bdx/cli-core
 * @version 0.0.1
 * @license Copyright (c) 2023 0bdx <0@0bdx.com> (0bdx.com)
 * SPDX-License-Identifier: MIT
 */
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
export function checkTmpDirectory(tmpdir: typeof import("os").tmpdir, join: (...paths: string[]) => string, mkdtempSync: typeof import("fs").mkdtempSync, rmSync: typeof import("fs").rmSync): string;
/**
 * Common helpers for the 0bdx command line utilities.
 *
 * @return  {string}
 *     Returns "cliCore()" [TODO change this]
 */
export function cliCore(): string;
