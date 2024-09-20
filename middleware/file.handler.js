import fs from "node:fs"
import multer from "multer";

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        const uploadPath = (`./media/${req.body.user}/${req.body.id}-${req.body.table}`)

        cb(null, uploadPath)
    },
    filename: function(req,file,cb){
        const uploadPath = (`./media/${req.body.user}/${req.body.id}-${req.body.table}`)
        const format = file.originalname.split('.').pop()
        if(req.body.table === "menu"){
            if(!fs.existsSync(uploadPath)){
                fs.mkdirSync(uploadPath,{recursive:true})
            }
            cb(null, `main.${format}`)
        }
        else if(req.body.table === "catalogue"){
            if(!fs.existsSync(uploadPath)){
                fs.mkdirSync(uploadPath,{recursive:true})
            }
            cb(null, `${file.originalname}`)
        }
    }
})

const media = multer({storage:storage})


export {media}