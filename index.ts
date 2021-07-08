#!/usr/bin/env node
import yargs from 'yargs';
import {logger} from '@browsifier-shared/logger';
import {FileNameType} from '@browsifier-core/core-gen';
import {FileGenerator} from '@browsifier-core/file-generator/file-generator';
import {BrowserFileGenerator} from '@browsifier-core/file-generator/browser-file-generator';
logger.context = 'Browsifier';

const options: any = yargs.options({
    s: {
        alias: 'source',
        demandOption: true,
        default: `${process.cwd()}/server/core/database/entities`,
        describe: 'The path to the folder containing the TypeORM Entities that need to be stripped of decorators',
        type: 'string'
    },
    o: {
        alias: 'output',
        demandOption: true,
        default: `${process.cwd()}/src/app/core/database/entities`,
        describe: 'The output path to place TypeORM entities that have been stripped of decorators',
        type: 'string'
    },
    n: {
        alias: 'name',
        demandOption: true,
        default: `p`,
        describe: 'The Naming Style for the Output file',
        type: 'string'
    },

}).argv;


// logger.log(JSON.stringify(options, null, 2));

const sourceDirOfEntities = `${options.source}`;
const outPutOfEntities = `${options.output}`;
const outPutFileNameType = `${options.name}`;


const rootGenerator = new FileGenerator(`${sourceDirOfEntities}/*.ts`, outPutFileNameType as FileNameType);

const browserFileGenerator = new BrowserFileGenerator(`${sourceDirOfEntities}/*.ts`, outPutOfEntities, outPutFileNameType as FileNameType);


rootGenerator.project.getSourceFiles().forEach((singSourceFile) => {

    const classes = singSourceFile.getClasses();

    classes.forEach((singClass) => {
        // We check if it is the class we want to rename
        if (singClass.getName())
        {

            browserFileGenerator.generateBrowserClass(singSourceFile, singClass);

        }
    });

});