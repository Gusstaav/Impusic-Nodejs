const multer = require('multer');
const path = require('path');



module.exports = {
    dest: path.resolve(__dirname, '..', '..','..', 'images', 'banners'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            if(file.fieldname == 'banner'){
            cb(null, path.resolve(__dirname, '..', '..', '..', 'images', 'banners'));
            }
            if(file.fieldname == 'imagePerfil'){
                cb(null, path.resolve(__dirname, '..', '..', '..', 'images', 'perfil' ));
                }
                
        },
        filename: (req, file, cb) =>{

            const fileName = `${Date.now()}_${file.originalname}`;

            cb(null, fileName)
        },
        
    })
}