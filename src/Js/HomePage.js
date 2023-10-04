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
  let row = '<option disabled value="">Chọn</option>';
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
  $("#city").val(selectedCity).filter("option[value='" + selectedCity + "']").attr("selected", true);

  // Xử lý sự kiện thay đổi của thẻ <select>
  $("#city").change(() => {
    selectedCity = $("#city option:selected").text();
    $("#agency").text(selectedCity).attr("data-agency", selectedCity);
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
    item.classList.remove('inactive');
    item.classList.add('active');
  });
});

