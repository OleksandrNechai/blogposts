# Exploring what does "Remember me" checkbox mean on the Login page powered by ASP.NET Forms Authentication 

The colleague of mine recently asked me to check if our Login works correctly. His concern was application's prompt to login although earlier this day he logged in with "Remember me" checkbox checked. It was a surprise for me because our configuration had this statement:

```xml
<sessionState timeout="720"></sessionState>
```
Since I am not an original developer of the application I am currently working on, I was pretty sure this statement means "Keep user logged in for 12 hours". I figured out I was wrong and in this post, I will explore what does this "Remember me" checkbox actually mean.

**Session timeout and Forms Authentication timeout are not related at all.** ASP.NET is designed so that information about currently logged user is not stored in the sessions as I presumed. In contrast, when the user logs in it creates a so-called forms authentication ticket. This ticket is a long string of different characters with encoded user information in it. This ticket is then returned to the browser with a request to set a cookie with given ticket. To illustrate:

![](http://puu.sh/q3BBW/60e8c5b360.png)

Next time when the browser does request to the server, it sends the same cookie with the ticket inside back to the server, for example:

![](http://puu.sh/q3BPE/88f9c02e97.png)

By processing the accepted ticket, the server knows which user has sent a request to it.
As you have probably noticed, no session is involved in this browser-server communication. This is how ASP.NET is designed. See details [here](https://msdn.microsoft.com/en-us/library/ff647070.aspx). 

Hence, my configuration `<sessionState timeout="720"></sessionState>` has nothing to do with Login functionality of my application. It turned out that ticket expiration can be also configured by adding the following statement to the configuration file: `<forms timeout="720" />`. Finally, my "timeout" configuration looks like this and my user is not logged out for 12 hours:

```xml
<authentication mode="Forms">
  <forms timeout="720" />
</authentication>
<sessionState timeout="720"></sessionState> <!--Timeout session after 12 hours-->
```

**"Remember me" checkbox only helps user's authentification to survive the browser restart.** So, now my user is not logged out every 30 min (this is default forms timeout) but why do we need this "Remember me" checkbox? When this checkbox is checked the server not only asks the browser to store its ticket, it also asks it to persist this ticket for a certain amount of time. For instance, look at this response when the checkbox is checked:

![](http://puu.sh/q3CzM/7893fba4ce.png)

When the browser receives such a response from the server, it saves the cookie with the ticket in the file system, which makes possible for the cookie to survive browser's restart and even operating system restart. Read more about persistent cookies [here](https://en.wikipedia.org/wiki/HTTP_cookie#Persistent_cookie).
