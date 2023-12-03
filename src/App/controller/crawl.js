const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

class crawl {
  async crawlData(req, res) {
    console.log(req.body);

    function insertDataIntoProductInfo(item, categoryId) {}

    try {
      // Lấy các thông tin từ Query Params
      const {
        limit,
        include,
        aggregations,
        version,
        trackity_id,
        page,
        urlKey,
      } = req.body;

      // Khởi tạo một mảng để lưu trữ dữ liệu từ các trang
      const data = [];

      // Lặp qua từ trang 1 đến trang 'page'
      for (let index = 1; index <= page; index++) {
        const apiUrl = `https://tiki.vn/api/v2/products?limit=${limit}&include=${include}&aggregations=${aggregations}&version=${version}&trackity_id=${trackity_id}&q=${urlKey}`;
        // Gọi API để lấy dữ liệu từ trang hiện tại
        const response = await axios.get(apiUrl);

        const fullData = response.data.data;
        // // Duyệt qua tất cả các mục trong fullData và thêm vào bảng productInfo
        // fullData.forEach(async (item) => {
        //   await insertDataIntoProductInfo(item, urlKey);
        // });
        res.json(fullData);
      }
    } catch (error) {
      // Xử lý lỗi khi yêu cầu thất bại
      if (error.response) {
        // Lỗi trả về từ máy chủ với mã trạng thái
        console.error(
          "Lỗi máy chủ:",
          error.response.status,
          error.response.statusText
        );
      } else if (error.request) {
        // Lỗi không có phản hồi từ máy chủ
        console.error("Lỗi yêu cầu:", error.request);
      } else {
        // Lỗi xảy ra trong quá trình xử lý yêu cầu
        console.error("Lỗi xử lý yêu cầu:", error.message);
      }
    }
  }
}

module.exports = new crawl();
