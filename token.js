// token作用
// 1.防止表单重复提交
// 2.用来身份验证，数据隐蔽
// 3.csrf攻击 （跨站点请求伪造）

// 使用基于 Token 的身份验证方法，在服务端不需要存储用户的登录记录。大概的流程是这样的：

// 客户端使用用户名跟密码请求登录
// 服务端收到请求，去验证用户名与密码
// 验证成功后，服务端会签发一个 Token，再把这个 Token 发送给客户端
// 客户端收到 Token 以后可以把它存储起来，比如放在 Cookie 里或者 Local Storage 里
// 客户端每次向服务端请求资源的时候需要带着服务端签发的 Token
// 服务端收到请求，然后去验证客户端请求里面带着的 Token，如果验证成功，就向客户端返回请求的数据


// 生成token值
// 安装 $ cnpm install jsonwebtoken -S

var jwt = require("jsonwebtoken");

// Token数据-存储用户信息
const payload = {
    name:"zhangsan",
    isAdmin:true,
    id:"12312321434234"
}
// 密钥
const secret = "iloveyoumeinv";
// 生成令牌
// const token = jwt.sign(payload,secret);
// console.log(token);
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiemhhbmdzYW4iLCJpc0FkbWluIjp0cnVlLCJpZCI6IjEyMzEyMzIxNDM0MjM0IiwiaWF0IjoxNTUxNzc3Mzk0fQ.rCcCb_1gAGUuxkT9Z64JUR2RePFE8FMfeeGP4FWXUnM

// 验证token值
var tokendata = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiemhhbmdzYW4iLCJpc0FkbWluIjp0cnVlLCJpZCI6IjEyMzEyMzIxNDM0MjM0IiwiaWF0IjoxNTUxNzc3NDUxfQ.9g5uFeLCySqDCWewQJcrzasqm89XdlalltCg-8evCKY";
var decoded = jwt.verify(tokendata,secret);
console.log(decoded);
// { name: 'zhangsan',
//   isAdmin: true,
//   id: '12312321434234',
//   iat: 1551777451 }