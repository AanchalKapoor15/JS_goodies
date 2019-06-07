function print() {
    console.log('');
}

//Basic generator

function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
}

var it = foo();

console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

//2-way communication with generators - 1
function* goo(x) {
    var y = 2 * (yield (x + 1));
    var z = yield (y / 3);
    return x + y + z;
}

var it = goo(5);

console.log(it.next());       // { value:6, done:false }
console.log(it.next(12));   // { value:8, done:false }
console.log(it.next(13));   // { value:42, done:true }

//2-way communication with generators - 2
var it = goo();

console.log(it.next(4));       // { value:NaN, done:false }
console.log(it.next(8));   // { value:5.33333333, done:false }
console.log(it.next(12));   // { value:NaN, done:true }

//2-way communication with generators - 3
var it = goo(20);

console.log(it.next(4));       // { value:21, done:false } x=12, y=22 z=15
console.log(it.next(6));   // { value:7.33333333, done:false }
console.log(it.next(15));   // { value:49, done:true }

//2-way communication with generators - 4
var it = goo();

console.log(it.next());       // { value:NaN, done:false } x=undef, y=16 z=12
console.log(it.next(8));   // { value:5.33333333, done:false }
console.log(it.next(12));   // { value:NaN, done:true }

//generators are implicit iterators
function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
}

for (let x of foo) {
    console.log(x);
}
//will print 1 through 5. for of discards the object with done: true


//error handling with generators
function* foo() {
    try {
        var x = yield 3;
        console.log('x is: ' + x);
    }
    catch (err) {
        console.log('err is: ' + err);
    }
}

var it = foo();

var res = it.next(); //res is {value: 3, done: false}
it.throw('Oops'); //err is: Oops is consoled out 
//line #79 is not hit, because an error was thrown into the generator when it yield-paused at line#78 
//- thereafter the catch block was hit.


//error thrown into generator but not caught by it
function* foo() {
    var x = yield 3;
    console.log('x is: ' + x);
}

var it = foo();

foo.next();
foo.throw('err'); //uncaught error

////If you throw(..) an error into a generator, but no try..catch catches it,
//the error will (just like normal) propagate right back out
// (and if not caught eventually end up as an unhandled rejection)
function* foo() { }

var it = foo();
try {
    it.throw("Oops!");
}
catch (err) {
    console.log("Error: " + err); // Error: Oops!
}

//reverse flow of error: from inside the generator to calling env
function* foo() {
    var x = yield 3;
    var y = x.toUpperCase();
    yield y; //never executed if line #121 throws an error (typeError)
}

var it = foo();

it.next(); //{value: 3, done: false}

try {
    it.next(5);
}
catch (err) {
    console.log(err);//typeerror
}
it.next(); //{value: undefined, done: true}
it.next(); //{value: undefined, done: true}
it.next(); //{value: undefined, done: true}

//delegating generators -1
function* foo() {
    yield 4;
    yield 5;
}

function* bar() {
    yield 1;
    yield 2;
    yield 3;
    yield* foo();
    yield 6;
    yield 7;
}

var it = bar();

it.next(); //{value: 1, done: false}
it.next(); //{value: 2, done: false}
it.next(); //{value: 3, done: false}
it.next(); //{value: 4, done: false}
it.next(); //{value: 5, done: false}
it.next(); //{value: 6, done: false}
it.next(); //{value: 7, done: false}
it.next(); //{value: undefined, done: true}

//delegating generators -2
function* foo() {
    var z = yield 3;
    var w = yield 4;
    console.log("z: " + z + ", w: " + w);
}

function* bar() {
    var x = yield 1;
    var y = yield 2;
    yield* foo();
    var v = yield 5;
    console.log("x: " + x + ", y: " + y + ", v: " + v);
}

var it = bar();

it.next(); //{value: 1, done: false}    
it.next("X"); //{value: 2, done: false} x=X
it.next("Y"); //{value: 3, done: false} y=Y
it.next("Z"); //{value: 4, done: false} z=Z
it.next("W"); //{value: 5, done: false} w=W ; "z: " + Z + ", w: " + W
it.next("V"); //{value: undefined, done: true} v=V; "x: " + X + ", y: " + Y + ", v: " + V 
/////done is marked true when either the function boundary is reached or "return" is encountered or when done is marked true once
it.next(); //{value: undefined, done: true}

//delegating generators -3
function* foo() {
    yield 2;
    yield 3;
    return 'foo';
}

function* bar() {
    yield 1;
    var v = yield* foo();
    console.log('v: ' + v);
    yield 4;
}

var it = bar();

it.next(); //{value: 1, done: false}
it.next(); //{value: 2, done: false}
it.next(); //{value: 3, done: false}
it.next(); //v: foo //{value: 4, done: false}
it.next(); //{value: undefined, done: true}
it.next(); //{value: undefined, done: true}
it.next(); //{value: undefined, done: true}

//delegating generators and error handling
function* foo() {
    try {
        yield 2;
    }
    catch (err) {
        console.log("foo caught: " + err);
    }
    yield;

    //now throw another error
    throw 'Oops';
}

function* bar() {
    yield 1;
    try {
        yield* foo();
    }
    catch (err) {
        console.log("bar caught: " + err);
    }
}

var it = bar();

it.next(); //{value: 1, done: false} 
it.next(); //{value: 2, done: false}
it.throw( "Uh oh!" ); //foo caught: + Uh oh! {value: undefined, done: false}
it.next(); //bar caught: " + Oops  {value: undefined, done: true}
//when iterator.next() is invoked, the value/done object HAS to be returned - even if there is no "yield" left!!