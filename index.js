#!/usr/bin/env node

import { program } from 'commander'
import { exec } from 'child_process'

program
    .command('init')
    .description('Start Grid Selector')
    .version('1.0.0')
    .option('-r, --rows <type>', 'Number of rows', 16)
    .option('-c, --columns <type>', 'Number of columns', 8)
    .action(options => {
        console.log(options); // Log the options
        console.log('Running yarn start...');

        // Execute `yarn start`
        const childProcess = exec(`cross-env ROWS=${options.rows} COLS=${options.columns} parcel index.html`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Stderr: ${stderr}`);
                return;
            }
            console.log(stdout); // Log the output of `yarn start`
        });

        // Stream output to the console
        childProcess.stdout.on('data', (data) => {
            console.log(data);
        });

        childProcess.stderr.on('data', (data) => {
            console.error(data);
        });
    })

program.parse(process.argv)
