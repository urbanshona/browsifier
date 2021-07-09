import * as fs from 'fs';

import rimraf  from  'rimraf';

rimraf("./dist",  () =>{

    fs.mkdirSync('./dist', {recursive: true});

    fs.copyFileSync('./package.json', './dist/package.json');

});

