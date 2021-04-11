/**
 * ESLint 代码规范效验工具的配置文件
 * 注意：该文件如果修改必须重启才能生效
 */

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  // 自定义代码效验规范
  rules: {
    // process.env.NODE_ENV  === 'production ' 可以用来判定代码运行的环境
    // 开发模式：npm run serve 启动开发模式
    // 正式发布部署到线上： npm run build
    // process.env.NODE_ENV 有两种值
    //    production 生产环境
    //    development 开发环境
    // no-console 是不允许代码中出现 console.xxx 之类的代码， 例如 console.log
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unuserd-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-unuserd-vars': 'off' // 关闭这个规则验证
    semi: ['error', 'always'] // 配置正确 没有生效   就删除 D:\vue-project\toutiao-admin\node_modules\.cache 文件
  }
};
