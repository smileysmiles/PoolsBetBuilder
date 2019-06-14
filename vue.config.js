const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
//const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const CompressionPlugin = require('compression-webpack-plugin');

var path = require('path');

module.exports={
    configureWebpack:{
        plugins:[
            new MomentLocalesPlugin(),
            new CompressionPlugin()        
        ]
     },
    //  devServer: {
    //      contentBase: path.join(__dirname, 'dist'),
    //      compress: true,
    //      port: 9000
    //  }
}