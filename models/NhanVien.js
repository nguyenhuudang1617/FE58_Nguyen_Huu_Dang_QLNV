//Lưu ý để phân biệt class (lớp đối tượng hay gọi là prototype) thì Dev thường hay viết tên hàm này in hoa các chữ cái đầu tiên của hàm
var NhanVien = function (maNV, tenNV, chucVu, heSo, luongCB, soGioLam) {
    this.maNhanVien = maNV;
    this.tenNhanVien = tenNV;
    this.chucVu = chucVu;
    this.heSoChucVu = heSo;
    this.luongCoBan = luongCB;
    this.soGioLamTrongThang = soGioLam;
    //Các giá trị tính toán được thì không đưa vào lưu trữ 
    this.tinhLuongNhanVien = function () {
        var tongLuong = this.luongCoBan * this.heSoChucVu;
        return tongLuong;
    }

    this.xepLoaiNhanVien = function () {
        var ketQua = '';
        //if else
        if (this.soGioLamTrongThang > 120) {
            ketQua = 'Nhân viên xuất sắc';
        } else if (this.soGioLamTrongThang > 100 && this.soGioLamTrongThang <= 120) {
            ketQua = 'Nhân viên giỏi';
        } else if (this.soGioLamTrongThang > 80 && this.soGioLamTrongThang <= 100) {
            ketQua = 'Nhân viên khá';
        } else if (this.soGioLamTrongThang > 50 && this.soGioLamTrongThang <= 80) {
            ketQua = 'Nhân viên trung bình';
        } else {
            ketQua = 'Nhân viên yếu kém'
        }
        return ketQua;
    }
}