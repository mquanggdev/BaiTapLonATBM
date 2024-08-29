const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});

module.exports.uploadSingle = (req, res, next) => {
    if(req.file){
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                  (error, result) => {
                    if (result) {
                      resolve(result);
                    } else {
                      reject(error);
                    }
                  }
                );
    
              streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };
    
        async function upload(req) {
            let result = await streamUpload(req);
            req.body[req.file.fieldname] = result.url
            next();
        }
    
        upload(req);
    }
   else{
    next();
   }
}
module.exports.uploadMultiple = (req, res, next) => {
    if (req.files && Object.keys(req.files).length > 0) {
        const uploadPromises = [];

        // Duyệt qua từng trường (field) trong req.files
        Object.entries(req.files).forEach(([fieldname, files]) => {
            files.forEach((file) => {
                let streamUpload = () => {
                    return new Promise((resolve, reject) => {
                        const stream = cloudinary.uploader.upload_stream((error, result) => {
                            if (result) {
                                resolve({ fieldname, url: result.url });
                            } else {
                                reject(error);
                            }
                        });

                        streamifier.createReadStream(file.buffer).pipe(stream);
                    });
                };

                // Đẩy lời hứa upload vào danh sách uploadPromises
                uploadPromises.push(streamUpload());
            });
        });

        // Chờ tất cả các lời hứa upload hoàn tất
        Promise.all(uploadPromises)
            .then((results) => {
                // Lưu trữ kết quả upload vào req.body
                results.forEach(({ fieldname, url }) => {
                    req.body[fieldname] = req.body[fieldname] || [];
                    req.body[fieldname].push(url);
                });
                next();
            })
            .catch((error) => {
                console.error('Error uploading files:', error);
                next(error); // Truyền lỗi cho middleware tiếp theo
            });
    } else {
        next();
    }
};
