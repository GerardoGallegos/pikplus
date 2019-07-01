const fs = require('fs')
const S3 = require('../../connections/S3')

const BUCKET = process.env.S3_BUCKET
const CLOUDFONT_HOST = process.env.CLOUDFONT_HOST

if (!CLOUDFONT_HOST) {
  console.error('Missed cloudfont Host')
  process.exit(1)
}

const uploadFile = ({ filename, filePath, mimetype, suffix, ext, folderS3 = 'designs' }) => {
  // Remove the file extension
  const _filename = filename.split('.').slice(0, -1).join('.')
  const Key = `${folderS3}/${_filename}-${suffix}${ext}`

  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(filePath)
    S3.upload({
      Key,
      Bucket: BUCKET,
      Body: stream,
      ACL: 'public-read',
      ContentType: mimetype,
      Metadata: {
        'Content-Type': mimetype
      }

    }, (err, docs) => {
      if (err) {
        return reject(err)
      }

      resolve(
        docs.Location.replace(
          'pikplus.s3.amazonaws.com',
          CLOUDFONT_HOST
        )
      )
    })
  })
}

module.exports = uploadFile
