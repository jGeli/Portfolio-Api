// import path from "path";
import express from "express";
import dotenv from 'dotenv';
import "colors";
import router from "./routes/index.js";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";
import cors from "cors";
import path from 'path';
import fs from 'fs';

// import ErrorResponse from "./utils/errorResponse.js";
dotenv.config({path: './config/config.env'})

const PORT = process.env.PORT || 5000;


connectDB();

const app = express()
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb', extended: false }));
app.use(cors({
    origin: "*"
}))


app.get("/", function (req, res) {


    res.sendFile(process.cwd() + "/index.html");
});

app.use("/v1", router)

app.get('/v1', (req, res) => {
    res.send('Portfolio Website API! V1')
})





// app.get("/v1/video", async function (req, res) {
//     const range = req.headers.range;
//     if (!range) {
//         res.status(400).send("Requires Range header");
//     }

//     console.log(process.cwd())
//     const videoPath = path.join(process.cwd(), "assets", "vid2.mkv");
//     const videoSize = fs.statSync(videoPath).size;
//     const CHUNK_SIZE = 10 ** 6;
//     let start = Number(range.replace(/\D/g, ""));
//     let end = Math.min(start + CHUNK_SIZE, videoSize - 1);
//     // if(reqCount === 0){
//     // }

//     //  console.log(await getVideoDuration(videoPath))
    
//     const contentLength = end - start + 1;
//     const headers = {
//         "Content-Range": `bytes ${start}-${end}/${videoSize}`,
//         "Accept-Ranges": "bytes",
//         "Content-Length": contentLength,
//         "Content-Type": "video/mp4",
//     };

//     // console.log(headers)



//     res.writeHead(206, headers);
//     const videoStream = fs.createReadStream(videoPath, { start: start, end: end });
//     videoStream.pipe(res);

// });


// Serve frontend
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../frontend/build')));
  
//     app.get('*', (req, res) =>
//       res.sendFile(
//         path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
//       )
//     );
//   } else {
//     app.get('/', (req, res) => res.send('Please set to production'));
//   }

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode with port ${PORT}`.yellow.bold));

// app.use((req, res, next) => next(new ErrorResponse(404, "404 Not found!")));
app.use(errorHandler)


export default app;