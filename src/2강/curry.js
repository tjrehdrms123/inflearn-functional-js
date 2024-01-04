const { users, _curry, _curryr, _get, _map, _filter } = require("../core/_");

/* Exmaple - Curry */

console.log('============ _curry ============')

var add = _curry(function(a, b) {
  return a + b;
});

var add10 = add(10); // 10을 기억한 상태로 클로저가 된다.
console.log( add10(5) ); // 기억한 10에 5를 더해 반환 한다.

console.log( add(5)(3) );

console.log(add(1, 2));

console.log('============ _curryr ============')

var sub = _curryr(function(a, b) {
  return a - b;
});

var sub10 = sub(10);

console.log(sub(10,5)); // 10 - 5
console.log(sub10(5)); // 5 - 10

console.log('============ _get ============')
// function _get(obj, key){
//   return obj == null ? undefined : obj[key];
// }
// TypeError: console.log(users[10].name);
console.log(_get(users[0], 'name'));
console.log(_get(users[10], 'name')); // 원소 안전하게 꺼내기

var get_name = _get('name'); // name key를 꺼내는 함수로 다형성을 높힘
console.log(get_name(users[0]));

console.log('============ _get 활용 ============')
console.log(
  _map(
    _filter(users, function(user) { return user.age >= 30 }),
    _get('name')
  )
)