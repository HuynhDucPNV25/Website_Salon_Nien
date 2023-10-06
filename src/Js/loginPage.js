//Dữ liệu thử
let users = [
    {
        phoneNumber: "0945327794",
        password: "phatdeptrai"
    },
    {
        phoneNumber: "3251356112",
        password: "ádjuadsad"
    }
];

function login() {
    let phoneNumber = document.getElementById("inp-phoneNumber").value;
    let password = document.getElementById("inp-password").value;

    var foundUser = users.find(function (user) {//Tìm kiếm và kiểm tra tài khoản mật khẩu
        return user.phoneNumber === phoneNumber && user.password === password;
    });

    if (foundUser) {// Trả về kết quả đúng 
        document.getElementById("out").innerHTML=("Đăng nhập thành công!");
        setTimeout(function () {
            window.location.href = ""; //Đăng nhập thành công thì reset trang thành giao diện ngườI dùng hoặc admin
        }, 5000);
    } else {//Trả về kết quả sai
        // Tài khoản hoặc mật khẩu không chính xác
        alert("Tài khoản hoặc mật khẩu không đúng!");
        window.location.href = ""; //Nếu khônng đúng thì sẽ reset lại page để nhập lại tk mk
    }
}