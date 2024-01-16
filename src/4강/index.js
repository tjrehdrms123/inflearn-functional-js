var _ = require("../core/partial");

var mi = 0;
var fi = 0;

var Lmi = 0;
var Lfi = 0;

// 엄격한 평가
_.go(
  _.range(100),
  _.map(function(val){
   ++mi;
   return val * val; 
  }),
  _.filter(function(val){
    ++fi;
    return val % 2;
  }),
  _.take(5),
  console.log)

console.log('mi:',mi);
console.log('fi:',fi);

// 지연 평가
_.go(
  _.range(100),
  _.L.map(function(val){
   ++Lmi;
   return val * val; 
  }),
  _.L.filter(function(val){
    ++Lfi;
    return val % 2;
  }),
  _.L.take(5),
  console.log)

console.log('Lmi:',Lmi);
console.log('Lfi:',Lfi);