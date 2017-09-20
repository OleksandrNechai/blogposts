**Wrestling with large code amounts and winning: multiline editing.**

Sometimes on the data processing project, it is needed to work with a large amount of code or other text which is similar but still is different enough. So, it is not viable to extract it into the callable function. For example (yes it is contrived one) you might have a long list of object initializers like this:

```cs
public static IEnumerable<Student> Students()
{
    yield return new Student{Name = "Karl"};
    yield return new Student{Name = "John"};
    yield return new Student{Name = "Benjamin"};
    // .... 200!!! other students
    yield return new Student{Name = "Christopher"};
}

public class Student
{
    public string Name{get;set;}
}
```

Imagine for some reason you decided you wanted to make `Student` immutable and now you need to replace object initializers with constructor calls. Such a task sounds daunting and extremely boring (unless there is Resharper's feature that can do exactly what you want). Watch what is possible with Visual Studio Code. It saved me so much time in my last projects where I had to write tone and tones of DSL code to specify domain object definitions:

![2](https://user-images.githubusercontent.com/14070311/30664882-d9e9e63a-9e57-11e7-82e8-8903192e328c.gif)

Here is what I did (Windows 10):
1) I searched for `};` this is just an anchor to make VS Code know what to highlight;
2) `Alt+Enter` each highlighted piece of code gets cursor;
3) I replace right curly bracket with round one and delete unneeded space;
4) `Ctrl+Left Arrow` to navigate word by word to the left (in general all shortcuts to navigate text are very useful in this context because cursors are in different places of the lines );
5) I replace left curly bracket with round one and delete unneeded code `Name=`.
6) `Escape` to remove multi-line cursor. Done!

Additionally, to add cursors, you can hold `Ctrl+Alt` while pressing the up ↑ or down ↓ arrow keys or hold `Alt` and click left mouse button in desired spots.  But using search/`Alt+Enter` feature can make things even easier for very large files with hundreds of entries.

Enjoy powerful coding! 
