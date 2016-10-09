```ts
interface NotOkay
{
    [x: number]: Dog;
    [x: string]: Animal;
}
let l: NotOkay = [new Animal()]; // Why error is here?
let x = l[0];
```

```ts
interface ClockConstructor {
    new (hour: number, minute: number);
}

class Clock implements ClockConstructor { //Why this strange error? Example from handbook, interfaces section
    currentTime: Date;
    constructor(h: number, m: number) { }
}
```
