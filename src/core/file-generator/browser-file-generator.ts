import {FileGenerator} from '@browsifier-core/file-generator/file-generator';
import {FileNameType} from '@browsifier-core/core-gen';
import {ClassDeclaration, SourceFile} from 'ts-morph';
import {logger} from '@browsifier-shared/logger';
logger.context = 'Browsifier';

export class BrowserFileGenerator extends FileGenerator {
    constructor(sourceFilePathGlob: string,
                public rootOutputDir: string,
                fileNameType: FileNameType) {
        super(sourceFilePathGlob, fileNameType);
    }

    generateBrowserClass(sourceFile: SourceFile, sourceClass: ClassDeclaration) {
        const pathOfFile = `${this.rootOutputDir}/${this.standardFileNamePrefix(sourceClass.getName())}.ts`;

        //create the browser file without decorators
        const outputFile = this.project.createSourceFile(pathOfFile, {}, {overwrite: true});

        // remove class level decorators from the source file
        sourceClass.getDecorators().forEach(x => x.remove());

        //remove entity level decorators from the source file
        sourceClass.getProperties().forEach(x => x.getDecorators().forEach(y => y.remove()));

        //give the properities to the output file
        outputFile.addClass({
            name: sourceClass.getName(),
            properties: sourceClass.getProperties().map(x => x.getStructure())
        });

        // remove typeorm imports
        sourceFile.getImportDeclaration('typeorm').remove();

        //copy import declarations from source -> output file
        sourceFile.getImportDeclarations().forEach(x => {

            //standardize the imported file  to match the generated file name of the entity
            const moduleSpecifier = x.getModuleSpecifierValue();

            x.setModuleSpecifier(`./${this.standardFileNamePrefix(moduleSpecifier)}`);

            outputFile.addImportDeclaration(x.getStructure());
        });

        logger.log(`${sourceClass.getName()} --> ${pathOfFile}`);

        outputFile.save();
    }
}