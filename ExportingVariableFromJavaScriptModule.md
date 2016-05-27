From time to time I do the same error when trying to export some variable from whatever kind of JavaScript module:

```JavaScript
function createStudent(aName) {
    var name = aName;

    function setName(aName) {
        name = aName;
    }

    function getName(aName) {
        return name;
    }

    return {
        name: name,
        setName: setName,
        getName: getName
    };
}

var s = createStudent("Alexander");
console.log(s.name); //Alexander
s.setName("Ivan");
console.log(s.name); //Alexander. Why??
console.log(s.getName()); //Ivan. Yay! :-)
```

Having 13 years of coding experience does not save me from the moment of confusion here :-). If you are also confused, then continue reading. 

So, why the result is "Alexander" again? The reason is that `s.name` and local variable `name` are totally different variables. The first one is created here as a property of the object, which is being returned from createStudent:

```JavaScript
return {
    name: name,
    setName: setName,
    getName: getName
};
```

Its value is copied from `name` variable and this value is reference to the "Alexander" string. So at this point both point at the same object. But then `s.setName("Ivan")` gives to the `name` variable (which is closed inside `setName` and `getName`) a new value, which is the reference to the "Ivan" string. The value of `s.name` does not change, therefore we get "Alexander" again from the `console.log(s.name)` expression. However `console.log(s.getName())` returnes "Ivan" because it closes `name` variable inside itself.

So the lesson here is to avoid exporting local variables as module's property. One should export function which closes local variable instead. Another interesting option is to use JavaScript's property feature like this:

```Javascript
return {
    get name() { return name; },
    setName: setName,
    getName: getName
};
```
