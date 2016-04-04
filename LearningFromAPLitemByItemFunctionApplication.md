# Learning from APL: item by item function application

There are many old cool languages in the world which brought absolutely new ideas into programming. One of them is APL and its main idea was to build programs as array processing pipelines. And it is amazing how many pretty complex problems can be solved in APL very easily and expressively using just array processing. Modern programming languages all get features which enable us building programs which almost completely consist of array processing pipelines. Just look at LINQ and how it transformed the way how C# is written today. However we still write loops and conditionals as soon as they encounter a slightly different problem then filetring and mapping. Let's learn a bit from APL.

In APL every function is applied to the parameter array item by item:

`2 5 7 + 3 6 1` yields `5 11 8`

What would C# developer do if he wanted to calculate such a sum? Well, who knows, but from my experience many will resort to the loop. However LINQ has special function which will help doing item by item computation. And this function is Zip:

`new[] { 2, 5, 7 }.Zip(new[] { 3, 6, 1 }, (x, y) => x + y) // yields 5 11 8;`

Now, here is another, more realistic problem. You have a turnover in million of dollars of some company over a period of 12 months: `56 59 67 64 60 61 68 73 78 75 81 84`. Can you calculate the company growth in percent in every month starting from second month? No loops! No conditionals! Only using array processing pipeline. Stop reading and go and try to do it in your language. Result should be `5.36 13.56 ¯4.48 ¯6.25 1.67 11.48 7.35 6.85 ¯3.85 8 3.70`.

I will not show you APL solution, to understand it you will need to know APL. But I will show how to solve the problem APL way in C# and JavaScript here.

Let's start with C# (I have implemented few LINQ extensions for readability purposes):

```cs
class Program
{
    static void Main()
    {
        var turnover = new[] { 56.0, 59, 67, 64, 60, 61, 68, 73, 78, 75, 81, 84 };

        var growth = turnover
            .SkipFirst()
            .Zip(turnover.SkipLast(), (x, y) => x / y)
            .Select(x => (x - 1) * 100)
            .Select(x => Math.Round(x, 2));

        Console.WriteLine(string.Join(", ", growth));
    }

}
public static class LinqExtnsions
{
    public static IEnumerable<T> SkipFirst<T>(this IEnumerable<T> source)
    {
        return source.Skip(1);
    }
    public static IEnumerable<T> SkipLast<T>(this IEnumerable<T> source)
    {
        return source.Take(source.Count() - 1);
    }
}
```

````js
var turnover = [56.0, 59, 67, 64, 60, 61, 68, 73, 78, 75, 81, 84 ];
var growth = _.chain(turnover)
  .drop(1)
  .zipWith(turnover, function(x,y){
    return x/y;
  })
  .map(function (x){return (x-1)*100;})
.forEach(document.write);
````
