# C# vs JavaScript for Selenium tests

Few weeks ago I had a choice to be made and this choice was not easy for me. Here I would like to share my decision and some reasoning behind. I have decided to add some automated GUI testing to the project I am working on. This is a web application and therefore, the choice of the testing tool was simple - Selenium. However, I could not decide which language to use for coding the tests and testing framework. The thing is that I am currently bilingual guy (as probably every non-Node web developer) and I regularly use both C# and JavaScript. So I started coding first tests and inception of the test framework in both. After few days of coding using each language, I have finally chosen C# over JavaScript. Let me tell why and probably my reasoning will help someone else to make a decision.

I have started with JavaScript (Node, Jasmine, WebDriverJs, VS Code). Well, because:
* Traditionally people write tests in scripting languages, which should add to the productivity and code simplicity
* Node is true cross platform technology and if needed I would be able to run tests on any platform I like
* I wanted to learn how to code for Node (doing modules and stuff)

At first, everything went well and smoothly, but then problems started to creep in. The root of these problems was JavaScript's asynchronous nature while tests are synchronous by nature. Test steps must execute sequentially because order matters. Perform "Save" button click before the form is filled and the test is miserably failed. Here are the problems:

* Whole WebDriverJS API is asynchronous and every command results in a promise! Promise! Well, they are meant to be a simplification of callbacks, but they are still callbacks and for a sequential guy like me, haveing a promise after every API call is too much. To simulate synchronous test execution the use the ControlFlow library, which implicitly synchronizes asynchronous actions, making it so you only have to register a promise callback when you want to catch an error or access a return value. The brain just explodes. But it is just testing! It should be simple to be valuable. Resulted code with promises just promised to become maintenance nightmare;

* Sometimes tests did not work as expected and I had to debug. You know, just put a breakpoint in the place where some call to web driver API happens. Like here, say, right before clicking the button:

```JS
function login(username, password) {
    driver.wait(until.elementLocated(By.id('inputEmail')));
    driver.findElement(By.id('inputEmail')).sendKeys(username);
    driver.findElement(By.id('inputPassword')).sendKeys(password);
    return driver.findElement(By.tagName('button')).click();
}
```

But you know what? When execution stops at the breakpoint it is basically the middle of registration of callbacks. You are stopped even before Selenium started to search for "inputEmail"! I just can't imagine where to put a breakpoint to have the test stop right before clicking the button (probably there is some way to do it but I don't know it)  

* In the test itself, I did not want to use any variables for simplicity sake. So that business analyst or QA guy could easily understand what happens in the test. However because of 
promises I just had to introduce a variable and complexity, because there was no way to ensure that test assertion happened in the very end of the test:

```JS
it('Whould pass', function (done) {
    //Everything is dandy in this section
    page.goTo();
    page.enterSearchTerm('Transmission');
    page.closeAllTabs();
    page.createTab({ name: 'Brand', link: 'Brand' });

    //Complexity starts here when asserts and test cleanup should be done
    page.getElementsOnPage()
        .then(texts => {
            page.removeTab('Brand').then(function () {
                expect(texts[0].length).toBeGreaterThan(0);
                done();
            });
        });
});
```

While the code is probably not very complex, but it is definitely not for non-programmers.

* Since Javascript is dynamic and WebDriverJS API is also dynamic, while coding you should constantly look at documentation or run debugger to see what kind of methods are available and how to call them correctly

After some fight, I gave up and started to do the same with C#. Wow! It was a just different world, all these problems were gone. Static typing gave fantastic auto-completion, debugging was just great! I could stop the test at any place and then go through it step by step observing the effects in the browser. Because there was no need to deal with promises while asserting, I was able to write test without variables:

```CS
Page.GoTo();
Page.CloseAllTabs();
Page.EnterSearchTerm("Transmission");
Page.CreateTab("Brand", new [] { "Brand" });
Assert.IsTrue(Pages.AtLeastOneStatementIsDisplayed());
```

Conclusion: sometimes your language is not suitable for the task. Although I really like JavaScript (good parts) and it shines in the browser it turned out it is not the best option for doing test automation. Did I discover Atwood's Law break? :-)  

>Atwood's Law: any application that can be written in JavaScript, will eventually be written in JavaScript.
