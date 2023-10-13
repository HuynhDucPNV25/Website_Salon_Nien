const hairDataUrl = "http://localhost:4002/hairs";

// Lấy thẻ body
const body = document.getElementById('DetailHair');

// Tạo một đối tượng div để chứa mã HTML
const div = document.createElement('div');

// Lấy dữ liệu từ mock API
fetch(hairDataUrl)
  .then(response => response.json())
  .then(data => {
    // Lấy thẻ img để thay đổi hình ảnh
    const img = div.querySelector('#Hair-Model-Details-img img');
    
    // Lấy các thông tin từ dữ liệu và thay đổi mã HTML theo từng phần tử
    data.forEach((hair) => {
      div.innerHTML += `
        <div class="container" id="Hair-Model-Details">
          <div class="row">
            <div class="col-md-4" id="Hair-Model-Details-img">
              <img src="${hair.img}" alt="${hair.name}">
            </div>
            <div class="col-md-8" id="Hair-Model-Details-text">
              <h3 class="Hair-Model-Details-title">Mẫu tóc: ${hair.name}</h3>
              <h5 class="Hair-Model-Details-shop">Tiệm: ${hair.city}</h5>
              <p>${hair.describe}</p>
              <p>Dịch vụ kèm theo: gội đầu</p>
              <p>Địa chỉ: ${hair.address}</p>
              <p class="detail-hair-price">Giá: <span class="strike-through" id="price-star">${hair.price}VNĐ</span></p>
              <p class="detail-hair-price">Chỉ: ${hair.discount}VNĐ</p>
              <div>
                <button type="button" class="btn btn-light mt-2" onclick="Calender()">Đặt lịch</button>
              </div>
            </div>
          </div>      
        </div>
        <div class="col-md-12 mt-4" id="Hair-Model-Details-texts-feedback">
          <h3>Chi tiết mẫu tóc</h3>
          <p>${hair.describe}</p>
        </div>
        <div class="col-md-12" id="Hair-Model-Details-icon">
          <h3>Đánh giá mẫu tóc</h3>
          <div class="col-md-12" id="Hair-Model-Details-star">
            <p>0.0/5</p>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <p class="Evaluate">(0 đánh giá)</p>
            <p>Hãy đánh giá để có trải nghiệm tốt hơn</p>
          </div>
        </div>
      `;
      // Thay đổi hình ảnh
      img.src = hair.img;
      img.alt = hair.name;
    });
  })
  .catch(error => console.log(error));

// Thêm đối tượng div vào thẻ body
body.appendChild(div);
