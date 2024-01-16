var users = [
  { id: 10, name: 'ID', age: 36 },
  { id: 20, name: 'BJ', age: 32 },
  { id: 30, name: 'JM', age: 32 },
  { id: 40, name: 'PJ', age: 27 },
  { id: 50, name: 'HA', age: 25 },
  { id: 60, name: 'JE', age: 26 },
  { id: 70, name: 'JI', age: 31 },
  { id: 80, name: 'MP', age: 23 },
  { id: 90, name: 'FP', age: 13 }
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
    iter(list[keys[i]], keys[i]);
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

/**
 * value를 꺼내는 함수
 */
function _values(data){
  return _map(data, _identity);
}

/**
 * _values의 2번째 인자로 사용 되었고, 추상화 레벨을 더 높혔다. 
 */
function _identity(val){
  return val;
}

/**
 * 전달 받은 data 객체에 key 원소를 수집한다.
 * @param {*} data 
 * @param {*} key 
 */
function _pluck(data, key){
  return _map(data,_get(key))
}

/**
 * filter와 반대 개념으로 true로 리턴되지 않는 false값이 출력된다.
 */
function _reject(data, predi){
  return _filter(data, _negate)
}

function _negate(func){
  return function(val){
    return !func(val);
  }
}

/* 값 하나 찾아내기 */
function _find(list, predi){
  var keys = _keys(list); // 배열이 아니도록 순회 가능 하도록 다형성 처리
  for(var i = 0, len = keys.length; i < len; i++) {
    var val = list[keys[i]];
    if(predi(val)) return val;
  }
}

/* 찾은 값의 key반환 */
var _find_index = _curryr(function(list, predi) {
  var keys = _keys(list);
  for (var i = 0, len = keys.length; i < len; i++) {
    if (predi(list[keys[i]])) return i;
  }
  return -1;
});

/* 조건이 만족하는가? 하나라도 만족 */
function _some(data, predi){
  return _find_index(data, predi || _identity) != -1;
}

/* 조건이 만족하는가? 모두 만족 */
function _every(data, predi){
  return _find_index(data, _negate(predi || _identity)) == -1;
}

/* 가장 작은 값 출력  */
function _min(data) {
  return _reduce(data, function(a, b) {
    return a < b ? a : b;
  });
}

/* 가장 큰 값 출력  */
function _max(data) {
  return _reduce(data, function(a, b) {
    return a > b ? a : b;
  });
}

/* 가장 작은 값을 출력 - 보조 함수를 원자 값에 적용  */
function _min_by(data, iter) {
  return _reduce(data, function(a, b) {
    console.log('a:',a);
    console.log('b:',b);
    return iter(a) < iter(b) ? a : b;
  });
}

/* 가장 큰 값을 출력 - 보조 함수를 원자 값에 적용  */
function _max_by(data, iter) {
  return _reduce(data, function(a, b) {
    return iter(a) > iter(b) ? a : b;
  });
}

/* obj[key]가 있으면 그대로 사용하고 없으면 배열로 초기화 시킨다. */
function _push(obj, key, val){
  (obj[key] = obj[key] || []).push(val) 
  return obj;
}

/* count에 값이 없다면 1로 초기화 시키고, 값이 있다면 해당 값을 증가시킴 */
function _inc(count, val){
  count[val] ? count[val]++ : count[val] = 1;
  return count;
}

var _group_by = _curryr(function(data, iter){
  return _reduce(data, function(grouped, val){
    return _push(grouped,iter(val),val);
  }, {});
});

var _count_by = _curryr(function(data, iter){
  return _reduce(data, function(count, val){
    return _inc(count, iter(val));
  });
});

var _head = function(list){
  return list[0];
}

var _map = _curryr(_map),
  _each = _curryr(_each),
  _filter = _curryr(_filter);
  _find = _curryr(_find);
  _compact = _filter(_identity);
  _min_by = _curryr(_min_by);
  _max_by = _curryr(_max_by);
  _reject = _curryr(_reject);

var _pairs = _map((val,key) => [key, val]);

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
  _keys,
  _values,
  _identity,
  _pluck,
  _reject,
  _negate,
  _compact,
  _find,
  _find_index,
  _some,
  _every,
  _min,
  _max,
  _min_by,
  _max_by,
  _group_by,
  _count_by,
  _pairs,
  _head
};