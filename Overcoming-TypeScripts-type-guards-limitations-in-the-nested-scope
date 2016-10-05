# Overcoming TypeScript's type guards limitations in the nested scope

TypeScript has a cool feature - control flow analysis which allows to narrow down the variable's type inside the control structure block. Like in this example:

```ts
let x: number | string
if (typeof x === 'string') {
    let a: string = x; // In this block type of x is string
} else {
    let b: number = x; // While in this block type of x is number
}
```

Very different from C# or Java, right? It made me thrilled when I first learned about it. It has a limitation though:

```ts
let x: number | string
if (typeof x === 'string') {
    let a: string = x; // In this block x has a type string
} else {
    // While in this block type of x is number | string and we get a compile error
    let b: number[] = [1, 2, 3].map(i => i * x);
}
```

It is a bit puzzling at first glance. Why? How in the world `x` is not number in the `else` block? The root cause here is that TypeScript doesn't know what `map` function is going to do with the lambda function passed to it. If `map` will invoke the lambda right away - that's fine, but what if it, for example, will call `setTimeOut` and pass the lambda function into it? In such a case `i => i * x` will be executed after time out, well after control flow will lieve the `else` block. Becasue of this possibility TypeScript takes a pessimistic position and considers `x` to be `number | string` inside lambda function `i => i * x`.

How to deal with this problem? There are several approaches. First, you can tell TypeScript that nothing bad is going to happen by limiting the scope of `x`. For now it is global. Limiting it to the function, which does not change `x` fixes the problem:

```ts
function f(x: number | string) {
    if (typeof x === 'string') {
        let a: string = x;
    } else {
        let b: number[] = [1, 2, 3].map(i => i * x); // all right
    }
}
```

Second, introduce another variable of needed type inside `else` block. Since TypeScript now knows exactly the type of the variable, it will not complain:

```ts
let x: number | string
if (typeof x === 'string') {
    let a: string = x;
} else {
    let a = x; // both x and y are of type 'number'
    let b: number[] = [1, 2, 3].map(i => i * a); // all right
}
```

Finally, let TypeScript know that you are not going to change x after it's initialization and it will calm down: 

```ts
let someFunciton: () => number | string;
const x: number | string = someFunciton(); // x will never change
if (typeof x === 'string') {
    let a: string = x;
} else {
    let b: number[] = [1, 2, 3].map(i => i * x); // all right
}
```

I have introduced `someFunciton` only to stop type inference mechanism to infer the type of `x` from the assignment. If I wrote  `const x: number | string = 5`, for example, the type inference mechanism would have infered the type of `x` to be `number` (`never` inside if block) even though I have declared it to be `number | string`.
