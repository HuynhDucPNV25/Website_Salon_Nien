let data = []
function register(){
    let phoneNumber = document.getElementById("inp-phoneNumber").value;
    let password = document.getElementById("inp-password").value;
    let password2 = document.getElementById("inp-password2").value;
    if(phoneNumber != null && password != null && password2 === password){
        data.push(phoneNumber);
        data.push(password);
        localStorage.getItem("listAccount",JSON.stringify(data));
        alert("Bạn đã đăng kí thành công!");
        setTimeout(function () {
            window.location.href = ""; //Đăng nhập thành công thì reset trang thành giao diện ngườI dùng hoặc admin
        }, 3000);
        window.location.href = "http://127.0.0.1:5501/loginPage.html";
    } else {//Trả về kết quả sai
        document.getElementById("out").innerHTML=("Mật khẩu không khớp!");
    }
}