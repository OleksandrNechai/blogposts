###Motivation

This post might be useful to someone who has just started learning TypeScript and wants easily and fast setup an environment for doing course assignments or little educational projects. This is definitely NOT for JavaScript professional.

There are a couple of options for development environment one might select from.
* [TypeScript Playground](http://www.typescriptlang.org/play/) is a great tool to play with TypeScript during watching some lecture or presentation. However your code is in the browser and you are limited to the amount of code you can effectively write and store. For example, it will be inconvenient to use playground during accomplishing assignments fro [TypeScript course](https://www.edx.org/course/introduction-typescript-microsoft-dev201x-1). 

* Visual Studio Community Edition. But to be honest, it is too bloated and heavy for this task. It will constantly distract you from accomplishing your tasks with huge amounts of options while hiding essential stuff. And in case you are not on Windows machine you don't even have this option.

* Text editors. There are tones of them. Like Atom, Emacs, Sublime, Notepad++ to name a few. All of these tools are nice and dandy but they don't have TypeScript support from a box.

* And finally goes [Visual Studio Code](https://code.visualstudio.com/) which I would recommend because:
  * It is free and open source
  * It runs on every platform and obviously on yours as well
  * It is lightweight and innovative (for example it does not exploit tabs)
  * It has cool design (subjective)
  * It has direct integration with Git
  * It has TypeScript support i.e. it shows derived types of code expressions and performs code completion
  * It has folder based projects, which means you don't have to create and support project file like in Visual Studio 
  
###Setup
 * Install Visual Studio Code. Which should be easy, right? Just run an installer.
 * Instal [Node](https://nodejs.org/en/). Also just an installer. Don't be scared, it's just simple program which will execute JS code. For JS development, you will need it anyway. Running code in the browser will require more ceremony. I love running my little educational programs from the command line like in good old university days :-). 
 * Install TypeScript. It is even easier. Just run in the command prompt `npm install -g typescript`. This will install TypeScript globally on your computer, i.e. now you can run the compiler from every folder.
 * Create a folder for your project.
 * Open Visual Studio Code, File->Open Folder... Select your folder. Now you can create your TypeScript file with .ts extension. Note how Visual Studio Code recognizes TypeScript and provides correct autocomplete.
 ![](http://puu.sh/nYBSe/1a9f32a6ef.png)
* Now save your file and it will be ready to be compiled and run. Open command prompt in the folder of your project and type `tsc yourfilename.ts`. The compiler will generate code into yourfilename.js. Now you just run node with JS file as an input to see the result of code execution. And here we go! (my file is named prog.ts in the screenshot) ![](http://puu.sh/nZEtY/ea62f3b464.png)
* Now you will probably have more than one TS file. But you will always have one which includes others. To compile everything you need to invoke compiler only for this single TS file.

###Learning more about Visual Studio Code
There is a lot of materials on the internet which will help you learning about VS Code. But I would like to recommend [John Papa's article](http://johnpapa.net/getting-started-with-visual-studio-code/) which I find to be a nice and easy introduction to what you can do with VS Code.
