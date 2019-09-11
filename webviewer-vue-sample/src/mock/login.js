

const userMap = {
  admin: {
    roles: ['admin'],
    permissionTree: 'all',
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    roles: ['editor'],
    permissionTree: [
      {
        path: '/department',
        children: [
          { path: 'index' },
          { path: 'personnel' }
        ]
      },
      {
        path: '/car',
        children: [
          { path: 'brandList' },
          { path: 'seriesList' },
          { path: 'yearList' }
        ]
      }
    ],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}
export default {
  loginByUsername: config => {
    const { loginName } = JSON.parse(config)
    return userMap[loginName]
  }
}
