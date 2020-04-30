function reduce(array, fn, initial) {
    let result;
    let i;
    
    if (!initial) {
        result = array[0];
          i = 1
        }
  
      else {
     result = initial;
        i = 0
      }
  
        for (i; i < array.length; i++) {
            result = fn (result, array[i], i, array);
        }  
        return result;
    }

    let arr = [1, 2, 3]
let sumF = (sum, current) => sum + current
//let init = 10

let result = reduce(arr, sumF);
console.log(result)