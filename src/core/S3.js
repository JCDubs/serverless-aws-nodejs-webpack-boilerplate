const AWS = require('aws-sdk')
// S3 instance for production DEFAULT
module.exports.s3 = new AWS.S3()
// S3 instance for production development
module.exports.devS3 = new AWS.S3({s3ForcePathStyle: true, endpoint: new AWS.Endpoint('http://localhost:8000')})