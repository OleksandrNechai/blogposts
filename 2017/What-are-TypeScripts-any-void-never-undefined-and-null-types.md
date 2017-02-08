# What are TypeScript's any, void, never, undefined and null types 

Unlike intuitive types such as `string` or `number`, the types `any`, `void`, `never`, `undefined` and `null` might cause a confusion for a newbie TypeScript developer. In this post, I will share what I have learned about these types.

### Any
The simplest one is `any`. From the spec:

>The Any type is used to represent any JavaScript value. The Any type is a supertype of all types and is assignable to and from all types. In general, in places where a type is not explicitly provided and TypeScript cannot infer one, the Any type is assumed.

So, the `any` is the way how so-called optional typing is implemented in TypeScript. With `any` you effectively switch off the type checking and working in "JavaScript mode". It is very useful when you gradually migrate from JavaScript and have not yet figured out all types. This is one of the core TypeScript's values propositions.

```ts
let x; // x is implicitly any
x = 5;  // OK
x = { x: 5 }; // OK
x(5);
x.somePropery(); // OK
```

### undefined, null and --strictNullChecks
From the spec:

>The Null type corresponds to the similarly named JavaScript primitive type and is the type of the null literal. The Undefined type corresponds to the similarly named JavaScript primitive type and is the type of the undefined literal. The Null type is a subtype of all types, except the Undefined type. The undefined type is a subtype of all types.

So from the spec, these types are the types whose domains consist of only one value and `undefined` is a specialization or subtype of `null`. However, despite of having this specialization relationship you still can assign `null` to the variable of type `undefined` and vice versa, hence more specifically the domains of both `null` and `undefined` are two values `null` and `undefined`:   

```ts
let x: null;
x = undefined;  // OK
x = null; // OK
```

```ts
let x: undefined;
x = undefined;  // OK
x = null; // OK
```

The compiler option `--strictNullChecks` enables strict null checking mode, which removes the `null` and `undefined` values from the domain of every type and is only assignable to themselves and `any`. I believe this is much simpler to understand and predict how TypeScript will behave in different situations. Strict null checks provide us with the tool to increase the code reliability and therefore I recommend to always have it switched on unless you are dealing with a huge legacy system which does not compile because of this compiler switch.

### void
From the spec:
> The Void type, referenced by the void keyword, represents the absence of a value and is used as the return type of functions with no return value. The only possible values for the Void type are null and undefined. The Void type is a subtype of the Any type and a supertype of the Null and Undefined types.

This seems to be the pretty simple type with the domain of two values `null` and `undefined`. But as we learned earlier, the same domain is defined for `null` and `undefined` types. While the need for later types is dictated by Javascript, why we need yet another type with the same domain? Well, first, with `--strictNullChecks` the domains become not the same and second, we want to logically differentiate between function which might return `undefined` in some cases and function which does not expect to return any value at all:

```ts
type f1 = () => string | undefined;
var f1: f1 = () => 'result';

type f2 = () => void;
var f2: f2 = () => console.log('f2');

type f3 = () => undefined;
var f3: f3 = () => undefined;

f1 = f2; // Error
f1 = f3; // OK
```

### never
The `never` type represents the type of values that never occur. It is a bit weird, but it perfectly makes sense in cases when function never returns a value or when you write a code in the code branch which will never execute: 

```ts
function infiniteLoop(): never {
    while (true) {
    }
}

function f(x: string) {
  if (typeof x === 'string') {
    console.log(x);
  } else {
    console.log(x); // type of x is never at this point
  }
}
```
