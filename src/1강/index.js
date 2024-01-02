/* Example - 순수함수 */

function add(a,b){
  return a+b;
}

console.log(add(10,5));
console.log(add(10,5));

/* Example - 동일한 인자를 주었을때 동일한 결과를 반환하지 못하는 함수 */

var c = 20;
function add2(a,b,c){
  return a+b+c;
}

console.log(add(10,5,2));
c = 30; // c의 상태가 변경되어 동일한 인자를 주었음에도 동일한 결과를 반환하지 못한다. 하지만 c가 변경되지 못하는 상수일 경우에는 add2 함수는 순수 함수가 된다.
console.log(add(10,5,2));

/* Example - 부수효과가 있는 함수 */
var d = 20;
function add3(a,b){
  d = b;
  return a+b;
}
console.log('d:',d);
console.log(add3(10,30));
console.log('d:',d); // add3 함수가 실행되면서 부수효과 외부에 관여해 값을 변경하는 코드가 있으므로 순수함수가 아니다.
console.log(add3(10,30));

/* Example - 객체 수정 */

// 순수 함수가 아닌 예시
var obj1 = {val: 10};
function add4(obj1, b){
  obj1.val += b; // 객체의 상태를 변경할때 원본 객체를 직접 변경했으므로 순수함수가 아니다.
}
console.log(obj1.val);
add4(obj1,20)
console.log(obj1.val);

// 순수 함수로 변경
var obj2 = {val: 10};
function add5(obj2, b){
  return {val: obj2.val + b}
}
console.log(obj2.val);
var newObj2 = add5(obj2,20);
console.log(obj2.val); // add5함수를 실행 했음에도 10으로 출력 -> 기존 객체를 수정하지 않고 새로운 객체로 리턴했기 때문에
console.log(newObj2.val);

/* Example - 일급 함수 */

var f1 = function (a){return a*a}; // 함수가 값으로 취급됨
console.log(f1(2));

function f2(f){
  return f();
}
console.log(f2(function(){ return 11; }));

/* Example - add_maker */ 

// 순수 함수
function add_maker(a){ // 함수를 리턴하는 함수
  return function(b){ // a의 값을 참조 하기 때 문에 클로저 함수
    return  a+b;
  }
}

var addMaker100 = add_maker(100);
console.log(addMaker100(200));
var addMaker30 = add_maker(30);
console.log(addMaker30(30));

/* Example - multi function args */ 

function f4(f1, f2, f3){
  return f3(f1()+f2());
}
console.log(f4( 
  function(){ return 2; },
  function(){ return 1; },
  function(a){ return a*a }  
));