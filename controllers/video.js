import asyncHandler from "express-async-handler";
import AWS from 'aws-sdk';
import fs from 'fs';  
import path from 'path';

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,  /* required */ 
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, /* required */  
    Bucket: "content-file-upload"     /* required */    
  });


export const getVideo = asyncHandler(async (req, res) => {
    const range = req.headers.range;
    console.log('get vid')
    try {
 
  
    if (!range) {
        res.status(400).send("Requires Range header");
    }


    const params = {Bucket: 'content-file-upload', Key: '2022-12-30 09-51-51.mkv'}
    const videoPath = path.join(process.cwd(), "assets", params.Key);


    if (!fs.existsSync(videoPath)) {
        //file exists
    // var s3Stream = s3.getObject(params).createReadStream();
    // console.log(s3Stream)
    console.log('doesnt exist')
    var fileStream = fs.createWriteStream(videoPath);
    var s3Stream = s3.getObject(params).createReadStream();
    
    // Listen for errors returned by the service
    s3Stream.on('error', function(err) {
        // NoSuchKey: The specified key does not exist
        console.error(err);
    });
    
    s3Stream.pipe(fileStream).on('error', function(err) {
        // capture any errors that occur when writing data to the file
        console.error('File Stream:', err);
    }).on('close', function() {

        console.log('Done.');

    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 10 ** 6;
    let start = Number(range.replace(/\D/g, ""));
    let end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    // if(reqCount === 0){
    // }

    //  console.log(await getVideoDuration(videoPath))
    
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };

    // console.log(headers)



    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start: start, end: end });
    videoStream.pipe(res);
});
} else {
    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 10 ** 6;
    let start = Number(range.replace(/\D/g, ""));
    let end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    // if(reqCount === 0){
    // }

    //  console.log(await getVideoDuration(videoPath))
    
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };

    // console.log(headers)



    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start: start, end: end });
     videoStream.pipe(res);
}

} catch (err){
    console.log(err)
    res.status(400).send(err);
}

})