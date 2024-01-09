const { _map, users, _keys, _values, _identity, _pluck, _filter, _reject, _compact, _find, _find_index, _go, _get, _every, _some, _min, _max, _min_by, _max_by } = require("../core/_");

// 수집하기
/* Example - map */
console.log(
  _map(users, function(user){
    return user.name
  })
)

/* Example - values */
console.log(users[0]);
console.log(_keys(users[0]));
console.log('_values:',_values(users[0]));
console.log('_map:',_map(_identity)(users[0]));

/* Example - pluck */
console.log('_pluck:',_pluck(users,'age'));
console.log('_pluck:',_pluck(users,'id'));

// 거르기
console.log('_filter:',_filter(users,function(user){
  return user.age > 30;
}))
/* Example - reject */
console.log('_reject:',_reject(users,function(user){
  return user.age > 30;
}))
console.log('_compact:',_compact([1,2,0,false,null,{},[]]))

// 찾아내기
/* Example - find */
console.log('_find:',_find(users,function(user){
  return user.age == 31;
}))

/* Example - find_index */
console.log('_find_index:',_find_index(users,function(user){
  return user.age == 31;
}))

_go(users,
  _find(function(user){ return user.id == 3}),
  _get('name'),
  console.log
)

/* Example - some */
console.log('_some:',_some([1,2,5,10,20], function(val){
  return val > 10;
}))

console.log('_some2:',_some(users, function(user){
  return user.age > 20;
}))

/* Example - every */
console.log('_every:',_every([1,2,5,10,20], function(val){
  return val > 10;
}))
console.log('_every2:',_every([12,24,5,10,20], function(val){
  return val > 3;
}))

console.log('_every3:',_every([12,24,5,10,20]))

// 접기
/* Example - min */
console.log('_min:',_min([10,-3,5,9,2,12]));

/* Example - max */
console.log('_max:',_max([10,3,5,9,2,12]));

/* Example - min_by */
console.log('_min_by:',_min_by([10,-3,5,9,2,12],Math.abs));

/* Example - max_by */
console.log('_max_by:',_max_by([10,-3,5,9,2,-12],Math.abs));