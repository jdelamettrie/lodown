'use strict';

// YOU KNOW WHAT TO DO //




/**
 * identity: Accepts any input, and returns it unchanged
 * 
 * @param {anything} anything: Any value, will be returned unchanged
 * @return {anything} The same value that is input
 */

function identity(anything) {
    return anything;
}
module.exports.identity = identity;

/**
 * typeOf: Accepts any input, and returns the data type of the input
 * 
 * @param {anything} anything: Any value
 * @return {String} The data type of <anything>
 */

function typeOf(anything) {
    if (typeof anything === "object") {
        if (anything === null) {
            return "null";
        }
        else if (Array.isArray(anything)) {
            return "array";
        }
        return "object";
    }
    else return typeof anything;
}

module.exports.typeOf = typeOf;

/**
 * first: Accepts an array and a number, and returns the first <number> items 
 * of <array> except if <number> is not given or not a number, in which case
 * only the first item of <array> is returned
 * 
 * @param {Array} array: Must be an array, otherwise an empty [] is returned
 * @param {Number} number: Must be a positive number, otherwise only the first item is returned
 * @return {Array} An array containing the first <number> of items is returned 
 * except if:
 * - <number> is not given or not a Number or a negative Number =} only the first item is returned
 * - <number> is greater than the length of <array> =} <array> is returned unchanged
 * - <array> is not an Array =} an empty Array [] is returned
 */

function first(array, number) {

    if (Array.isArray(array) === false) {
        return [];
    }
    if (typeof (number) !== "number" || number === undefined || number < 0) {
        return array[0];
    }
    else {
        return array.slice(0, number);
    }
}

module.exports.first = first;

/**
 * last: Accepts an array and a number, and returns the last <number> items 
 * of <array> except if <number> is not given or not a number, in which case
 * only the first item of <array> is returned
 * 
 * @param {Array} array: Must be an array, otherwise an empty [] is returned
 * @param {Number} number: Must be a positive number, otherwise only the last item is returned
 * @return {Array} An array containing the last <number> of items is returned 
 * except if:
 * - <number> is not given or not a Number or a negative Number =} only the last item is returned
 * - <number> is greater than the length of <array> =} <array> is returned unchanged
 * - <array> is not an Array =} an empty Array [] is returned
 */


function last(array, number) {

    if (Array.isArray(array) === false || number === 0) {
        return [];
    }
    if (typeof (number) !== "number" || number === undefined || number < 0) {
        return array[array.length - 1];
    }
    if (number > array.length) {
        return array;
    }
    else {
        return array.slice(array.length - number);
    }
}

module.exports.last = last;

/**
 * each: Iterates over a collection, Array or Object, and applies the 
 * action Function to each element in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 */

function each(collection, action) {
    if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
            var element = collection[i];
            action(element, i, collection);
        }
    }
    else if (typeof collection === "object") {
        for (var key in collection) {
            var element = collection[key];
            action(element, key, collection);
        }
    }
}

module.exports.each = each;

/**
 * indexOf: Designed to loop over an array and find the index of the first iteration 
 * of a specified value
 * @param {Array} array: The collection over which to iterate
 * @param {Value} val: The value to be searched for in <array> 
 * @return {Number} : The index of first iteration of <val> in <array> 
 */


function indexOf(array, val) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === val) {
            return i;
        }
    }
    return -1;
}

module.exports.indexOf = indexOf;


/**
 * filter: Iterates over an array and returns a new array containing the 
 * elements that passes a given test
 * 
 * @param {Array} array: The array over which to iterate
 * @param {Function} action: The test to be applied to each element in the array
 * @return {Array} : An array of all values that passed the input test
 */


function filter(array, action) {

    var result = [];

    //   for (var i = 0; i < array.length; i++) {
    //       var element = array[i];
    //       if (action(element, i, array) === true) {
    //           result.push(element);
    //         }
    //     }

    each(array, function (element, index, array) {
        if (action(element, index, array)) {
            result.push(element);
        }
    });

    return result;
}

module.exports.filter = filter;

/**
 * reject: Iterates over an array and returns a new array containing the 
 * elements which failed a given test
 * 
 * @param {Array} array: The array over which to iterate
 * @param {Function} action: The test to be applied to each element in the array
 * @return {Array} : An array of all elements which failed the input test
 */


function reject(array, action) {
    return filter(array, function (element, index, array) {
        if (!action(element, index, array)) {
            return true;
        }
    });
}

module.exports.reject = reject;

/**
 * partition: Iterates over an array and returns a new array containing two sub-arrays 
 * The first sub-array contains the elements of the array which passed the input test
 * The second sub-array contains the elements of the array which failed the input test
 * @param {Array} array: The array over which to iterate
 * @param {Function} action: The test to be applied to each element in the array
 * @return {Array} : An array of two sub-arrays: all elements which passed the test
 * are contained in the 1st sub-array while all elements which failed the test are 
 * contained in the 2nd sub-array
 */

function partition(array, action) {
    var subArray1 = filter(array, action);
    var subArray2 = reject(array, action);
    var result = [subArray1, subArray2];

    return result;
}

module.exports.partition = partition;

/**
 * unique: Iterates over an array and returns a new array containing all the elements
 * from the array with duplicates removed
 * @param {Array} array: The array over which to iterate
 * @return {Array} : An array containing all the unique elements from <array>
 */

function unique(array) {
    var result = [];
    each(array, function (element, index, array) {
        if (indexOf(array, element) === index) {
            result.push(element);
        }
    });
    return result;
}

module.exports.unique = unique;

/**
 * map: Iterates over a collection, Array or Object, applies the 
 * action Function to each element in the collection, saves the resulting value
 * into a new array and returns that new array.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each element in the 
 * collection
 * @return {Array} : An array containing the resulting values of applying <action>
 * to each item of <collection>
 */

