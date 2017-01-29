# Using array destructuring and recursion to make your JavaScript algorithms shine

JavaScript if far from being the best-designed language in the world. I personally often feel myself like in the mine field when coding in it. But it evolves and gets better and better. I can increasingly better express the ideas in JavaScript and I feel it becomes truly powerful and pretty pleasant language to use. Here, I want to share how today one can calculate the sum of the array of numbers. The example is contrived but this example is always used in the schools to teach programming and usually, students are taught to create an accumulator variable and then iterate and accumulate the sum in that variable. How procedural is this! Now, look at what you can do with JavaScript today:

```js
function sum([head, ...tail]) {
  return head === undefined ?
    0 :
    head + sum(tail);
}
```

No variables, no loops, pure simplicity. It might be not very efficient code, but very simple and functional one.

Another example. I have found a quicksort implementation in JavaScript on the web (you can skip it, it is just for illustration):

```js
function quickSort(arr, left, right){
   var len = arr.length, 
   pivot,
   partitionIndex;

  if(left < right){
    pivot = right;
    partitionIndex = partition(arr, pivot, left, right);
    
   //sort left and right
   quickSort(arr, left, partitionIndex - 1);
   quickSort(arr, partitionIndex + 1, right);
  }
  return arr;
}

function partition(arr, pivot, left, right){
   var pivotValue = arr[pivot],
       partitionIndex = left;

   for(var i = left; i < right; i++){
    if(arr[i] < pivotValue){
      swap(arr, i, partitionIndex);
      partitionIndex++;
    }
  }
  swap(arr, right, partitionIndex);
  return partitionIndex;
}

function swap(arr, i, j){
   var temp = arr[i];
   arr[i] = arr[j];
   arr[j] = temp;
}
```

It is totally procedural and very difficult to understand. Now, here is my alternative implementation, using recursion and latest JavaScript features:

```js
function qsort([x, ...xs]) {
  if (x === undefined) {
    return [];
  } else {
    const smaller = xs.filter(a => a <= x);
    const larger = xs.filter(a => a > x);
    return qsort(smaller).concat(x, qsort(larger));
  }
}
```

So clear, so simple and again no loops or variables. Love it. Again, performance is not great here, but I am biased towards code simplicity and optimizing only when absolutely necessary.
