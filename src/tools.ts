import ExifReader from 'exifreader';
import dayjs from 'dayjs'

interface ExifData {
  resolution: string;
  fileSize: string;
  modifyDate: string;
  name: string;
  // cameraModel: string | null;
  // gpsLatitude: number | null;
  // gpsLongitude: number | null;
}

type TAttachment = {
  "tmp_url": string;
  "name": string;
  "type": string;
  "size": number;
  "token": string;
  "timeStamp": number;
}

export async function extractExifData(attachments: TAttachment[], fetch): Promise<ExifData> {
  return new Promise(async(resolve, reject) => {
    const image = attachments.find(attachment => attachment.type.startsWith('image/'));
    
    // console.log(333333, JSON.stringify(image))
    if (!image || !image.tmp_url) {
      return null;
    }

    try {
      const response = await fetch(image.tmp_url);

      // console.log(JSON.stringify(response))
      const arrayBuffer = await response.arrayBuffer();
      const data = Buffer.from(arrayBuffer);

      const tags = ExifReader.load(data);

      // gpsLatitude: tags['GPSLatitude']?.description || null,
      // gpsLongitude: tags['GPSLongitude']?.description || null,
      // modifyDate: tags['DateTimeOriginal']?.description || null,

      const width = tags['Image Width']?.value || null;
      const height = tags['Image Height']?.value || null;
      
      const resolution = width && height ? `${width} x ${height}` : '';

      const fileSize = formatFileSize(image.size);
    
      const modifyDate = tags['DateTimeOriginal']?.description ?? dayjs(image.timeStamp).format('YYYY-MM-DD HH:mm:ss');
      
      // const cameraModel = tags['Model']?.description || null;


      // const gpsLatitude = result.tags.GPSLatitude || null;
      // const gpsLongitude = result.tags.GPSLongitude || null;

      // console.log(222222, JSON.stringify(tags))

      resolve({
        resolution,
        fileSize,
        modifyDate,
        name: image.name,
        // cameraModel,
        // gpsLatitude,
        // gpsLongitude,
      });
    } catch (error) {
      console.log('errrrrrr', error)
      reject(error);
    }
  })
}

function formatFileSize(size: number): string {
  if (size < 0 || isNaN(size)) {
    throw new Error('Invalid file size');
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let index = 0;

  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index++;
  }

  return `${size.toFixed(2)} ${units[index]}`;
}