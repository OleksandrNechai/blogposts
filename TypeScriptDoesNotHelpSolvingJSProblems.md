TypeScript, also very promissing language, does not solve fundamental JavaScript's issue (feature?) with "this" property binding. Since TypeScript is heavily used by people coming from C#/Java communities it can lead to unfortunate errors. Let's have a look at code example from 

```TypeScript
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
let greeter = new Greeter("Alexander");
console.log(greeter.greet());  //Hello, Alexander
```

```TypeScript
export class Timer {
    @Output() onFinished = new EventEmitter();
    @Input() duration;

    start() {
        updateClock();
        var timeinterval = setInterval(updateClock, 1000);

        function updateClock() {
            this.duration = this.duration - 1;
            if (this.duration <= 0) {
                clearInterval(timeinterval);
                this.onFinished.emit({});
            }
        }
    }
}
```
