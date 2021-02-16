import fs from "fs";
import {logger} from '@browsifier-shared/logger';

export interface IAppFileDecoratorRemoverOptions
{
    isToSingleQuoteImports: boolean;
}

export class AppFileDecoratorRemover
{
    static removeDecorators(sourceDir: string, outputDir: string, options: IAppFileDecoratorRemoverOptions)
    {

        // create the output dir
        fs.mkdirSync(outputDir, {recursive: true});

        // logger.log(`AppFileDecoratorRemover removeDecorators --> called with dir : ${JSON.stringify(sourceDir)}`);

        const fileNames = fs.readdirSync(sourceDir, {encoding: 'utf8'});

        // logger.log(`AppFileDecoratorRemover removeDecorators -->  dir : ${JSON.stringify(sourceDir)} yielded filenames ${fileNames}`);

        // create a full file path with each file name and then strip decorators
        fileNames.forEach( singEntityFile => {

            const fullSourcePathOfEntity = `${sourceDir}/${singEntityFile}`;
            const fullDestPathOfEntity = `${outputDir}/${singEntityFile}`;

            // logger.log(`AppFileDecoratorRemover removeDecorators --> got pathOfEntity : ${JSON.stringify(fullSourcePathOfEntity)}`);

            const contents = this.removeDecoratorsFromFile(fullSourcePathOfEntity, options);

            fs.writeFileSync(fullDestPathOfEntity, contents, {encoding: 'utf8'});

            logger.log(`-> ${fullDestPathOfEntity}`, 'Browsified');
        });

    }

    private static removeDecoratorsFromFile(path: string, options: IAppFileDecoratorRemoverOptions)
    {
         logger.log(`Browsifier removeDecoratorsFromFile --> called with path: ${path} options ${options}`);

        let rawFile: string = fs.readFileSync(path, {encoding: 'utf8'});

        rawFile = rawFile.replace(/import(.|\n)*from\s\"typeorm";/gi, '') // Remove the TypeORM import
                         .match(/import\s*\{(?!\s*\n).*|export.*|\w*\s*\:\s*.+\;|(?<!.+)(\s)*\}(?=\s*\n+)/gi) // select non decorator elements
                         .join('\n')  // place each selected statement on its own line
                         .replace('export', '\nexport') // add a new line between import statements and the definition of the class
                         .replace(/(^\w+(?!\s+|t|r|o|p|x|m)(?:.)*)/gm, ' $1'); // indent statements within the class definition




        logger.log(rawFile);

        return rawFile;
// // remove typeorm import
//   let reg = RegExp(/import(\w|\W)*\"typeorm\";/, 'g');
//   rawFile = rawFile.replace(reg, '');
//
// // remove decorators (protect class key word)
//      reg = RegExp(/@(\w)*\((.|[^class].\n)*(\})*(\])*\)/, 'g');
//     // reg = RegExp(/@(\w)*\((.|.(?!class)\n)*(\})*(\])*\)/, 'g');
//
//
//   rawFile = rawFile.replace(reg, '');
//
// // remove @JoinColumn decorator, (it's no longer necessary to protect the class key word)
//   reg = RegExp(/@(\w)*\((.|.\n)*(\})*(\])*\)/, 'g');
//   rawFile = rawFile.replace(reg, '');
//
//
//   // // remove decorators (protect class key word)
//   // // reg = RegExp(/@(\w)*\((.(?!class)|.(?!\S)\n)*(\})*(\])*\)*/, 'gim');
//   // reg = RegExp(/@(\w)*\((.(?!class)|.\n)*(\})*(\])*\)*/, 'gim');
//   // rawFile = rawFile.replace(reg, '');
//
//   // remove whats left
//   reg = RegExp(/@(\w)*\((.(?!class)|\n)*(\})*(\s|\n)*(\))(\})*/, 'g');
//   rawFile = rawFile.replace(reg, '');
//
//
//
//   // logger.log(`removeDecoratorsFromFile --> : ${rawFile}`);
//
//   return rawFile;
    }
}