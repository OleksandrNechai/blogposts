# Moving project to TS demo

- Demo project explain it's workings
- Install compiler
- Make module (or any other) file ts and compile it
- Point out compiles slowly
- Show diagnostics and file lists (`--listFiles` `--diagnostics`) and point out td.ts takes time
- Configure not to check td.ts (`--skipLibCheck` `--skipDefaultLibCheck`) - improves compilation speed
- set watch show how parsing is not happening
- Show angular is not visible
- Install typings of angular `npm install --save @types/angular`
- Create tsconfig, set globes

```json
{
    "include":[
        "ps-movies/*.ts",
        "node_modules/@types/**/.d.ts"
    ],
    "compilerOptions": {
        "strictNullChecks": true,
        "skipDefaultLibCheck": true,
        "skipLibCheck": true,
        "noImplicitAny": true,
        "noImplicitThis": true
    }
}
```
- angular becomes visible (if not reaload file in VSC)
- Set strict null checks (strictNullChecks), explain
- Now all is fine, rename more file to ts and set `noImplicitAny`
- Fix stuff 
- Transform controllers to classes (make mistake with this in callback)
- Classes decalarations must go up
- Explain error and set noImplicitThis, fix error
- Transform IIFEs to modules
- Add calculation of rating average
