const multer = require('multer');
const path = require('path');



module.exports = {
    dest: path.resolve(__dirname, '..', '..','..', 'uploads', 'thumbnails' ),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            if(file.mimetype == 'image/jpeg'){
            cb(null, path.resolve(__dirname, '..', '..', '..', 'uploads', 'thumbnails' ));
            }
            if(file.mimetype == 'image/jpg'){
                cb(null, path.resolve(__dirname, '..', '..', '..', 'uploads', 'thumbnails' ));
                }
            if(file.mimetype == 'image/png'){
                cb(null, path.resolve(__dirname, '..', '..', '..', 'uploads', 'thumbnails' ));
                }
            if(file.mimetype == 'video/mp4'){
                cb(null, path.resolve(__dirname, '..', '..', '..', 'uploads', 'videos' ));
                }
        },
        filename: (req, file, cb) =>{

            const fileName = `${Date.now()}_${file.originalname}`;

            cb(null, fileName)
        },
        
    })
}