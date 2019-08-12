const fs = require('fs')

module.exports = {
  devServer: {
    https: {
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem'),
    },
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
}
