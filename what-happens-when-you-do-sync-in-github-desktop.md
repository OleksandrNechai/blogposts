I am by no means a git exeprt, but here is what I have learned when I was trying to answer to myself the following questions:
* What actually happens when I press `sync` button in GitHub Desktop?
* Why when someone does it to save their commits on server, git automatically creates another commit called "Merge branch master of..."?
* What does diff tool show when one looks at changes made in this automatic commit?
* How to think about and visualize git branches to improve understanding of what is going on?

Let's start with the last question. People use different ways to illustrate what happens inside git system. Some of them make me gaze at the picture for minutes trying to make sence of it. But one way actually helped me to understand better the answers to my questions. It is pretty simmple but reflects how things are actually done. Branch sturcture is shown as a tree datastructure whith two types of nodes: commit and branch identifier. These nodes point to each other. Here is how the main branch may look like in such a visualization:

![](http://puu.sh/pUNz5/4568efc60c.png)

So, what actually happens when I press `sync` button in GitHub Desktop? Since Git is [distributed version control](https://en.wikipedia.org/wiki/Distributed_version_control) system each developer as well as remote server has its own copy of the whole repository. And `sync` tryes to make your local copy of repository the same as remote server's repo. For this it does 1) `pull` command to harvest changes form the server, which are not present in your local repo and 2) `push` command to push your changes, which are absent on remote server.  

Why when someone does `sync` to save their commits on server, git automatically creates another commit called "Merge branch master of..."? This is interesting question and the one, which motivated me to write this post. Let's see what happens using an example. Imagine, you have remote server with your repository, most probably GitHub. And you also have a clone of this repository locally. You have one branch `master` and two commits A and B in it. This is what is shown on the previous illustrations. But more accurate way to think of this is the following one:

![](http://puu.sh/pVXIZ/62a65c98a4.png)

That is in reality you have two master branches on your local machine and one on GitHub. Looks like a mess? Yes it is mess! This is why you might have difficulties with understanding Git just like I have. But anyway, imagine now someone in your team did the commit C into your GitHub repo:

![](http://puu.sh/pVY9N/e1d6dcd2ef.png)

Now your GitHub branch is ahead of your local one. Meanwhile you have done some changes and created your own commit D:

![](http://puu.sh/pVYxA/3c05a2006f.png)

Now all your branches point to different commits! The `origin/master` branc can never be changed by yourself and therefore it stays pointing to the commid B. At this point you press `sync` and first what happens is `pull` command. This command consists from two other commands: `fetch` and `merge`. The `fetch` command updates your `origin/master` local branch:

![](http://puu.sh/pVZ3U/227acd1b64.png)

At this point your local master branches have clear divergence in their path. But what you probably want when you press `sync` button is to have them synchronized. This is done by second component of `pull` command - `merge`. It's task is to takse the `origin/master`changes, in our case the commit C and incorporate it in `master`.  
