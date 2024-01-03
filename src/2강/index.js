const { _map, _filter } = require("./_");

/*
  요구사항
  1. 30세 이상인 users를 거른다.
  2. 30세 이상인 users의 names를 수집한다.
  3. 30세 미만인 users를 거른다.
  4. 30세 미만인 users의 ages를 수집한다.
*/

// 테스트 데이터
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

/* Example - 명령형 코드 */
console.log('============ 명령형 ============')

// 1번
var temp_users = [];
for(var i = 0; i < users.length; i++){ 
  if(users[i].age >= 30){
    temp_users.push(users[i]);
  }
}
console.log('1. 30세 이상인 users를 거른다.',temp_users);

// 2번
var names = [];
for(var i = 0; i < temp_users.length; i++){ 
  names.push(temp_users[i].name)
}
console.log('2. 30세 이상인 users의 names를 수집한다.',names);

// 3번
var temp_users2 = [];
for(var i = 0; i < users.length; i++){ 
  if(users[i].age <= 30){
    temp_users2.push(users[i]);
  }
}
console.log('3. 30세 미만인 users를 거른다.',temp_users2);

// 4번
var ages = [];
for(var i = 0; i < temp_users2.length; i++){ 
  ages.push(temp_users2[i].age)
}
console.log('4. 30세 미만인 users의 ages를 수집한다.',ages);
/* Example - 함수형 코드 */
console.log('============ 함수형 ============')

var over_30 = _filter(users, function(user) { return user.age >= 30 });
var f_names = _map(over_30,function(user) { return user.name })
console.log('1. 30세 이상인 users를 거른다.',over_30);
console.log('2. 30세 이상인 users의 names를 수집한다.',f_names);

var under_30 = _filter(users, function(user) { return user.age <= 30 });
var ages_f = _map(under_30,function(user) { return user.age })
console.log('3. 30세 미만인 users를 거른다.',under_30);
console.log('4. 30세 미만인 users의 ages를 수집한다.',ages_f);

/* Example - 다형성 코드 */
console.log('============ 다형성 ============')

console.log(
   "document.querySelectorAll('*').map((v)=>{});" // NodeList는 배열이 아닌 유사 배열이기 때문에 map 메소드를 사용할 수 없음
);

console.log(
  _map([1,2,3,4],function(v){
    return v+10;
  })
)