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
 --help                Show help
--version              Show version number

-s, --source           The Folder Containing TypeORM Entity Classes written in Typescript [string]

-o, --output           The Folder to place generated classes that have been stripped of   [string]
                       Typeorm Decorators/ import statments (i.e browsified)

-n, --name             The naming style of the output file                                [string]
                       The default naming style is Pascal Case.
                       eg   -n k (for Kebab Case) 
                       p : Pascal
                       s : Snake Case
                       c : Camel Case
                       k : Kebab Case

-q, --quote           Whether to use single or double quotes for import statments         [boolean]
                      in the generated classes, where true means, yes, use single
                      quotes for import statments

-i, --indent          The Number of spaces to indent text by : two|four|eight|tab         [string]
                       
-f, --feed            Whether to use the new line character or the carriage return        [string]
                      for the line feed : n|c        

-c, --comma            Whether to use trailing commas or not                              [boolean]

-p, --prefix           Whether to use prefix and suffix text for rename                   [boolean] 

```

## Example

```shell

e.g browsifier -s server/entities -o browser/entities -q true

```