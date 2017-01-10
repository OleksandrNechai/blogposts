# Updating an immutable object in TypeScript 
Recently I could not figure out how to types-safely update immutable object in TypeScript. The problem is that in JavaScript the object spread feature is used for this task, like so:

```ts
let o1 = { x: 5, y: 6 };
o1 = { ...o1, y: 10 };
console.log(JSON.stringify(o1)); // "{'x':5,'y':10}"
```

But if you have accidentally missspelled the property you want to update, object spread will add a new propery instead of updating old one:
```ts
interface Point { x: number, y: number }
let o1: Point = { x: 5, y: 6 };
o1 = { ...o1, x: 2 }; // update x property
// I want to update propery y, but missspelled it and used z instead
o1 = { ...o1, z: 10 }; 
alert(JSON.stringify(o1)); // "{'x':2,'y':6,'z':10}" - TypeScript did not help me to avoid error and added z propery
```

So I asked [StackOverflow](http://stackoverflow.com/questions/41158707/how-to-type-safely-use-object-spread-in-typescript-to-update-an-immutable-object) for help and got an excellent answer to use a helper function:

```ts
function update<T, K extends keyof T>(obj: T, updateSpec: Pick<T, K>): T {
  const result = {} as T
  Object.keys(obj).forEach(key => result[key] = obj[key])
  Object.keys(updateSpec).forEach((key: K) => result[key] = updateSpec[key])
  return result
}
```

Now if I want to update my point but make a mistake - I get a compiler error:

```ts
interface Point { x: number, y: number }
let o1: Point = { x: 5, y: 6 };
// Error: Argument of type '{ z: number; }' is not assignable to parameter of type 'Pick<Point, "x" | "y">'.
o1 = update(o1, {z:1}); 
o1 = update(o1, {y:1}); // OK
console.log(JSON.stringify(o1));
```

All is great now, but someone on StackOverflow asked to explain each line of this `update` function. It is not simple indeed and uses latest TypeScript features. The author did not respond, so I will try to explain it here.

The most complex line is first one:

`function update<T, K extends keyof T>(obj: T, updateSpec: Pick<T, K>): T {`

This line incorporates two pretty complex typescript features: [generics](https://www.typescriptlang.org/docs/handbook/generics.html) and [indexed type query](https://www.typescriptlang.org/docs/handbook/advanced-types.html#index-types). I highly recommend clicking links provided in the previous sentence and reading articles provided by TypeScript official documentation, which is great. But here is my shallow explanation. 

A generic type is the type which is not known when the function is defined but only becomes know when the function is used somewhere in the code (all is at development time, not runtime). For example in the given update function the type `T` is not known, when function is defined, but at this point `o1 = update(o1, {y:1});` the type `T` becomes of type `Point`. So, for now, we know that in this particular call, function `update` will take a `Point` and will also return a `Point`.

Indexed type query gives you an ability to query at compile-time the names of the properties of some type. For example,  `type PointProperties = keyof Point; // "x" | "y"`. That is from the variable of type `Point` we can query the property named `x` or `y` or both. So the expression `K extends keyof T` means in our case that generic type K must be something compatible with `"x" | "y"`:

```ts
type T1 = "x" | "y";
type T2 = "x" | "y" | "z"
type T3 = "x"

var a: T1;
var b: T2;
var c: T3;
var d: T1;

a = d; // OK, compatible
a = b; // Error! The value of be can be "z" and it is not eligible value of a
a = c; // OK, compatible
```

Ok, now we know exactly the type constraints of `update` function, but what is `Pick<T, K>`? It is the type, added to TypeScript standard library in version 2.1 and is [mapped type](https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types):

```ts
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
}
```

You can think of it as a type which consists of a subset of properties of type `T`, described by `K`. So when we have a point defined this way: `interface Point { x: number, y: number }`, the type `Pick<Point,"x">` is basically `{x:number}` and `Pick<Point,"x" | "y">` is `{ x: number, y: number }`  

Hence to conclude, the first line of the function just tells its name and that it takes as the first parameter the value of unconstrained type `T`, returned value is of the same type. And the second argument must be some type, which contains any subset of properties, defined in `T`. So, if you want to update the `Point`, the only eligible values for the second parameter of `update` are: `{ y: 1 }`, `{ x: 1 }`, `{}`, `{ y:1, x:1 }` (note: number `1` is arbitrary here, any `number` will do; if compiler option `--strictNullChecks` is not on, then values `undefined` and `null` are also eligible).

All other lines are not nearly as interesting :-). Second line: `const result = {} as T` just creates creates an empty object and tells TypeScript to treat it as the value of type `T`. Third line `Object.keys(obj).forEach(key => result[key] = obj[key])` is pure JavaScript which copies all properties from input object `obj` to the `result` object. Fourth line `Object.keys(updateSpec).forEach((key: K) => result[key] = updateSpec[key])` does the same for `updateSpec`, this actually replaces old values of `obj` with new ones from `updateSpec`. And finally the function returns: `return result;`.