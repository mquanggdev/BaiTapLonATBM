const Product = require("../../model/product.model");
const excelJS = require("exceljs");
const axios = require('axios');

const exportExcel = async (req, res) => {
    try {
        const products = await Product.find({});
        
        const workbook = new excelJS.Workbook(); 
        const worksheet = workbook.addWorksheet("products");
        
        // Define columns in the worksheet 
        worksheet.columns = [ 
            { header: "Title", key: "title", width: 15 }, 
            { header: "Description", key: "description", width: 30 }, 
            { header: "Price", key: "price", width: 15 }, 
            { header: "DiscountPercent", key: "discountPercentage", width: 15 },
            { header: "Stock", key: "stock", width: 15 },
            { header: "Thumbnail", key: "thumbnail", width: 20 },
            { header: "QrLink", key: "qrLink", width: 20 },
        ];

        // Tải hình ảnh từ URL và lưu vào buffer
        const loadImageBuffer = async (url) => {
            const response = await axios.get(url, { responseType: 'arraybuffer' });
            return response.data;
        };

        for (const product of products) { 
            const row = worksheet.addRow({
                title: product.title,
                description: product.description,
                price: product.price,
                discountPercentage: product.discountPercentage,
                stock: product.stock,
                thumbnail: product.thumbnail || "",
                qrLink: product.qrLink || ""
            });
            row.height = 100;
            // Thêm hình ảnh thumbnail nếu có
            if (product.thumbnail) { 
                const imageBuffer = await loadImageBuffer(product.thumbnail);
                
                const imageId = workbook.addImage({
                    buffer: imageBuffer,
                    extension: 'png'
                });

                worksheet.addImage(imageId, {
                    tl: { col: 5, row: row.number - 1 },
                    ext: { width: 100, height: 100 } 
                });
            }

            // Thêm hình ảnh QR Link nếu có
            if (product.qrLink) { 
                const imageBuffer = await loadImageBuffer(product.qrLink);
                const imageId = workbook.addImage({
                    buffer: imageBuffer,
                    extension: 'png' 
                });
                worksheet.addImage(imageId, {
                    tl: { col: 6, row: row.number - 1 },
                    ext: { width: 100, height: 100 }
                });
            }
        }
        
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=product.xlsx");
        
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error exporting to Excel:', error);
        res.status(500).send('An error occurred while exporting to Excel.');
    }
};

module.exports.index = exportExcel;
