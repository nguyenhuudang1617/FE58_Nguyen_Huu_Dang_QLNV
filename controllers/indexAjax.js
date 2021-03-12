var arrNhanVien = [];
var validate = new Validation();
var renderTable = function (arrNhanVien) {
    var content = '';
    for (var i = 0; i < arrNhanVien.length; i++) {
        var nhanVien = arrNhanVien[i];
        var nv = new NhanVien(nhanVien.maNhanVien, nhanVien.tenNhanVien, nhanVien.chucVu, nhanVien.heSoChucVu, nhanVien.luongCoBan, nhanVien.soGioLamTrongThang);

        content += `
        <tr>
        <td>${nv.maNhanVien}</td>
        <td>${nv.tenNhanVien}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.luongCoBan}</td>
        <td>${nv.tinhLuongNhanVien()}</td>
        <td>${nv.soGioLamTrongThang}</td>
        <td>${nv.xepLoaiNhanVien()}</td>
        <td>
                
        <button class="btn btn-danger" onclick="xoaNhanVien('${nv.maNhanVien}')" >Xoá</button>
                
        <button class="btn btn-danger" onclick="chinhSua('${nv.maNhanVien}')" >Chỉnh sửa</button>
        </td>
        </tr>
        `
    }
    document.querySelector('#tblNhanVien').innerHTML = content;
}
var renderNhanVien = function () {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',//Backend cung cap api
        method: 'GET',//Backend cung cấp method
        responseType: 'JSON'//Backend cung cấp kiểu dữ liệu trả về
    });

    //xử lý thành công
    promise.then(function (result) {
        console.log('result', result.data);
        //hiển thi tên sv
        renderTable(result.data);
    });
    //xử lý thất bại
    promise.catch(function (error) {
        console.log('2');
    })
}
//gọi hàm thực thi ajax
renderNhanVien();

document.querySelector('#btnXacNhan').onclick = function () {
    //lấy thông tin từ người dùng nhập vào

    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;   
    var arrOption = document.querySelector('#chucVu').options;
    var slChucVu = document.querySelector('#chucVu');
    nhanVien.chucVu = arrOption[slChucVu.selectedIndex].innerHTML;
    nhanVien.heSoChucVu=document.querySelector('#chucVu').value;
    nhanVien.luongCoBan=document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang=document.querySelector('#soGioLamTrongThang').value;

    var valid = true;
    valid &= validate.kiemTraRong('#maNhanVien','Mã nhân viên','#kiemTraRong_maNhanVien') ;


    valid &= validate.kiemTraTatCaSo('#maNhanVien','Mã nhân viên','#kiemTraSo_maNhanVien') 


    valid &= validate.kiemTraDoDai('#maNhanVien','Mã nhân viên','#kiemTraDoDai_maNhanVien',4,6);

    valid&=validate.kiemTraChu('#tenNhanVien','Tên nhân viên','#kiemTraChu_tenNhanVien');

    valid &= validate.kiemTraLuong('#luongCoBan','Lương cơ bản','#kiemTraLuong_luongCoBan',1000000,20000000);

    valid &= validate.kiemTraSoGioLam('#soGioLamTrongThang','Số giờ làm / tháng','#kiemTraSoGioLam_soGioLamTrongThang',50,150);


    //gọi api để đưa dữ liệu về server lưu trữ
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien',//Backend cung cap api
        method: 'POST',//Backend cung cấp method
        data: nhanVien,//format data phải đúng định dạng backend cần
        responseType: 'JSON'
    });
    promise.then(function (result) {
        console.log('xử lý thành công', result.data);
        renderNhanVien();
    });

    promise.catch(function (error) {
        console.log('xử lý thành công', error.response.data);
    });
}
window.xoaNhanVien = function (maNhanVien) {
    var promise = axios({
        
        url:`http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maNhanVien}`,
        method: 'DELETE',

    });

    promise.then(function (result) {
        console.log('xử lý thành công', result.data);
        renderNhanVien();
    });

    promise.catch(function (error) {
        console.log('xử lý thành công', error.response.data);
    });

}

window.chinhSua = function (maNhanVien) {
    var promise = axios({
        
        url:`http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maNhanVien}`,
        method: 'GET'
    }).then(function (result) {
        console.log('thành công', result);
        var nv = result.data;
        document.querySelector('#maNhanVien').value = nv.maNhanVien;
        document.querySelector('#tenNhanVien').value = nv.tenNhanVien;
        document.querySelector('#chucVu').value=nv.heSoChucVu;
       document.querySelector('#luongCoBan').value=nv.luongCoBan;
       document.querySelector('#soGioLamTrongThang').value=nv.soGioLamTrongThang;
       
    }).catch(function (error) {
        console.log('error', error);
    })
}
document.querySelector('#btnCapNhat').onclick = function () {
    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;   
    var arrOption = document.querySelector('#chucVu').options;
    var slChucVu = document.querySelector('#chucVu');
    nhanVien.chucVu = arrOption[slChucVu.selectedIndex].innerHTML;
    nhanVien.heSoChucVu=document.querySelector('#chucVu').value;
    nhanVien.luongCoBan=document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang=document.querySelector('#soGioLamTrongThang').value;

    var promise = axios({
        url:`http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${nhanVien.maNhanVien}`,
        method: 'PUT',
        data: nhanVien
    });
    promise.then(function (result) {
        console.log('result', result.data);
        renderNhanVien();
    })

    promise.catch(function (error) {
        console.log('result', error.reponse.data);
    })
}

