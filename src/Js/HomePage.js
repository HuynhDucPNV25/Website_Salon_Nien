
const host = "https://provinces.open-api.vn/api/";

// Hàm gọi API và hiển thị dữ liệu
const callAPI = () => {
  axios.get(host + "?depth=1")
    .then((response) => {
      renderData(response.data, "city");
      let selectedCity = localStorage.getItem("selectedCity") || "Thành phố Hà Nội";
      $("#city").val(selectedCity).filter("option[value='" + selectedCity + "']").attr("selected", true);
    });
};

// Hàm hiển thị dữ liệu vào thẻ <select>
const renderData = (array, select) => {
  let row = '';
  array.forEach(element => {
    row += `<option data-id="${element.code}" value="${element.name}">${element.name}</option>`;
  });
  $("#" + select).html(row);
};

$(document).ready(function() {
  // Lấy thành phố được chọn từ localStorage hoặc giá trị mặc định
  let selectedCity = localStorage.getItem("selectedCity") || "Thành phố Hà Nội";

  // Khởi tạo thẻ <select> và văn bản của thành phố
  $("#agency").text(selectedCity);
  $("#city").val(selectedCity);
  $("#topSalon").text("Salon tại "+(selectedCity));
  $("#topMauToc").text("Tất cả mẫu tóc ");
  // Xử lý sự kiện thay đổi của thẻ <select>
  $("#city").change(() => {
    selectedCity = $("#city option:selected").text();
    $("#agency").text(selectedCity).attr("data-agency", selectedCity);
    $("#topSalon").text(("Salon tại ")+selectedCity).attr("data-agency", selectedCity);
    $("#topMauToc").text(("Tất cả mẫu tóc ")).attr("data-agency", selectedCity);
    localStorage.setItem("selectedCity", selectedCity);
  });

  // Xử lý sự kiện nhấp chuột vào thẻ <select> để mở hoặc đóng dropdown
  $("#city").click(() => {
    $('.dropdown-toggle').toggleClass('show');
  });

  // Gọi API để hiển thị dữ liệu
  callAPI();
});

// Lấy danh sách các item
const items = document.querySelectorAll('.nav-item');

items.forEach(item => {
  item.addEventListener('click', () => {
    // Xóa lớp "active" từ item hiện tại
    const activeItem = document.querySelector('.nav-item.active');
    activeItem.classList.remove('active');

    // Thêm lớp "inactive" cho các item còn lại
    items.forEach(item => {
      if (item !== activeItem) {
        item.classList.add('inactive');
      }
    });

    // Thêm lớp "active" cho item được nhấp chuột
    item.classList.add('active');
    item.classList.remove('inactive');
  });
});
//......... 


const slideData = [
  { imageSrc: "../../image/pd1.png" },
  { imageSrc: "../../image/pd2.png" },
  { imageSrc: "../../image/GGG 2.png" }
];

// Lấy container trong carousel để chứa các slide
const carouselInner = document.getElementById("carouselInner");

// Tạo và thêm các slide vào container
slideData.forEach(function(slide, index) {
  // Tạo phần tử slide
  const slideElement = document.createElement("div");
  slideElement.classList.add("carousel-item");
  if (index === 0) {
    slideElement.classList.add("active");
  }
  slideElement.innerHTML = `
    <div>
      <img src="${slide.imageSrc}" alt="">
    </div>
  `;
  
  // Thêm slide vào container
  carouselInner.appendChild(slideElement);
});

// ................Data-Salon............
const dataSalon = "https://65194cc9818c4e98ac603f1c.mockapi.io/api/salons";
const salonC = document.querySelector('#salonContainer');

const dataHair = "https://65194cc9818c4e98ac603f1c.mockapi.io/api/hairModels";
const hairC = document.querySelector('#hairContainer');


async function fetchDataSalon() {
  try {
    const responseS = await axios.get(dataSalon);
    const dataS = responseS.data;

    const selectedCity = $("#agency").text();

    const filteredDataSalon = dataS.filter(data => data.address === selectedCity);

    // Tiếp tục xử lý dữ liệu lọc được (filteredDataSalon) ở đây
    if (filteredDataSalon.length === 0) {
      const div = document.createElement('div');
      div.classList.add('col');
      div.innerHTML = `
      <div class="card">
          <center>
          <h2>Chưa có Salon tại chi nhánh này</h2>
        </center>
        </div>
        
      `;
      salonC.appendChild(div);
    } else {
    filteredDataSalon.forEach(salon => {
      const div = document.createElement('div');
      div.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'col-12');
      div.innerHTML = `
        <a href="/src/html/Hair-Model-Details.html">
          <div class="card" >
            <img style="max-height:190.05px;" src="${salon.image}" alt="${salon.name}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title" style="color: #CC2C2C;" >${salon.name}</h5>
              <p class="card-text" style="color: gray";>Địa Chỉ: ${salon.address}</p>
            </div>
          </div><br>
        </a>
        
      `;
      salonC.appendChild(div);
    });}
  } catch (error) {
    console.error(error);
  }
}

$("#city").change(() => {
  const selectedCity = $("#city option:selected").text();
  $("#agency").text(selectedCity).attr("data-agency", selectedCity);
  $("#topSalon").text(("Top salon tại ") + selectedCity).attr("data-agency", selectedCity);
  $("#topMauToc").text(("Top mẫu tóc hót tại ") + selectedCity).attr("data-agency", selectedCity);
  localStorage.setItem("selectedCity", selectedCity);
  while (salonC.firstChild) {
    salonC.firstChild.remove();

  }
  fetchDataSalon();
});
fetchDataSalon();

// ............................................................
async function fetchDataHair() {
  try {
    const response = await fetch(dataHair);
    const data = await response.json();
    const filteredDataHair = data.filter(hair => hair.price !== null);
    filteredDataHair.forEach(hair => {
      const div = document.createElement('div');
      div.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'col-12');
      div.innerHTML = `
        <a href="/src/html/Hair-Model-Details.html">
          <div class="card">
            <img style="max-height:190.05px;" src="${hair.image}" alt="${hair.name}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title" style="color: #CC2C2C;">${hair.name}</h5>
              <p class="card-text" style="color: gray;">Địa chỉ: ${hair.address}</p>
              <p class="card-text" style="color: #CC2C2C;">Giá: ${hair.price} VNĐ</p>
            </div>
          </div><br>
        </a>
      `;
      hairC.appendChild(div);
    });
  } catch (error) {
    console.error(error);
  }
}
fetchDataHair();


