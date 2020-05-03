function calculator(number = 0) {
    let obj = {
        sum: function (...theArgs) {
            for (let x of theArgs) {
                number += x;
            }
        },
    dif: function (...theArgs) {
      for (let x of theArgs) {
        number -=x;
      }
    },
    div: function (...theArgs) {
      for (let x of theArgs) {
        number /= x;
      }
    },
    mul: function (...theArgs) {
      for (let x of theArgs) {
          number *= x;
      }
    }
  };
  
  return obj;
}

let calcObj3 = calculator (3);
let result = calcObj3.sum(2);