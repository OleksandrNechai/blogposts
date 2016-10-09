```ts
interface NotOkay
{
    [x: number]: Dog;
    [x: string]: Animal;
}
let l: NotOkay = [new Animal()]; // Why error is here?
let x = l[0];
```
