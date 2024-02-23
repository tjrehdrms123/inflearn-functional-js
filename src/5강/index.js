var _ = require("../core/partial");

var users = [
  { id: 101, name: 'ID' },
  { id: 102, name: 'BJ' },
  { id: 103, name: 'PJ' },
  { id: 104, name: 'HA' },
  { id: 105, name: 'JE' },
  { id: 106, name: 'JI' }
];

var posts = [
  { id: 201, body: '내용1', user_id: 101 },
  { id: 202, body: '내용2', user_id: 102 },
  { id: 203, body: '내용3', user_id: 103 },
  { id: 204, body: '내용4', user_id: 102 },
  { id: 205, body: '내용5', user_id: 101 },
];

var comments = [
  { id: 301, body: '댓글1', user_id: 105, post_id: 201 },
  { id: 302, body: '댓글2', user_id: 104, post_id: 201 },
  { id: 303, body: '댓글3', user_id: 104, post_id: 202 },
  { id: 304, body: '댓글4', user_id: 105, post_id: 203 },
  { id: 305, body: '댓글5', user_id: 106, post_id: 203 },
  { id: 306, body: '댓글6', user_id: 106, post_id: 204 },
  { id: 307, body: '댓글7', user_id: 102, post_id: 205 },
  { id: 308, body: '댓글8', user_id: 103, post_id: 204 },
  { id: 309, body: '댓글9', user_id: 103, post_id: 202 },
  { id: 310, body: '댓글10', user_id: 105, post_id: 201 }
];

function posts_by(attr) {
  return _.where(posts, attr)
}

var comments_by_posts = _.pipe(_.pluck('id'),
  function(post_ids){
    return _.filter(comments, function(comment){
      return _.contains(post_ids, comment.post_id);
    })
  }
)

var comments_to_user_names = _.map(function(comment){
  return _.find(users, function(user){
    return user.id == comment.user_id;
  }).name
})

// 1. 특정인의 posts의 모든 comments 거르기
console.log('============ 1. 특정인의 posts의 모든 comments 거르기 ============')
// _.go(
//   _.filter(posts, function(post){
//     return post.user_id == 101;
//   }),
//   function(posts){
//     return _.filter(comments, function(comment){
//       return _.find(posts, function(post){
//         return comment.post_id == post.id
//       })
//     })
//   },
//   console.log
// )



_.go(
  _.where(posts, { user_id: 101 }), // 걸러내기 특화 함수
    // _.filter(posts, function(post){
    //   return post.user_id == 101;
    // }),
  _.pluck('id'), // 수집하기 특화 함수
    // _.map(function(post){
    //   return post.id;
    // }),
  function(post_ids){
    return _.filter(comments, function(comment){
      return _.contains(post_ids, comment.post_id);
    })
  },
  console.log
)

var f1 = _.pipe(posts_by, comments_by_posts);
console.log(f1({ user_id: 101 }));

// 2. 특정인의 posts에 comments를 단 친구의 이름들 뽑기
console.log('============ 2. 특정인의 posts에 comments를 단 친구의 이름들 뽑기 ============')
_.go({ user_id: 101 },
  posts_by,
  comments_by_posts,
  _.map(function(comment){
    return _.find(users, function(user){
      return user.id == comment.user_id;
    }).name
  }),
  _.uniq,
  console.log
)

var f2 = _.pipe(f1, comments_to_user_names,_.uniq)
console.log(f2({user_id: 101}));

// 3. 특정인의 posts에 comments를 단 친구들 카운트 정보
console.log('============ 3. 특정인의 posts에 comments를 단 친구들 카운트 정보 ============')
_.go({ user_id: 101 },
  posts_by,
  comments_by_posts,
  _.map(function(comment){
    return _.find(users, function(user){
      return user.id == comment.user_id;
    }).name
  }),
  _.count_by,
  console.log
)

var f3 = _.pipe(f1, comments_to_user_names, _.count_by)
console.log(f3({user_id: 101}));

// 4. 특정인이 comment를 단 posts 거르기
console.log('============ 4. 특정인이 comment를 단 posts 거르기 ============');
_.go(
  _.where(comments, { user_id: 105 }),
  _.pluck('post_id'),
  _.uniq,
  function(post_ids){
    return _.filter(posts, function(post){
      return _.contains(post_ids, post.id);
    })
  },
  console.log
)

// 5. users + posts + comments (index_by와 group_by로 효율 높이기)
console.log('============ 5. users + posts + comments (index_by와 group_by로 효율 높이기) ============');

var users2 = _.index_by(users, 'id');
function find_user_by_id(user_id){
  return users2[user_id];
}

// var comment2 = _.map(comments, function(comment){
//   // comment.user = { id: 1 }
//   // 위와 같이 직접 값을 변경하게 되면 원본 배열까지 변경하게 되어서 안됨. 해결 방법으로 extend를 사용하게 되면 `call by value` 형태로 할 수 있음
//   return _.extend({
//     user: find_user_by_id(comment.user_id)
//   }, comment)
// });

var comment2 = _.go(
  comments,
  _.map(function(comment) {
    return _.extend({
      user: find_user_by_id(comment.user_id)
    }, comment)
  }),
  _.group_by('post_id')
)

var post2 = _.map(posts, function(post){
  return _.extend({
    comments: comment2[post.id],
    user: find_user_by_id(post.user_id)
  }, post)
});

console.log('post2:',post2);
// 5.1. 특정인의 posts의 모든 coments 거르기
// 5.2. 특정인의 posts에 comments를 단 친구의 이름들 뽑기
// 5.3. 특정인의 posts에 comments를 단 친구들 카운트 정보
// 5.4. 특정인이 comment를 단 posts 거르기