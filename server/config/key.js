if (process.env.NODE_ENV === 'production') {
  // production 모드에서 작업 중인 경우
  module.exports = require('./prod');
} else {
  // 로컬 모드에서 개발 중인 경우
    module.exports = require('./dev');
}