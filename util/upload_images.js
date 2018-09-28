const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, 'uploads')
    },
    filename: (req, file, next) => {
        console.log(file)
        const ext = file.mimetype.split('/')[1];
        const filename = file.originalname.split('.')[0]
        req.imageName = filename + '.' + ext
        next(null, filename + '.' + ext)
    },
    fileFilter: (req, file, next) => {
        if(!file){
            next();
        }
        const image = file.mimetype.startsWith('/image')
        if(image){
            next(null, true)
        } else {
            console.log("Este archivo no es una imagen")
            return next()
        }
    }
})

 module.exports = multer({storage: storage})
