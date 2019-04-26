function upper(strings, ...values) {
    let s = '';
    for (let i = 0; i < strings.length; i++) {
        if (i > 0) {
            //s += values[i - 1].toUpperCase(); //if the valuees[i-1] is not a string this will throw an exception
            //better to cast the values[i-1] to string
            s += String(values[i - 1]).toUpperCase();
        }
        s += strings[i];
        
    }
    return s;
}

var name = "kyle",
    twitter = "Getify",
    topic = "JS Recent Parts";

function print() {

    console.log(upper`Hello ${name} (@${twitter}), welcome to ${topic}!`);
    console.log(

        upper
            `Hello ${name} (@${twitter}), welcome to ${topic}!` ===
        "Hello KYLE (@GETIFY), welcome to JS RECENT PARTS!"
    );

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//imperative destructuring
var temp = getSomeRecords();

var first = temp[0];
var second = temp[1];

var firstName = first.name;
var firstEmail = first.email ? first.email : 'abc@gmail.com';

var secondName = second.name;
var secondEmail = second.email ? second.email : 'abc@gmail.com';

//declarative destructuring - capture only those elements of the array and properties of the elements which are needed
var [
    {
        name: firstName,
        email: firstEmail = 'abc@gmail.com'
    },
    {
        name: secondName,
        email: secondEmail = 'abc@gmail.com'
    }
] = getSomeRecords();
/////////////////////////////////////////////////////////////////////////////////////////////////////////
function data() {
    return [1, null, 2, 3, 4, 5, 6];
}
//imperative approach
var temp = data();
var first = temp[0];
var second = temp[1] !== undefined ? temp[1] : 10;
var third = temp[2];
var restOfTheArray = temp.slice(3);//if there are no elements after position 2 this will return empty array

//declarative approach
var tmp;
var [
    first,
    second = 10, //only checks for undefined - not null. null will get assigned to 'second'
    third,
    ...fourth //the rest of the array will get sliced and gather into fourth.
    ////if there are no elements after position 2 this will return empty array
    //the spread operator can only come in the end.
] = tmp = data();

//destructuring focuses on assignment and not declaration
var first, second, third, fourth;
[
    first,
    second,
    third,
    ...fourth
] = data();

//just like we use pre-declared variables here we can also use valid locations
var o = {};

[
    o.first, //just like we use pre-declared variables here we can also use valid locations
    o.second,
    o.third,
    ...o.fourth
] = data();

//or

var o = [];
[
    o[0], //just like we use pre-declared variables here we can also use valid locations 
    o[1], //the location on the left hand side just has to be a valid location
    o[2],
    ...o[3]
] = data();

//invalid declaration
var o = [];
var [
    o[0], //invalid declaration 
o[1],
    o[2],
    ...o[3]
] = data();

//just like the following is an invalid declaration (syntax error)
var o[0] = 8;

//
var tmp;
var o = [];
tmp = [
    o[3], //invalid declaration 
    o[4],
    o[5],
    ...o[6]
] = data();

//expected output
tmp === [1, null, 2, 3, 4, 5, 6]//tmp will not get assigned the destructured array. 
//it will be assigned the array coming from the data function

//CAN leave out assignments in destructuring process - ARRAY ELISION
function data() {
    return [1, 2, 3, 4];
}
var tmp = data();
var first = tmp[0];
//var second = tmp[1]; //i don't want this assignment
var third = tmp[2];
var fourth = tmp[3];

var [
    first,
    , //i don't want this assignment
    third,
    ...fourth //fourth contains [4] and not 4. 
] = data();

//array elision can be done anywhere - at the beginning/middle/end. but in practice
//it doesn't make any sense to do it at the end - because:
var [
    first,
    second, //i don't want this assignment
    third,
    ,
] = data();

//is better written as:
var [
    first,
    second, //i don't want this assignment
    third
] = data();

//value swapping without using an extra variable
let x = 1;
let y = 2;
[y, x] = [x, y];

//DESTRUCTURING IN PARAMETER SIGNATURE
//instead of:
function data(tmp) {
    var [
        first,
        second,
        third
    ] = tmp;
}
//i could do:
function data([
    first,
    second,
    third
]) {
    //..
}
/////
function data() {
    return null;
}
var tmp = data();
var [
    first,
    second,
    third
] = tmp; //type error

//fallback for the above error
function data() {
    return null;
}
var tmp = data() || [];
var [
    first, //undefined
    second,//undefined
    third,//undefined
    ...fourth//empty array
] = tmp;
//or
var [
    first, //undefined
    second,//undefined
    third,//undefined
    ...fourth//empty array
] = data || [];

//similar fallback when dealing with destructuring in parameters
function data([
    first,
    second,
    third
] = []) {
    //..
}

////what is the output of the following when a null is passed to the function?
function data([
    first = 10,
    second = 20,
    third = 30
]) {
    //..
}
//type error

//now what is the output of the following when a null is passed to the function?
function data([
    first = 10,
    second = 20,
    third = 30
] = []) {
    //..
}
//first = 10, second = 20, third = 30

//NESTED ARRAY DESTRUCTURING
function data() {
    return [1, [2, 3], 4, 5];
}

var [
    first,
    [
        second,
        third
    ],
    fourth,
    fifth
] = data();

//what will be the output of the following
function data() {
    return [1, undefined, 4, 5];
}

var [
    first,
    [
        second,
        third
    ] = [],
    fourth,
    fifth
] = data();

//type error

//fallback for the above error situation