function map(collection, action) {
    var result = [];

    each(collection, function (element, index, collection) {
        result.push(action(element, index, collection));
    });
    return result;
}

module.exports.map = map;


// var map = function(collection, action) {
//   const mappedArray = [];
//   if (Array.isArray(collection)) {
//       collection.forEach((e,i,a) => {
//       mappedArray.push(action(e));
//       })
//     return mappedArray;  
//     }
//   else if (typeof collection === "object") {
//   const mappedObject = {};
//     for (let key in collection) {
//       mappedObject[key] = action(key, collection[key]);
//     }
//     return mappedObject;
//   }
// };
// const players = {
//   Jimmy: "bucket",
//   Chris: "cp3",
//   James: "beard"
// };
// var format = function(key, value) { 
//   return value.toUpperCase();
// };
// map(players,format);

/**
 * pluck: Iterates over an array of objects and looks for a given property then 
 * returns an array containing all the <property> values
 * @param {Array} arrayOfObjects: The array of objects over which to iterate
 * @param {String} property: The property to look for within each object of the array
 * @return {Array} : An array containing the values of <property> for all objects within the array
 */

function pluck(arrayOfObjects, property) {

    return map(arrayOfObjects, function (element, index, arrayOfObjects) {
        return element[property];
    });

}

module.exports.pluck = pluck;

/**
 * contains: Iterates over an array and returns true if a given value is contained
 * in the array and false is the value isn't contained
 * @param {Array} array: The array over which to iterate
 * @param {Value} val: The value to look for in the array
 * @return {Boolean} : True if the value is contained in the array, False if not.
 */

function contains(array, val) {
    return indexOf(array, val) !== -1 ? true : false;
}

module.exports.contains = contains;

/**
 * every: Iterates over a collection(array or object) and applies a function/test to 
 * every element in the collection then returns true if every test returned true and
 * false if not. If no function/test is provided then, true is returned if every element 
 * in the collection is truthy, and false if at least one element is false.
 * @param {Array or Object} collection: The collection over which to iterate
 * @param {Function} action: The function/test to apply to eveery element in the collection
 * @return {Boolean} : true if every test result is true, false if at least one test result 
 * is false. If no function/test is provided then, true is returned if every element
 * in the collection is truthy, and false if at least one element is false.
 */

function every(collection, action) {
    var results = [];

    if (action === undefined) {
        each(collection, function (element, index, array) {
            results.push(!!element);
        });
        if (indexOf(results, false) != -1) {
            return false;
        }
        else return true;
    }
    else each(collection, function (element, index, array) {
        results.push(action(element, index, array));
    });
    if (indexOf(results, false) != -1) {
        return false;
    }
    else return true;
}

module.exports.every = every;

/**
 * some: Iterates over a collection(array or object) and applies a function/test to 
 * every element in the collection then returns true if at least one test returned true and
 * false if not. If no function/test is provided then, true is returned if at least one element 
 * in the collection is truthy, and false if none is truthy.
 * @param {Array or Object} collection: The collection over which to iterate
 * @param {Function} action: The function/test to apply to eveery element in the collection
 * @return {Boolean} : true if at least one test result is true, false if all are false. 
 * If no function/test is provided then, true is returned if at least one element in the collection
 * is truthy, and false if all are false.
 */

function some(collection, action) {
    var results = [];

    if (action === undefined) {
        each(collection, function (element, index, array) {
            results.push(!!element);
        });
        if (indexOf(results, true) != -1) {
            return true;
        }
        else return false;
    }
    else each(collection, function (element, index, array) {
        results.push(action(element, index, array));
    });
    if (indexOf(results, true) != -1) {
        return true;
    }
    else return false;
}


// e

module.exports.some = some;

/**
 * reduce: Iterates over an array and applies a function to all elements in the array,
 * taking the return of the previous iteration of that function as a seed for the following
 * iteration. The seed for the first iteration of the function is to be provided, otherwise
 * the first element in the array is used as the seed.
 * @param {Array} array: The array over which to iterate
 * @param {Function} action: The function to apply to all elements in the array
 * @param {Anything} seed: The initial value to be used as the previous result for the first iteration
 * of <action>.
 * @return {Anything} : The return value of the last function call of the last iteration
 */

function reduce(array, action, seed) {

    var previousResult = seed;


    if (seed !== undefined) {
        each(array, function (element, index, array) {
            previousResult = action(previousResult, element, index);
            return previousResult;
        });
    }
    else {
        previousResult = array[0];
        each(array, function (element, index, array) {
            if (index > 0) {
                previousResult = action(previousResult, element, index);
                return previousResult;
            }
            else {
                return previousResult;
            }
        });
    }
    return previousResult;
}


// var reduce = function (array, action, seed) {

// let result = seed;

//   if(seed) {
//     array.forEach((e,i,a) => {
//       result = action(result, e, i, a);
//       return result;
//     });
//   }
//   else {
//     result = array[0];
//     array.forEach((e, i, a) => {
//       if (i > 0) {
//         result = action(result, e, i, a);
//         return result;
//       }
//       else return result;
//     });
//   }
// return result;
// }

module.exports.reduce = reduce;

/**
 * extend: Copies properties from any number of objects onto a first object and 
 * returns that first object updated.
 * @param {Object} object1: The first object onto which to copy properties to.
 * @param {Object} object2: The second object to copy properties from.
 * @return {Object} object1: The updated version of the first object, now containing
 * all properties and values from the other objects.
 */


function extend(object1, object2) {

    for (var i = 1; i < arguments.length; i++) {
        for (var key in arguments[i]) {
            object1[key] = arguments[i][key];
        }
    }
    return object1;
}

module.exports.extend = extend;