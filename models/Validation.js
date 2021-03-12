var Validation = function () {
    this.kiemTraRong = function (selector, name, error_selector) {

        if (document.querySelector(selector).value.trim() === '') {
            document.querySelector(error_selector).innerHTML = name + 'không được bỏ trống !';
            return false;
        }

        document.querySelector(error_selector).innerHTML = '';
        return true;

    }
    this.kiemTraTatCaSo = function (selector, name, error_selector) {
        var regex = /^[0-9]+$/;
        //Kiểm tra đúng định dạng return true
        if (regex.test(document.querySelector(selector).value)) {
            document.querySelector(error_selector).innerHTML = '';
            return true;
        }

        document.querySelector(error_selector).innerHTML = name + ' phải là số!';
        return false;
    }
    this.kiemTraDoDai = function (selector, name, error_selector, minLength, maxLength) {
        var value = document.querySelector(selector).value;
        if (value.length < minLength || value.length > maxLength) {
            document.querySelector(error_selector).innerHTML = `${name} từ ${minLength} đến ${maxLength} ký tự`;
            return false;
        }
        document.querySelector(error_selector).innerHTML = '';
        return true;
    }
  
    this.kiemTraChu = function (selector, name, error_selector) {
        var regex =/^[A-Za-z]+$/;
        //Kiểm tra đúng định dạng return true
        if (regex.test(document.querySelector(selector).value)) {
            document.querySelector(error_selector).innerHTML = '';
            return true;
        }
        document.querySelector(error_selector).innerHTML = name + ' phải là chữ!';
        return false;
    }
    this.kiemTraLuong = function (selector, name, error_selector, minLuong, maxLuong) {
        var luong = document.querySelector(selector).value;
        if (luong < minLuong || luong> maxLuong) {
            document.querySelector(error_selector).innerHTML = `${name} từ ${minLuong} - ${maxLuong} VND`;
            return false;
        }
        document.querySelector(error_selector).innerHTML = '';
        return true;
    }
    this.kiemTraSoGioLam = function (selector, name, error_selector, minTime, maxTime) {
        var time = document.querySelector(selector).value;
        if (time < minTime || time> maxTime) {
            document.querySelector(error_selector).innerHTML = `${name} từ ${minTime} - ${maxTime} giờ`;
            return false;
        }
        document.querySelector(error_selector).innerHTML = '';
        return true;
    }
}