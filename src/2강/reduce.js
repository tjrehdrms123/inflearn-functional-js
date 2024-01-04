const { _reduce, _pipe, _go } = require("../core/_");

/*
  === 실행동작 예시 ===
  memo = add(0,1)
  memo = add(memo,2)
  memo = add(memo,3)
  return memo
  
  add(add(add(0,1),2),2)
  iter(iter(iter(0,1),2),2)
  ==================
 */


function add(a,b){
  return a+b;
}

console.log('============ reduce ============')
console.log(_reduce([1,2,3,4], add, 10));
console.log(_reduce([1,2,3,4], add));

console.log('============ pipe ============')

var f1 = _pipe(
  function(a) { return a+1 },
  function(a) { return a*2 },
  function(a) { return a*3 },
  function(a) { return a-10 }
)

console.log(f1(10));

console.log('============ go ============')
console.log(_go(
  10,
  function(a) { return a+1 },
  function(a) { return a*2 },
  function(a) { return a*3 },
  function(a) { return a-10 }
));