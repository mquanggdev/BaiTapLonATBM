const streamUpload = require("./streamUpload.helper");
module.exports.saveQr = async (qrLink) => {
    try{
        let qrUrl = qrLink;
        if (qrUrl.startsWith('data:image/png;base64,')) {
            const base64Data = qrUrl.replace(/^data:image\/png;base64,/, "");
            const buffer = Buffer.from(base64Data, 'base64');
            let uploadResult;
            uploadResult = await streamUpload.streamUpload(buffer);
            qrUrl = uploadResult.url;
            
            return qrUrl ;
        }
    }catch(e){
       console.log(e);
       
    }
}