


import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
const storage = new GridFsStorage({
    url: 'mongodb://127.0.0.1:27017/blogusers',   
    file:(req,file)=>{
        const match=["image/png","image/jpg"];
        if(match.indexOf(file.mimiType)=== -1){
            return `${Date.now()}-blog-${file.originalname}`
        }
        return {
            bucketname:"photos",
            filename:`${Date.now()}-blog-${file.originalname}`
        }
    }
});
export default multer({storage});


