# Urbanshona Browsifier

> A Command Line Application for generating Typescript classes without decorators from TypeORM Entity definitions. 
> This solves a problem where TypeORM Entities cannot be imported into browser apps Like Angular Applications because they use webpack which bundles things and TypeORM doesn;t work well with bundling.  

## Installation

```shell
npm i @urbanshona/browsifier
```

## Usage

```shell
browsifier -s [Input] -o [Output] -q [Quotes]

Options:
 --help                 Show help
--version              Show version number

-s, --source           The Folder Containing TypeORM Entity Classes written in Typescript

-o, --output           The Folder to place generated classes that have been stripped of 
                       Typeorm Decorators/ import statments (i.e browsified)

-q, --quotes           Whether to use single or double quotes for import statments 
                       in the generated classes

```
