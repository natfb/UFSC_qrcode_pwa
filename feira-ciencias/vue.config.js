const { defineConfig } = require('@vue/cli-service')
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const FRONTEND_PORT = process.env.FRONTEND_PORT || 8080;

module.exports = defineConfig(
{
  transpileDependencies: true,

  devServer: {
    // https: {
    //   key: fs.readFileSync(path.join(__dirname, 'localhost-key.pem')),
    //   cert: fs.readFileSync(path.join(__dirname, 'localhost.pem')),
    // },
    host: '0.0.0.0',
    port: FRONTEND_PORT,      
    allowedHosts: 'all',
  }
}
)
