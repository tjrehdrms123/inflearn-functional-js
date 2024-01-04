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

function _filter(list, predi){
  var new_list = [];
  _each(list,function(val){
    if(predi(val)) new_list.push(val);
  })
  return new_list;
}

function _map(list, mapper) {
  var new_list = [];
  _each(list, function(val, key) {
    new_list.push(mapper(val, key));
  });
  return new_list;
}

function _each(list, iter){
  for(var i = 0; i<list.length; i++) {
    iter(list[i]);
  }
}

function _curry(fn){
  return function(a, b){
    // 인자가 2개일 경우는 보조 함수를 바로 시키고, 인자가 1개 라면, 함수를 리턴한다.
    return arguments.length === 2 ? fn(a, b) : function (b){ return fn(a, b)}
  }
}

function _curryr(fn){ // 인자1개만 넘길 경우 오른쪽에서 적용
  return function(a, b){
    // 인자가 2개일 경우는 보조 함수를 바로 시키고, 인자가 1개 라면, 함수를 리턴한다.
    return arguments.length === 2 ? fn(a, b) : function (b){ return fn(b, a)}
  }
}

var _get = _curryr(function(obj, key) {
  return obj == null ? undefined : obj[key];
});

module.exports = {
  users,
  _filter,
  _map,
  _curry,
  _curryr,
  _get,
};