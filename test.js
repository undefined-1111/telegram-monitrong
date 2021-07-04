var markdown = require( "markdown" ).markdown;
console.log( markdown.toHTML( `# Hello *World*!
## Hello world
### Hello world
#### Hello world
фывфыв` ) );