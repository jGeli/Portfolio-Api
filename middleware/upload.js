
// Require multer for image uploading and multers3 to upload directly to s3
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import { S3Client } from '@aws-sdk/client-s3';
// Configure aws s3 SDK (update authentication)

  console.log(process.env.AWS_ACCESS_KEY_ID)
  console.log(process.env.AWS_SECRET_ACCESS_KEY)

  const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
}

// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/s3clientconfig.html
const config = {
    region: 'us-east-1',
    credentials,
}

//   aws.config.update({
//     secretAccessKey: process.env.AWS_ACCESS_KEY_ID,
//     accessKeyId: process.env.AWS_SECRET_ACCESS_KEY,
//     region: 'us-east-1'
// });

var s3 = new S3Client(config);

// Unique name of aws s3 bucket created
const myBucket = 'content-file-upload';

// Multer upload (Use multer-s3 to save directly to AWS instead of locally)
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: myBucket,
    // Set public read permissions
    // Auto detect contet type
    contentType: multerS3.AUTO_CONTENT_TYPE, 
    // Set key/ filename as original uploaded name
    key: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
})

export default  upload