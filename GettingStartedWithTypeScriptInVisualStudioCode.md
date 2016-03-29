###Motivation

This post might be useful to someone who has just started learning TypeScript and wants easily and fast setup an environment for doing course assignments or little educational projects. This is definetly NOT for JavaScript professional.

There are couple of options for deveopment environment one might select from.
* [TypeScript Playground](http://www.typescriptlang.org/play/) is a great tool to play with TypeScript during watching some lecture or presentation. However your code is in the browser and you are limited with the amount of code you can effectively write and store. For example, it will be inconvenient to use playground during accomplishing assignments fro [TypeScript course](https://www.edx.org/course/introduction-typescript-microsoft-dev201x-1). 

* Visual Studio Community Edition. But to be hones it is too bloated and heavy for this task. It will constantly distruct you from accomplishing your tasks with huge amounts of options while hiding assential stuff. And in case you are not on Windows machine you don't even have this option.

* Text editors. There are tones of them. Like Atom, Emacs, Sublime, Notepad++ to name a few. All of these tools are nice and dandy but they dont have TypeScript support from a box.

* And finally goes [Visual Studio Code](https://code.visualstudio.com/) which I would recommend because:
  * It is free and open source
  * It runs on every platform and obviously on yours as well
  * It is lightweight and innovative (for example it does not exploit tabs)
  * It has cool design (subbjective)
  * It has direct integration with Git
  * It has TypeScript support i.e. it shows derived types of code expressions and performs code comletions
  * It has folder based projects, which means you dont have to create and support project file like in Visual Studio 
  
###Setup
 * Install Visual Studio Code. Which should be easy, right? Just run an installer.
 * Instal [Node](https://nodejs.org/en/). Also just an installer. Don't be scared, it's just simle program which will execute JS code. For JS development you will need it anyway. Running code in browser will require more ceremony. I love running my little educational programs from the command line like in good old university days :-). 
 * Install TypeScript. It is even easier. Just run in the command prompt `npm install -g typescript`. This will install TypeScript globally on your computer, i.e. now you can run compiler from every folder.
 * Create a folder for your project.
 * Open Visual Studio Code, File->Open Folder... Select your folder. Now you can create your TypeScript file with .ts extension. Note how Visual Studio Code recognizes TypeScript and provides correct autocomplete
 ![](http://puu.sh/nYBSe/1a9f32a6ef.png)
