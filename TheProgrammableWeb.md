I have spent many years in the University teaching students software engineering and writing my Ph.D. theses. During that time, of course, I had to read a lot of books and papers. One interesting point kind of carved in my mind: many years all kinds of software researchers and practitioners were trying to invent components. It was and still is the way too overloaded term. Different software concept was considered as components, from classes and functions to DLLs, JAR files and other things special for the operating system or some kind of framework. Like for example Angular 2 has components concept today as well as a WEB as a whole has now a concept of WEB component.

The primary characteristic of any component has always been some kind of secret and different kinds of components failed in different ways to hide their secrets and provide reusable abstractions. However these days we have another kind of component - a web service running somewhere. I am just amazed how abstract it is. The only thing you have to know is the URL, the address of the resource you want to utilize in your application and that's basically it. Dave Thomas once in the [interview](http://www.se-radio.net/2008/02/episode-86-interview-dave-thomas/) mentioned that someone should have created Intel of software components instead of tons of frameworks. Well, today's frameworks are not that bad anymore. But we almost have the Intel of software components. The only difference is that this Intel is not a single company but a service through which you can select whatever component you want to use in the application.

I am talking about http://www.programmableweb.com/. It looks like a marketplace for software components. Recently I had to build an application which would ask users to record some video from whatever device, take and store these videos on the server, transcribe videos and store information about videos as well as transcriptions in some kind of storage. Sounds like a really big project? I was able to do it in approximately 2 weeks including investigation and proof of concepts. 

First search for some kind of video recording, playback, and hosting service:

![](http://puu.sh/pRpFJ/f699e4614c.png) 

After a little bit of investigation CameraTag and Ziggeo proved to be components which could be embedded in my web applications to record/playback videos and also could host these videos and provide fast access to them.

Great, now that I have my videos and access to them, I want to transcribe them. For this I just select IBM Watson service (which by the way is the great one):

![](http://puu.sh/pRq5O/8c9a28a44a.png).

Next, glue these web services together and application is ready. And of high quality by the way.

To conclude, I would like to say that now is a really great time for developing software applications. Even a small team can build something complex and large by grabbing whatever complex component it wants and access it almost instantly. One also can build his/her own business in building such software components. The business model is pretty simple, people will pay you for computing and storage resources you provide to them. IBM in my example earns money for their artificial intelligence algorithms and Ziggeo/CameraTag have their money for capturing, storing and playing video resources. 
