//multer configs
import multer from "multer";
import fs from "fs";

/**
 * multer config for upload single file
 */
let storage = multer.diskStorage({
    destination: function (req, file, cb) {

      const path = `./src/uploads`;
      fs.mkdirSync(path, { recursive: true });
      cb(null, path);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

export default multer({storage: storage});
