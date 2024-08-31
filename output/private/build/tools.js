"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractExifData = extractExifData;
const exifreader_1 = __importDefault(require("exifreader"));
const dayjs_1 = __importDefault(require("dayjs"));
async function extractExifData(attachments, fetch) {
    return new Promise(async (resolve, reject) => {
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
            const tags = exifreader_1.default.load(data);
            // gpsLatitude: tags['GPSLatitude']?.description || null,
            // gpsLongitude: tags['GPSLongitude']?.description || null,
            // modifyDate: tags['DateTimeOriginal']?.description || null,
            const width = tags['Image Width']?.value || null;
            const height = tags['Image Height']?.value || null;
            const resolution = width && height ? `${width} x ${height}` : '';
            const fileSize = formatFileSize(image.size);
            const modifyDate = tags['DateTimeOriginal']?.description ?? (0, dayjs_1.default)(image.timeStamp).format('YYYY-MM-DD HH:mm:ss');
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
        }
        catch (error) {
            console.log('errrrrrr', error);
            reject(error);
        }
    });
}
function formatFileSize(size) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdG9vbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFzQkEsMENBcURDO0FBM0VELDREQUFvQztBQUNwQyxrREFBeUI7QUFxQmxCLEtBQUssVUFBVSxlQUFlLENBQUMsV0FBMEIsRUFBRSxLQUFLO0lBQ3JFLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUMxQyxNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUVuRiw2Q0FBNkM7UUFDN0MsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM3QixPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7UUFFRCxJQUFJLENBQUM7WUFDSCxNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFNUMsd0NBQXdDO1lBQ3hDLE1BQU0sV0FBVyxHQUFHLE1BQU0sUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2pELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFdEMsTUFBTSxJQUFJLEdBQUcsb0JBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFbkMseURBQXlEO1lBQ3pELDJEQUEyRDtZQUMzRCw2REFBNkQ7WUFFN0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEtBQUssSUFBSSxJQUFJLENBQUM7WUFDakQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEtBQUssSUFBSSxJQUFJLENBQUM7WUFFbkQsTUFBTSxVQUFVLEdBQUcsS0FBSyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLE1BQU0sTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUVqRSxNQUFNLFFBQVEsR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTVDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLFdBQVcsSUFBSSxJQUFBLGVBQUssRUFBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFFakgsMERBQTBEO1lBRzFELHVEQUF1RDtZQUN2RCx5REFBeUQ7WUFFekQsNENBQTRDO1lBRTVDLE9BQU8sQ0FBQztnQkFDTixVQUFVO2dCQUNWLFFBQVE7Z0JBQ1IsVUFBVTtnQkFDVixJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUk7Z0JBQ2hCLGVBQWU7Z0JBQ2YsZUFBZTtnQkFDZixnQkFBZ0I7YUFDakIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUM5QixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEIsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQUVELFNBQVMsY0FBYyxDQUFDLElBQVk7SUFDbEMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsTUFBTSxLQUFLLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBRWQsT0FBTyxJQUFJLElBQUksSUFBSSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQ2hELElBQUksSUFBSSxJQUFJLENBQUM7UUFDYixLQUFLLEVBQUUsQ0FBQztJQUNWLENBQUM7SUFFRCxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztBQUM5QyxDQUFDIn0=