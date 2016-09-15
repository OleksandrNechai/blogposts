### Why my test does not pass??
Error:
```js
    it('reshape something to matrix', function () {
        expect(
            m(()=>[[3, 5], [6, 7]]).shape(4)).toThrow('Rank error');
    });
```
Correct:
```js
    it('reshape something to matrix', function () {
        expect(() =>
            m([[3, 5], [6, 7]]).shape(4)).toThrow('Rank error');
    });
```
