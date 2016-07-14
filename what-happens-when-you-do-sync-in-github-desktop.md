I am by no means a git expert, but here is what I have learned when I was trying to answer to myself the following questions:
* How to think about and visualize git branches to improve understanding of what is going on?
* What actually happens when I press `sync` button in GitHub Desktop?
* Why when someone does it to save their commits on the server, git automatically creates another commit called "Merge branch master of..."?
* What does diff tool show when one looks at changes made in this automatic commit?

Let's start with the first question. People use different ways to illustrate what happens inside git system. Some of them make me gaze at the picture for minutes trying to make sense of it. But one way actually helped me to understand better the answers to my questions. It is pretty simple but reflects how things are actually done. The branch structure is shown as a tree data structure with two types of nodes: commit and branch identifier. These nodes point to each other. Here is how the main branch may look like in such a visualization:

![](http://puu.sh/pUNz5/4568efc60c.png)

It is helpful to think of this situation as `master` branch has changes made in commit A and B. If the branch pointer does not point to some commit, either directly or indirectly, the changes of that commit are not incorporated in the branch.

So, what actually happens when I press `sync` button in GitHub Desktop? Since Git is [distributed version control](https://en.wikipedia.org/wiki/Distributed_version_control) system each developer as well as remote server has its own copy of the whole repository. And `sync` tries to make your local copy of repository the same as remote server's repo. For this it does 1) `pull` command to harvest changes form the server, which is not present in your local repo and 2) `push` command to push your changes, which are absent on remote server.  

Why when someone does `sync` to save their commits on the server, git automatically creates another commit called "Merge branch master of..."? This is an interesting question and the one, which motivated me to write this post. Let's see what happens using an example. Imagine, you have a remote server with your repository, most probably GitHub. And you also have a clone of this repository locally. You have one branch `master` and two commits A and B in it. This is what is shown in the previous illustrations. But more accurate way to think of this is the following one:

![](http://puu.sh/pVXIZ/62a65c98a4.png)

That is, in reality, you have two master branches on your local machine and one on GitHub. Looks like a mess? Yes, it is a mess! This is why you might have difficulties with understanding Git just like I have. But anyway, imagine now someone in your team did the commit C into your GitHub repo:

![](http://puu.sh/pVY9N/e1d6dcd2ef.png)

Now your GitHub branch is ahead of your local one. Meanwhile, you have done some changes and created your own commit D:

![](http://puu.sh/pVYxA/3c05a2006f.png)

Now all your branches point to different commits! The `origin/master` branch can never be changed by yourself and therefore it stays pointing to the command B. At this point you press `sync` and first what happens is `pull` command. This command consists of two other commands: `fetch` and `merge`. The `fetch` command updates your `origin/master` local branch:

![](http://puu.sh/pVZ3U/227acd1b64.png)

At this point, your local master branches have clear divergence in their path. But what you probably want when you press `sync` button is to have them synchronized. This is done by the second component of `pull` command - `merge`. Its task is to take the `origin/master` changes, in our case the commit C and incorporate it in `master`, in other words, it unites two histories in one:

![](http://puu.sh/pWzVO/8356ee9c5c.png)

Merge commit is special, it can have more than one parent. At this point, we can answer the last question: What does diff tool show when one looks at changes made in this automatic commit?. So on the left side we have `master` branch before the merge and on the right side - `master` branch after the merge. Now, `origin/master` is a bit too old. The `push` command will bring everything to balance by updating remote branch with local one:  

![](http://puu.sh/pWGj0/adf4343a67.png)

Let's have a look at `git log origin/master`:

![](http://puu.sh/pWARx/9f7ffd2b3a.png)

We can see the C commit in the result of the merge. Since branches histories are merged, both C and D are the parts of `origin/master` and `master` branches, in the picture they are kind of in parallel to each other, but in `git log` they are ordered by the creation time. The C commit, however, is only virtually part of the history of these branches. Physically C commit is still kind of branched off and only M commit which is basically a duplication of C made possible to have C in the history of `master` and `origin/master` branches. You might ask why don't just put C in place of M? I think it's not done like this because C might contain conflicting changes with D and if we simply put C in place of M this would possibly delete or destroy changes in D. We could of course go for the merge process resulting C in place of M, but if merge process would require considerable changes, the result would have been not pure C it would have been some kind of mutation. Furthermore, moving C in place of M could destroy other branches which could potentially branch off from C and did not expect to have D commit changes in them. 

Confusion adds GitHub Desktop wich tries to be smart and hides from the user C commit which is a redundant one (note, C commit is skipped):

![](http://puu.sh/pWB1O/e454f2cd02.png)

Hope this helps you understanding your `sync` button. To avoid complications of merging things, always do `sync` just before making your commit and don't forget to do `sync` after you have done your commit.

If you like this post, please follow me on ![twitter](https://twitter.com/OleksandrNechai), see you there!
