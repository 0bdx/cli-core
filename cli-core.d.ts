/// <reference types="node" />
/// <reference types="node" />
/**
 * Checks whether the environment has a writable temporary-items directory.
 */
export type FilesysToolkit = {
    /**
     *     A function which returns the path to the OS's default temporary-items
     *     directory, as a string
     */
    tmpdir: typeof import("os").tmpdir;
    /**
     *     A function which joins path-fragments together, normalize the resulting
     *     path, and returns it as a string
     */
    join: (...paths: string[]) => string;
    /**
     *     A function which creates a uniquely-named directory, by appending six
     *     random characters to the passed-in filename
     */
    mkdtempSync: typeof import("fs").mkdtempSync;
    /**
     *     A function which creates a directory
     */
    rmSync: typeof import("fs").rmSync;
};
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
export function checkTmpDirectory(filesysToolkit: FilesysToolkit): void;
/**
 * Common helpers for the 0bdx command line utilities.
 *
 * @return  {string}
 *     Returns "cliCore()" [TODO change this]
 */
export function cliCore(): string;
