const AWS = require('aws-sdk')

AWS.config.accessKeyId = process.env.AWS_KEY
AWS.config.secretAccessKey = process.env.AWS_SECRET

module.exports = new AWS.S3()
