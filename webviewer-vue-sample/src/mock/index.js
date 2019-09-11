import Mock from 'mockjs'
import loginAPI from './login'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
var mock = Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)

/*Mock.mock('http://localhost:8080/login', function () {
    return Mock.mock({
        success: true,
        msg: '',
        obj: loginAPI.loginByUsername
    })
});*/
export default mock
