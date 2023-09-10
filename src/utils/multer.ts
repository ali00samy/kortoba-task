import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const fileFilter = (
    request: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
): void => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        callback(null, true)
    } else {
        callback(null, false)
    }
}

const fileStorage = multer.diskStorage({
    destination: (
        request: Request,
        file: any,
        callback: DestinationCallback
    ): void => {
        callback(null, 'uploads')
    },

    filename: (
        req: Request, 
        file: any, 
        callback: FileNameCallback
    ): void => {
        const fileName = file.originalname.split(' ').join('-');
        const extension = file.mimetype.split('/')[1];
        callback(null, `${fileName}-${Date.now()}.${extension}`)
    }
});

const upload = multer({storage:fileStorage, fileFilter: fileFilter}).any();

export default upload;