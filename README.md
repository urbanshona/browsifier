# UrbanShona Browsifier

> A Command Line Application for generating Typescript classes without decorators from TypeORM Entity definitions. 
> This solves a problem where TypeORM Entities cannot be imported into browser apps Like Angular Applications because they use webpack which bundles things and TypeORM doesn;t work well with bundling.  

## Installation

```shell
npm i @urbanshona/browsifier
```

## Usage

```shell
browsifier -s [Input] -o [Output] -q [Quote]

Options:
 --help                 Show help
--version              Show version number

-s, --source           The Folder Containing TypeORM Entity Classes written in Typescript [string]

-o, --output           The Folder to place generated classes that have been stripped of   [string]
                       Typeorm Decorators/ import statments (i.e browsified)

-n, --name             The naming style of the output file         [string]
                       The default naming style is Pascal Case.
                       eg   -n k (for Kebab Case) 
                       p : Pascal
                       s : Snake Case
                       c : Camel Case
                       k : Kebab Case
                       

```

## Example

```shell

e.g browsifier -s server/entities -o browser/entities -q true

```