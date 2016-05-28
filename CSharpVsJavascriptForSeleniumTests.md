# C# vs JavaScript for Selenium tests

Few weeks ago I had a choise to be made and this choise was not easy for me. Here I would like to share my desision and some resoning behind. I have decoided to add some automated GUI testing to the project I am working on. This is web application and therefore the choise of testing tool was simple - Selenium. However I could not decide which language to use for coding the tests and testing framework. The thing is that I am currently bilingual guy (as probably every non-node web developer) and I regulary use both C# and JavaScript. So I started coding first tests and inception of test framework in both. After few days of coding using each language, I have finaly choosen C# over JavaScript. Let me tell why and probably my reasonong will help someone else to make a decision.

I have started with JavaScript (Node, Jasmine, WebDriverJs, VS Code). Well, because:
* Traditionaly people write tests in scriptiong languages, which should add to the productivity and code simplicity
* Node is ture crossplatform technology and if needed I would be able to run tests on any platfrom I like
* I wanted to learn how to code for Node (doing modules and stuff)

First, everything went well and smothly, but then poblems started to creep in. The root of these problems was JavaScript's asynchronious nature while tests are synchronyous by nature. Test steps must execute sequentialy because order matters. Perfrom 'Save' button click before form is filled and test is miserable faild. Here are the problems:

* Whole WebDriverJS API is asynchrinius and every command results in a promise! Promise! Well, they are meant to be a simplification of callbecks, but they are still callbacks and for sequential guy like me, haveing a promise after every API call is too much. Brain just expodes. But it is just testing! It should be simple to be valuable. Resulted code with promises just promised to become mainetance nightmare;

* Sometimes tests did not work as expected and I had to debug. You know, just put break point in the place where some call to web driver API happens. Like here, say, right before clicking the button:

```JS
function login(username, password) {
    driver.wait(until.elementLocated(By.id('inputEmail')));
    driver.findElement(By.id('inputEmail')).sendKeys(username);
    driver.findElement(By.id('inputPassword')).sendKeys(password);
    return driver.findElement(By.tagName('button')).click();
}
```

But you know what? When execution stops at the breakpoint it is basically the middle of registration of callbacks. You are stopped even before Selenium started to search for 'inputEmail'! I just can't imagine where to put a break point to have the test stop rigth before clicking the button (probably there is some whay but I don't not know it)  

* In the test itself, I did not want to use any variables for simplicity sake. To that business analyst or QA guy coud easily understand what happens in the test. However because of 
promises I just had to introudce a variable and complexity, because there was no way to ensure that test assertion happened in the very end of the test:

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

While the code is probably not very complex, but it is definetly not for non-programmers.

* Since Javascript is dynamic and WebDriverJS API is also dynamic, while coding you should constanly look at documentation or run debugger to see what kind of methods are available and how to call them correctly

After some fight, I sut gave up and started to do the same with C#. Wow! It was just differend world, all these problems just were just gone. Static typing gave fantastic auto-complition, debugging was just great! I could stop the the test at any place and then go through it step by step observing the effects in the browser. Because there was no need to deal with promises while asserting, I was able to write test without variables:

```CS
            Page.GoTo();
            Page.CloseAllTabs();
            Page.EnterSearchTerm("Transmission");
            Page.CreateTab("Brand", new[] { "Brand" });
            Assert.IsTrue(Pages.AtLeastOneStatementIsDisplayed());
```

Conclusion: sometimes your language is not sutable for the task. Althoug I really like JavaScript (good parts) and it shines in browser it turned out it is not the best option for doin test automation.
