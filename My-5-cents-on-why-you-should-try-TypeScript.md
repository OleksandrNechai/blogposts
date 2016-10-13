### My 2 cents on why you should try TypeScript

It has been said a lot about the value proposition of TypeScript. But I still want to add my 2 cents and talk about the reasons to use TypeScript from the personal perspective. So, here is my list of reasons to use TypeScript:

* It's main designer is Anders Hejlsberg. Well, strange reason, I know. This guy has designed Turbo Pascal,  Delphi, and C#. All widely adopted and great technologies. People love them.  Let's face it, experience matters and I think the guy with such a background behind TypeScript increases its chances to succeed.
* It is supported and developed by Microsoft. Again strange reason, but it seems to me companies are good at certain things at it is very hard for them to become good at other things. Look at to Google's social network Google+. Is it nearly as good as Facebook? Another example is Microsoft's Bing search engine. Is it as good as Google's search? Microsoft has always been good at creating great developer tools and this increases TypeScript's chances to succeed.
* Scientific research [shows](http://pleiad.dcc.uchile.cl/papers/2012/kleinschmagerAl-icpc2012.pdf) that static typing can help developers with maintenance tasks. This is a more objective reason and it is the core one. We have hard data which prooves that TypeScript improves your effectiveness at JavaScript maintenance tasks. And you don't have to reflect hard to see the reason. I have parts of my project at work in TypeScript and after working in such a part for some time I get used to autocompletion, "Find definition/pick definition" and renames. Recently I had to fix a pretty complex bug in the pure JavaScript codebase and I struggled a lot. Not that it was very hard to understand the code, but it was extremely hard to navigate in the code. For example, I open the function. I see it calls another function with some parameter. I want to see what this parameter is, like what is it's typed or whether it is array or not but I can not. Now I want to see the definition of that called function but for this, I need to search the whole codebase. After I have found the definition I want to go back to the caller but this is again not a simple key stroke as it would be in TypeScript. I don't even think about renaming the function. It simply does not work. To rename you have to go through all the code base again and try to understand where you function is called and if this is your function or some other function with the same name. Entering new code in TypeScript is also faster than in JavaScript. This is because you just hit dot and you have the list of API options you can select while in JavaScript you have to remember all the API details. Since it never happens, at least in my case, you have to search the web for API documentation to recall or learn how to call it. Hence TypeScript improves API discoverability. [Pathikrit Bhowmick](https://medium.com/@pathikrit/static-typing-in-like-spell-check-927aa5e38c8c#.cjsuq04ai) summarized experience with type system:
>Static typing is like spell check.
Dynamic typing = writing your essay in Notepad.
Static typing = writing your essay in Word (or Grammarly).

* TypeScript is the mature and open source project. And this is important for production. It was introduced in 2012, so at this point, it is 4 years old language. It has many great and stable features, its compiler is fast and can be tuned to be even faster. It has native support in most popular IDEs like WebStorm and Visual Studio. It has a lot of tooling around it and even linter. It has huge, community developed code base of type definitions for popular JavaScript libraries and frameworks. It has a vibrant community which produces courses and answers questions on the forums. All in all, today starting doing a production with TypeScript is relatively easy and smooth.  
* TypeScript can help to deal with JavaScript's quirks. It can not fix everything as it is a superset of JavaScript, but it can help a lot with some JS problems. For example, it can help you to not mess up your "this" accidentally. It will not allow you to forget to write your return statement fall in the trap of semicolon auto insertion.  It will not give you a chance to create a global variable inside the function. It will help to avoid shooting yourself in the foot with type coercion. I will write another blog post explaining how TypeScript fixes JavaScript later. 
* Fool protection. Here in Ukraine, we tell the system is fool protected if it has means to protect itself from user's incompetent actions. For example, one can not insert battery the wrong way into the smartphone or insert the cable into the wrong computer's port. This whole concept of inserting something only where it fits is extremely suitable to describe a type system. With TypeScript I can only insert a variable into the function where it fits. And this is great. Not that I am a total fool. I would like to be focused on solving the business problem not on whether it is ok or not passing something into the function. I also can be tired or ill or disappointed or distracted or not fluent with current codebase or whatever. All these reasons can cause me to make a fool mistake which will be corrected immediately by TypeScript and which will live until code run in JavaScript. 
* Typescript is zero risk to your project. This is because it generates beautiful idiomatic JavaScript. Hence had you wanted to move back to JavaScript - you would just compile our TypeScript sources to JavaScript and off you go.
* You can generate definitions of your RESTfull API from your backend code. This way if some breaking change happens on the back-end, after declarations generation, you will immediately get a compiler error and we all know, the faster feedback loop the better. 

To summarize, I would say I just feel more relaxed doing TypeScript. It gives similar to C# and VisualStudio joy of coding.