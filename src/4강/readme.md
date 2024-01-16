# ✨ 지연평가

지연 평가를 시작 시키고 유지 시키는(이어 가는) 함수

- map
- fileter, reject

평가를 끝내는 함수

- take
- some, every, find

## 📚 실행 순서

### 엄격한 평가

`엄격한 평가`에서는 실행중인 함수를 마무리 된 후 다음 함수를 실행 시키는 형태로 좌에서 우로 실행 됩니다.

![4_1](/src/img/4_1.png)

```js
_.go(
  _.range(100),
  _.map(function(val){...}),
  _.filter(function(val){...}),
  _.take(5),
  console.log)
```

### 지연 평가

`지연 평가`에서는 위에서 아래로 `함수가 종료되는 조건을 평가를 끝내는 함수가 결정` 합니다.

![4_2](/src/img/4_2.png)

```js
_.go(
  _.range(100),
  _.L.map(function(val){...}),
  _.L.filter(function(val){...}),
  _.L.take(5),
  console.log)
```

## 📚 예제 코드

- [index](./index.js)
- [partial.js](https://marpple.github.io/partial.js/)
