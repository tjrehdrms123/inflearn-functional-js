var users = [
  { id: 1, name: 'ID', age: 36 },
  { id: 2, name: 'BJ', age: 32 },
  { id: 3, name: 'JM', age: 32 },
  { id: 4, name: 'PJ', age: 27 },
  { id: 5, name: 'HA', age: 25 },
  { id: 6, name: 'JE', age: 26 },
  { id: 7, name: 'JI', age: 31 },
  { id: 8, name: 'MP', age: 23 }
];

/**
 * 특정 기준으로 거르고 새로운 배열을 반환
 * @param {Array} list
 * @param {function} predi 조건
 * @returns Array
 */
function _filter(list, predi){
  var new_list = [];
  _each(list,function(val){
    if(predi(val)) new_list.push(val);
  })
  return new_list;
}

/**
 * 배열의 특정 값 수집
 * @param {Array} list 
 * @param {function} mapper 매핑
 * @returns Array
 */
function _map(list, mapper) {
  var new_list = [];
  _each(list, function(val, key) {
    new_list.push(mapper(val, key));
  });
  return new_list;
}

/**
 * 반복문
 * @param {Array} list 
 * @param {Function} iter 
 */
function _each(list, iter){
  // var _length = _get('length'); // null 에러처리
  var keys = _keys(list); // 배열이 아니도록 순회 가능 하도록 다형성 처리
  for(var i = 0, len = keys.length; i < len; i++) {
    iter(list[keys[i]]);
  }
  return list;
}

/**
 * 함수의 인자를 채워나가다가, 인자가 모두 채워지면 함수의 본체를 실행
 * @param {*} fn 
 * @returns 
 */
function _curry(fn){
  return function(a, b){
    // 인자가 2개일 경우는 보조 함수를 바로 시키고, 인자가 1개 라면, 함수를 리턴한다.
    return arguments.length === 2 ? fn(a, b) : function (b){ return fn(a, b)}
  }
}

/**
 * 인자1개만 넘길 경우 오른쪽에서 적용
 * @param {*} fn 
 * @returns 
 */
function _curryr(fn){
  return function(a, b){
    // 인자가 2개일 경우는 보조 함수를 바로 시키고, 인자가 1개 라면, 함수를 리턴한다.
    return arguments.length === 2 ? fn(a, b) : function (b){ return fn(b, a)}
  }
}

/**
 * 원소 안전하게 꺼내기
 */
var _get = _curryr(function(obj, key) {
  return obj == null ? undefined : obj[key];
});

/**
 * 배열로 만들어 splice을 수행 하도록
 *  - 유사 배열로 넘어올 경우를 대비해 Array slice를 call해서 수행
 *    - 메서드 내부에서 this가 배열 객체를 가리키게 하기 위해서 call 사용
 */
var slice = Array.prototype.splice;
function _rest(list, num){
  return slice.call(list, num || 1);
}

/**
 * 2번째 함수를 재귀적으로 호출해서 값을 만들어 나간다
 * @param {*} list 
 * @param {*} iter 
 * @param {*} memo 
 * @returns 
 */
function _reduce(list, iter, memo){
  if(arguments.length === 2){
    memo = list[0];
    list = _rest(list);
  }
  _each(list, function(val){
    memo = iter(memo,val);
  });
  return memo;
}

/**
 * 함수를 리턴하는 함수
 * 연속적인 함수 실행
 */
function _pipe(){
  var fns = arguments; // 클로저
  return function(arg){
    return _reduce(fns, function(arg, fn){
      return fn(arg);
    }, arg);
  }
}

/**
 * pipe 즉시 실행 버전 
 *  - pipe는 함수를 반환하기 때문에 즉시 실행 불가
 * @param {*} arg 
 * @returns 
 */
function _go(arg){
  var fns = _rest(arguments);
  // _pipe 함수에서 인자가 배열로 들어왔을 때를 처리해준다면 apply가 아닌 _pipe(fns)(arg)로 사용해도됨
  return _pipe.apply(null, fns)(arg);
}

function _is_object(obj){
  return typeof obj == 'object' && !!obj;
}

function _keys(obj){
  return _is_object(obj) ? Object.keys(obj) : [];
}

var _map = _curryr(_map),
  _each = _curryr(_each),
  _filter = _curryr(_filter);

module.exports = {
  users,
  _filter,
  _map,
  _curry,
  _curryr,
  _get,
  _reduce,
  _pipe,
  _go,
  _each,
  _keys
};