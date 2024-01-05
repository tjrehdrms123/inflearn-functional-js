const { _map, _each, _go, _filter_cr, _map_cr, _keys, users } = require("../core/_");

// _each 외부 다형성 높히기
_each(null, console.log);
console.log(_map(null, v=>v));

_go([1,2,3,4],
  _filter_cr(v=>v%2),
  _map_cr(v=>v*2),
  console.log)

console.log(_keys([1,2,3,4]))
console.log(_keys(null))

_each({
  13:'Id',
  16:'Yg',
  19:'Zd'
}, function(name){
  console.log(name);
})

console.log(_map({
  13:'Id',
  16:'Yg',
  19:'Zd'
}, function(name){
  return name.toLowerCase();
}));

_go({
  1: users[0],
  3: users[2],
  5: users[4]
},
_map(function(user) {
  return user.name.toLowerCase();
}),
console.log);