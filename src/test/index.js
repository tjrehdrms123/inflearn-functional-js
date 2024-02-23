const { users, _filter, _go } = require("../core/_");

/*
  요구사항
  1. 30세 이상인 users를 거른다.
  2. 30세 이상인 users의 names를 수집한다.
  3. 30세 미만인 users를 거른다.
  4. 30세 미만인 users의 ages를 수집한다.
*/

function __each(list, iter){
  for(let i = 0; i < list.length; i++){
    iter(list[i]);
  }
}



function __map(list, mapper){
  const new_list = [];
  __each(list,function(val){
    new_list.push(mapper(val));
  })
  return new_list;
}

function __filter(list, predi){
  const new_list = [];
  __each(list,function(val){
    if(predi(val)){
      new_list.push(val);
    }
  })
  return new_list;
}

function __curry(fn){
  return function(a){
    return function(b){
      return fn(a,b)
    }
  }
}


// console.log(names);
console.clear();

// console.log('__map:',__map(users, user => user.age));
// console.log('__filter:',__filter(users, user => user.age > 30));

// const add = __curry((a,b)=>a+b)
// const add10 = add(10);
// console.log(add10(5));

// let numbers = [3,2,5,4,23,3,2,1];
// let minNumbers = numbers[0];

// for(let i = 0; i < numbers.length; i++){
//   if(minNumbers > numbers[i]){
//       minNumbers = numbers[i];
//   }
// }

// console.log('f:',_filter(numbers,v=>v < 3));
// console.log(new_list2);
// console.log(a);

var numbers = [1,4,2,6,8,9,3,2,3,2,1,3];

function removeDuplicates(arr) {
  var uniqArr = [];
}