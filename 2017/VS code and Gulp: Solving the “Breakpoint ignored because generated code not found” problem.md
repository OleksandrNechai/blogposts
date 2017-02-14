# VS code and Gulp: Solving the “Breakpoint ignored because generated code not found” problem

Recently I have solved a problem which was bugging me for some time. I guess there are many reasons which can cause this problem and also there are many solutions to it, however, I will share my solution here and, hopefully, it will help someone else at least to start digging in the right direction. 

So I am using VisualStudio Code for my JS editing, Gulp to automate the build which mainly takes application files from the `src` folder, passes them through the Babel transpiler and saves them to the `.tmp` folder. The server serves the application form the `.temp` folder.

The problem: I want to run my code in the Chrome and debug it right in the VS Code, however, whatever settings I select, putting the breakpoint causes VS Code to complain: “Breakpoint ignored because generated code not found”. 

To solve the problem I did the following:

* Used `diagnosticLogging` property of the of the `configurations` property in the launch.js file. Even if the following solution does not help you, this option will help you to debug your problem. This is how I ended up with my solution.

* Wrote launch configuration like this:

```json
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Chrome",
            "type": "chrome",
            "request": "attach",
            "port": 9222,
            "url": "http://localhost:3000/#/*",
            "sourceMaps": true,
            "webRoot": "${workspaceRoot}/.tmp/src/app"
        }
    ]
```
It is very important to start Chrome with remote debugging port 9222 opened. Read official [docs](https://github.com/Microsoft/vscode-chrome-debug#attach) for more details. Note that my url ends with `/*`, this tells VS Code that it should track all files in debugging. More about this read [here](http://stackoverflow.com/questions/40544499/vs-code-breakpoint-ignored-becasue-generated-code-not-found-error-for-js-code). 

Also, note that `webRoot` points to the `.temp` folder, which I alluded to later. It is so important that I will repeat. In this folder, I have JS files spat from the Babel and these files are later served to the browser. Hence this is one part of the puzzle: I tell VS Code which exactly files I want to map to those, opened in VS Code (those which are in the `src` folder).

3. Used correctly setup gulp task to not only transpile JS code but also generate correct source maps. Since I am using Gulp with source maps plugin, I ensured that source maps do not include content on their own, but the reference to the root of my application's sources (from where my transpiler takes the source code, the `src` folder). Here is how my transpiling Gulp task looks like:

```js
gulp.task('compile-js', function babel() {
    var src = 'src/app/**/*.js';
    var destination = './.tmp/src/app';
    return gulp
        .src(src)
        .pipe(g.cached('compilingJS'))
        .pipe(g.sourcemaps.init())
        .pipe(g.babel().on('error', g.util.log))
        .pipe(g.sourcemaps.write('.', { includeContent: false, sourceRoot: __dirname + '/src/app' }))
        .pipe(gulp.dest(destination));
});
```

At first, I used this command to write source maps: `g.sourcemaps.write('.')`. Although it did generate source maps, they were apparently insufficient to VS Code to understand how to match Chrome served files from `.tmp` and files from `src` which it was currently browsing. The setting `{ includeContent: false, sourceRoot: __dirname + '/src/app' }` effectively instructed source maps generator to not include source code into source maps itself, but instead point to the source root, where sources can be found. In my case, it is `__dirname + '/src/app'` which is exactly the folder, which was browsed by VS Code. Hence the second part of the puzzle is found.
