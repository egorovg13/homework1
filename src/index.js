/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array)
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let newArray = [];

    for (let i = 0; i < array.length; i++) {
        let transformedElement = fn(array[i], i, array);

        newArray.push(transformedElement);
    } 
    
    return newArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */

function reduce(array, fn, initial) {
    let result;
    let i;
    
    if (!initial) {
        result = array[0];
        i = 1
    } else {
        result = initial;
        i = 0
    }

    for (i; i < array.length; i++) {
        result = fn (result, array[i], i, array);
    }  
    
    return result;
}

/*
let reducedA = reduce ([1,2], function(sum, current) {
return sum + current;}, 1
)
console.log(reducedA)
}
 */
/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */

function upperProps(obj) {
    let array = [];

    // eslint-disable-next-line guard-for-in
    for (let key in obj) {
        let capitalizedKey = key.toUpperCase();

        array.push(capitalizedKey);
    }
    
    return array;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {
    let newArr = [];

    if (from < 0) {
        from = array.length + from
    }
    
    if (to < 0) {
        to = array.length + to
    }
  
    if (from < 0) {
        from = 0
    }
  
    if (to > array.length) {
        to = array.length
    }

    for (let i = from; i < to; i++) {
        
        newArr.push(array[i])
    }

    return newArr;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    let handler = { set (target, prop, value) {
        target[prop] = value*value;
      
        return true
    }
    }
    let proxy = new Proxy (obj, handler)

    return proxy;
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
