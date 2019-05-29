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
// var [
//     o[0], //invalid declaration 
//     o[1],
//     o[2],
//     ...o[3]
// ] = data();

//just like the following is an invalid declaration (syntax error)
// var o[0] = 8;

//
var tmp;
var o = [];
tmp = [
    o[3],
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
    second,
    third,
    , //i don't want this assignment
] = data();

//is better written as:
var [
    first,
    second,
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

//what is the output of the following when a null is passed to the function?
function data([
    first = 10,
    second = 20,
    third = 30
] = []) {
    //..
}
//type error: object null is not iterable - default assignment of empty array to parameters-destructuring doesn't safeguard against null.

//now what is the output of the following when a undefined is passed to the function?
function data([
    first = 10,
    second = 20,
    third = 30
] = []) {
    //..
}
//first = 10, second = 20, third = 30

////now what is the output of the following when a undefined is passed to the function?
function data([
    first = 10,
    second = 20,
    third = 30
]) {
    //..
}
//TypeError: undefined is not iterable

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
    ],
    fourth,
    fifth
] = data();
//type error: undefined is not iterable

//fallback for the above error situation
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

//now second will be undefined and so will be third

//what will be the output of the following
function data() {
    return [1, null, 4, 5];
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
//type error: null is not iterable

//************************OBJECT DESTRUCTURING*******************************
//destructuring equivalent of the following:
function data() {
    return { a: 1, b: 2, c: 3 };
}
var temp = data();
var first = temp.a;
var second = temp.b;
var third = temp.c;

//destructuring syntax equivalent
function data() {
    return { a: 1, b: 2 };
}

var {
    a: first, //source: destination
    c: third, //the order of properties is not important, because this is an object not an array.
    b: second
} = data(); //eliminated the need for temp variable

//what will third contain?
//undefined

//what happens to d?
function data() {
    return { a: 1, b: 2, c: 3, d: 4 };
}

var {
    a: first,
    c: third,
    b: second
} = data();
//d gets ignored

//collect unaccounted for properties?
function data() {
    return { a: 1, b: 2, c: 3, d: 4 };
}

var {
    a: first,
    b: second,
    ...third
} = data();

//setting default values
function data() {
    return { b: 2, c: 3, d: 4 };
}

var {
    a: first = 87, //source: target = default     
    b: second, //property: value | here the 'property' happens to be the source and the 'value' happens to be the target
    ...third
} = data();

//weird reverse syntax > "source: target" instead of "target : source"
var obj = {
    a: 1, //property: value | here the 'property' is the target and 'value' the source
    b: 2
}

var {
    a: first = 87,
    b: second, //again property: value | but here the 'property' happens to be the source and the 'value' happens to be the target
    ...third
} = data()

//**************OBJECT ASSIGNMENT DESTRUCTURING*************************
//pre declared targets
function data() {
    return { b: 2, c: 3, d: 4 };
}

var first, second, third;
// {                //the interpreter is going to confuse this syntax with block declaration
//     b: first,
//     c: second,
//     d: third
// } = data(); 

//hence wrap with paranthesis
({
    b: first,
    c: second,
    d: third
} = data());

//alternatively - skip the paranthesis and add a object assignment
var temp;
temp = {
    b: first,
    c: second,
    d: third
} = data();

//the following will again give a syntax error
//  var temp;
// {                
//     b: first,
//     c: second,
//     d: third
//  } = temp = data();
//because again the interpreter will confuse the syntax with block syntax

//*************************OBJECT DEFAULT ASSIGNMENT******************************
function data() {
    return;
}
var {
    b: first,
    c: second,
    d: third
} = data() || {};

//output of the following:
function data() {
    return null;
}

var {
    a: first,
    b: second
} = data() || {};

//first => undefined, second => undefined

//output of the following:
function data() {
    return undefined;
}

var {
    a: first,
    b: second
} = data() || {};

//first => undefined, second => undefined

//***target and source have same name
function data() {
    return { b: 2, c: 3, d: 4 };
}
var {
    b: b,
    c: c,
    d: d
} = data();
//or
var {
    a = 45, //grab the 'a' property from the source object - assign it to target named 'a' - give it default value if couldn't find 'a' property 
    b,
    c,
    d
} = data();

//what is the output of the following:
function data() {
    return { b: 2, c: 3, d: 4 };
}

var {
    b, c, d, e
} = data();

//b, c and d get usual values. e gets undefined

//******************************NESTED OBJECT DESTRUCTURING**************
//destructure the following object:
function data() {
    return {
        a: 1,
        b:
            {
                c: 2,
                d: 3
            }
    }
}
var {
    a: first,
    b: {
        c: second,
        d: third
    } = {} //default assignment
} = data();

//what will the value of x be:
function data() {
    return {
        a: 1,
        bb:
            {
                c: 120,
                d: 3
            }
    }
}
var {
    a: first,
    bb: x1 = {} //default assignment
} = data();

//x1 => {c: 120, d: 3}

//*************ANOTHER SCENARIO FOR DEFAULT ASSIGNMENT**********************
//what will b end up to be:
var o1 = {
    a: {
        b: 2,
        c: 3
    }
};

var o2 = {
    a: {}
};

var o3 = {};

var {
    a: {
        b = 10,
        c = 20
    }
} = o1;
//b is 2

//what will b end up to be now:
var o1 = {
    a: {
        c: 3
    }
};

var o2 = {
    a: {}
};

var o3 = {};

var {
    a: {
        b = 10,
        c = 20
    }
} = o1;
//b is 10

//what will b end up to be now:
var o1 = {};

var o2 = {
    a: {}
};

var o3 = {};

var {
    a: {
        b = 10,
        c = 20
    }
} = o1;

//type error: cannot destructure undefined or null

//what will b end up to be now:
var o1 = {
    a: {
        c: 3
    }
};

var o2 = {
    a: {}
};

var o3 = {};

var {
    a: {
        b,
        c
    } = {
        b: 10,
        c: 20
    }
} = o1;

//b is undefined

//what will b end up to be now:
var o1 = {
    a: {
        c: 3
    }
};

var o2 = {
    a: {}
};

var o3 = {};

var {
    a: {
        b,
        c
    } = {
        b: 10,
        c: 20
    }
} = o2;

//b is still undefined

//what will b end up to be now:
var o1 = {
    a: {
        c: 3
    }
};

var o2 = {
    a: {}
};

var o3 = {};

var {
    a: {
        b,
        c
    } = {
        b: 10,
        c: 20
    }
} = o3;

//now b is 10

//what will b be:
var o1 = {
    a: {
        c: 3
    }
};

var o2 = {
    a: {}
};

var o3 = null;

var {
    a: {
        b,
        c
    } = {
        b: 10,
        c: 20
    }
} = o3;
//type error: cannot destructure property a of undefined or null

//what will b be:
var o1 = {
    a: {
        c: 3
    }
};

var o2 = {
    a: {}
};

var o3 = undefined;

var {
    a: {
        b,
        c
    } = {
        b: 10,
        c: 20
    }
} = o3;
//type error: cannot destructure property a of undefined or null

//*********PARAMETER OBJECTS***************************** */
//better way to destructure?
function data(tmp = {}) {
    var {
        a,
        b
    } = tmp;
}

function data({
    a,
    b
} = {}) {
    //logic
}

//************************NESTED OBJECT AND ARRAY DESTRUCTURING**************************/
//get access to both the destructured object and it's properties in separate variables
var obj = {
    a: 1,
    b: {
        x1: 2
    },
    c: 3
};

var {
    a,
    b,
    b: {
        x1
    },
    c
} = obj;

//destructure this
var obj = {
    a: 1,
    b: [500, 20],
    c: 2
};

var {
    a,
    b: [
        first,
        second
    ] = [], //don't forget your defaults 
    c
} = {} = obj; //don't forget your defaults

//***********************************DESTRUCTURING EXERCISE********************** */
var defaults = {
    topic: "JavaScript",
    format: "Live",
    slides: {
        start: 0,
        end: 100
    }
};

fakeAjax("http://get-the-workshop.tld", handleResponse);


// *******************************************************


function handleResponse({
    topic = "JavaScript",
    format = "Live",
    slides: {
        start = 0,
        end = 100
    } = {}
} = {}) {

    TestCase({
        topic,
        format,
        slides: {
            start,
            end
        }
    });

}

function TestCase(data) {
    console.log(
        data.topic == "JS Recent Parts" &&
        data.format == "Live" &&
        data.slides.start === 0 &&
        data.slides.end == 77
    );
}


// *******************************************************


function fakeAjax(url, cb) {
    // fake ajax response:
    cb({
        topic: "JS Recent Parts",
        slides: {
            end: 77
        }
    });
}

//************** #1 USE CASE: NAMED ARGUMENTS | DESTRUCTURING PATTERN*****************************************************

//definition | classic way
function lookUpRecord(store = "someDefault", id = -1) {
    //...
}

//definition | an alternate way
function lookUpRecord({
    store = "someDefault",
    id = -1
}) {
    //...
}

//invocation
lookUpRecord({ store: "HyperCity", id: 5 });

//******************************************************* #2 USE CASE: DESTRUCTURING AND RESTRUCTURING ******************************

//IMPLICIT APPROACH
var defaults = {
    url: "http://some.base.url/api",
    method: "post",
    headers: [
        "Content-type : text"
    ]
};

    var settings = {
        url: "http://some.other.url/",
        data: 42,
        callback: function (resp) {
            //...
        }
    };

ajax(_.extend({}, defaults, settings));

//DECLARATIVE APPROACH

//Defining the mixing algorithm
function ajaxOptions({
    url = "http://some.base.url/api",
    method = "post",
    data,
    callback,
    headers: [
        header1 = "Content-type : text",
        ...otherHeaders
    ] = [] //don't miss your defaults
} = {}  //don't miss your defaults
) {
return {
    url,
    method,
    data,
    callback,
    headers: [
        header1,
        ...otherHeaders
    ]
};
}

//using the mixing algorithm

//need only the defaults? invoke the algorithm without parameters
var defaults = ajaxOptions();

//need the mixed settings? pass in a settings object
var settings = {
    url: "http://some.other.url/",
    data: 42,
    callback: function (resp) {
        //...
    },
    headers: [
        'header1',
        'header2',
        'header3    '
    ]

};

function ajax(obj){
        console.log(obj.headers[1]);
}

ajax(ajaxOptions(settings));
//***********************************FIND, FINDINDEX AND INCLUDES*/
//Output of the following:
var arr = [{ a: 1 }, { a: 2 }, { a: 3 }];
var op1 = arr.find(function match(v) {
    return v && v.a > 0;
});

var op2 = arr.includes({a:1});

console.log(op1);
console.log(op2);

//output of the following:

