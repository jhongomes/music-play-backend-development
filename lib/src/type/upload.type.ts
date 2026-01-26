import { UploadEnum } from "../enum/upload.enum";

export const UPLOAD_PROFILES = {
  [UploadEnum.MUSIC]: {
    folder: process.env.AWS_FOLDER_MUSIC,
    maxSizeMB: 10*1024*1024,
    queueSize: 6
  },
  [UploadEnum.COVER]: {
    folder: process.env.AWS_FOLDER_COVER,
    maxSizeMB: 5*1024*1024,
    queueSize: 4
  },
  [UploadEnum.VIDEO]: {
    folder: process.env.AWS_FOLDER_VIDEO,
    maxSizeMB: 10*1024*1024,
    queueSize: 6
  },
  [UploadEnum.PROFILE]: {
    folder: process.env.AWS_FOLDER_PROFILE,
    maxSizeMB: 5,
    queueSize: 4
  }
};