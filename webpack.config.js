const slsw = require('serverless-webpack');
const webpack = require('webpack')
const path = require('path')
const devS3 = require(path.resolve(__dirname, 'src/core/S3')).devS3

let s3Name = 's3'
let bucketName = 'my-production-bucket'
const logDirectory = process.env.LOG_DIRECTORY? process.env.LOG_DIRECTORY : process.env.ENV === 'development'? path.resolve(__dirname, 'log') : null
const logLevel = process.env.LOG_LEVEL? process.env.LOG_LEVEL : 'warn'

if (process.env.ENV === 'development') {
    s3Name = 'devS3'
    bucketName = 'local-bucket'

    devS3.headBucket({Bucket:bucketName}, (error, data) => {
        if (error) {
            console.log('Development bucket "'+bucketName+'" does not exist.')
            console.log('')
            devS3.createBucket({Bucket: bucketName}, (error, data) => {
                if (error) {
                    console.log('Could not create the development bucket: '+bucketName+'')
                } else {
                    console.log('Development bucket "'+bucketName+'" created.')
                }
            })
        } else {
            console.log('Development bucket "'+bucketName+'" exists.')
        }
    })
}

module.exports = {
    entry: slsw.lib.entries,
    target: 'node',
    mode: 'production',
    resolve: {
        alias: {
            '-': path.resolve(__dirname, 'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: ['transform-runtime']
                    }
                }
            }
        ]
    },
    plugins:[
        new webpack.ProvidePlugin({
            s3: [path.resolve(__dirname, 'src/core/S3'), s3Name]
        }),
        new webpack.DefinePlugin({
            "process.env.ENV": JSON.stringify(process.env.ENV),
            "process.env.BUCKET": JSON.stringify(bucketName),
            "process.env.LOG_LEVEL": JSON.stringify(logLevel),
            "process.env.LOG_DIRECTORY": JSON.stringify(logDirectory)
        })
    ]
}