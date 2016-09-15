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

#Why my test passes while I expect it to fail?
Error:
```js
        it('should throw if question is not found', function () {
            expect(() => table({
                question: 'UNKNOWN',
                questionPosition: 'cols',
                median: true
            }).toThrow('Unknown quetion: UNKNOWN'));
        });
```

Correct:
```js
        it('should throw if question is not found', function () {
            expect(() => table({
                question: 'UNKNOWN',
                questionPosition: 'cols',
                median: true
            })).toThrow('Unknown quetion: UNKNOWN');
        });
```

