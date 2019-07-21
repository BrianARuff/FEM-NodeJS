#!/usr/bin/env node

"use strict";

var util = require("util");
const path = require("path");
const fs = require("fs");

const args = require("minimist")(process.argv.slice(2), {
    boolean: ["help", "in"],
    string: ["file"]
}); // parses cli argument data
const getStdin = require("get-stdin");

let BASE_PATH = path.join(process.env.BASE_PATH || __dirname); // join uses apprpriate seperator for your platform. 

if (process.env.HELLO) {
    console.log(process.env.HELLO);
}

// start here
if (args.help) {
    printHelp();
} else if (
    args.in ||
    args._.includes("-")
) {
    getStdin(args.in)
        .then(result => processFile(result))
        .catch(err => printHelp(err));
} else if (args.file) {
    fs.readFile(path.join(BASE_PATH, args.file), (err, content) => {
        if (err) {
            printHelp();
        } else {
            processFile(content);
        }
    })
} else {
    error("Incorrect usage", true);
}

function error(msg, includeHelp = false) {
    console.log(msg);
    if (includeHelp) {
        printHelp();
    }
}

function printHelp() {
    console.log('--help                print this help');
    console.log('--file={FILENAME}     process the file');
    console.log('--in, -               process stdin');
    console.log('');
}

function processFile(content) {
    content = content.toString().toUpperCase();
    process.stdout.write(content);
}

/*
 Steps to make a file executable
    1. run ls -la to see if it's already executable, if so, then run the file as an executable ./filename.extension to run it, and you are done, no need to do any other steps here :)!!
    2. run chmod u+x filename.extension
        a. This is basically saying change file permissions to interact with shell & operating system so that it can be an executable file.
    3. Check if file is now executable with the ls -la command. It will have an "x" at the end of the permissions section if it is. If it does have it then run the following command.
    4. ./filename.extension
*/

/*
    Notes on minimist
    1. It's an argument parser for NodeJS
    2. Stores all arguments not attached to a "-" or "--" inside the array of the "_" property.'
    3. Arugments that are attached to a single "-" or a "--" are stored in key-value pairs after the initial "_" and "[]" key-value pair.
*/

/*
    Path.resolve
        1. Resolves the path up to any given file as an absolute pathway.
*/

/*
    What is fs (file system) application?
        a.  Provides a way for javascript to directly interact with the standard POSIX(portable operating system interface for computer environments)
        a. readFileSync - returns data in a bufferized state and is computed synchronously.
*/

/*
    What is path?
        1. It is an interface for working with files and directories.
        2. It's accessed via const path = requrie("path");
        3.
*/