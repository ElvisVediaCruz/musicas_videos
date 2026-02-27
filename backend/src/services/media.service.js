import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import ffprobePath from "ffprobe-static";
import { promisify } from "util";
import { format } from "path";

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath.path);
const ffprobe = promisify(ffmpeg.ffprobe);

export const getMediaMetadata = async (filePath) => {
  const metadata = await ffprobe(filePath);
  return {
    metadata
  };
};