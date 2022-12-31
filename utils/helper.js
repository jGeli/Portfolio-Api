import { getVideoDurationInSeconds } from 'get-video-duration';


 export const getVideoDetails = async(urlPath) => {

    const fs = require("fs").promises;

    const buff = Buffer.alloc(100);
    const header = Buffer.from("mvhd");
    const file = await fs.open(urlPath, "r");
    const { buffer } = await file.read(buff, 0, 100, 0);

    await file.close();

    const start = buffer.indexOf(header) + 17;
    const timeScale = buffer.readUInt32BE(start);
    const duration = buffer.readUInt32BE(start + 4);

    const audioLength = Math.floor((duration / timeScale) * 1000) / 1000;

    // console.log(buffer, header, start, timeScale, duration, audioLength);
    return {buffer, header, start, timeScale, duration, audioLength}
}


export const getVideoDuration = async (filePath) => {
const fs = require('fs')

const stream = fs.createReadStream(filePath)

return getVideoDurationInSeconds(stream)

}