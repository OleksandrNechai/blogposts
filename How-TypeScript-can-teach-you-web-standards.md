# How TypeScript can teach you web standards

Recently my team decided to migrate all views in our Angular 1.x application to React. To me the value of React is doubled if used together with TypeScript. I enjoy developing views when I have autocomplete and static checks for the view model, used in the view. I also can safely rename  elements of data model, which I prefere doing often and after I have already worked with the model and realized what the best name could be. Moreover, JSX in TypeScript is also statically checked, so you can not make mistake there as well. All these merits are impossible in Angular 1.x and Angular 2. Both have special DSLs for describing views and ofcourse those DSL are not as powerful as TypeScript when it comes to static type checks.

But what I have discovered is that TypeScript can even teach you web standards. These standards are not verly consistant but we still have to use them correctly. Let me give you few examples. 

First, TypeScript can teach you JavaScript itself and save you from silly errors. Look at this code and try to answer the questions (`--strictNullChecks`):

```ts
function f(x: number | null)
{
    if (typeof x === 'null') {
        let y = x;  // what is the type of y?
    } else {
        let z = x;  // what is the type of z?
    }
}
```

After you gave it some thought, here is the answerL the type of `y` is `never` and type of `z` is `number | null`. If you answered correctly, you are great JavaScript developer with exceptional memory. The type `never` is given to `y` because that line will never execute. This is because of JavaScript design flaw which defines this expression to be `true`: `typeof null === 'object'`. Having learned this, now, what are the types of `y` and `z`?

```ts
function f(x: number | null)
{
    if (typeof x === 'object') {
        let y = x;  // what is type of y?
    } else {
        let z = x;  // what is type of z?
    }
}
```

Well, you are totally right, `y` is `null`, because `'typeof null === 'object'` is `true`. And since true part of the `if` statement has dealt with `null`, the type of `z` is just `number`.

Now, lets have a look at second example, now TypeScript will tech us something about DOM API. Have a look at this code (it used to handle React button click event):

```ts
function handleClick(e: React.MouseEvent<HTMLButtonElement>)
{
    let value = e.target.value; // Error: Property 'value' does not exist on type 'EventTarget'
}
```
What??? This way official React's page teaches us to access values from the event targets!

![React docs snapshot](http://puu.sh/sNPzM/7e43ac21fd.png)

When we first encountered this problem, we decided there was a bug in TypeScript type definitions for React. But later we discovered, that type definitions actually have another propery for `SyntheticEvent<T>` (type of `target`), named `currentTarget`, whose type is different:

![](http://puu.sh/sNNAn/48e2044842.png) 

Hmm, let's see what dumentation has to say about `currentTarget`:
>Identifies the current target for the event, as the event traverses the DOM. It always refers to the element to which the event handler has been attached, as opposed to event.target which identifies the element on which the event occurred.

While `target` is
>A reference to the object that dispatched the event. It is different from event.currentTarget when the event handler is called during the bubbling or capturing phase of the event.

So are we iterested in the value of the element where we placed an event handler or in the element, which dispathed the event? `target` is the origin of the event, which no one really cares about, it might be a span inside a link, for example, while `currentTarget` is something you should very much care about, as this is the element, to which you have attached your event handler. See more discussion on this topic here [](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11508#issuecomment-256045682). We have learned this only because TypeScript caused us to dig deeper into targets and see the difference. Without it we would have used `target` and wait for problems to come (someone might place child element to the element we were listening to and `target` would become this new element!). So, thanks TypeScript and those great people who write type definitions for lessons :-).
