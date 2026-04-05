# Hướng dẫn Triển khai VPS (JLearn)

Tài liệu này hướng dẫn cách thiết lập và triển khai dự án lên VPS tại thư mục `/home`.

## 1. Chuẩn bị VPS
Đảm bảo bạn đã có VPS chạy Ubuntu 22.04 LTS hoặc tương đương và đã đăng nhập qua SSH.

## 2. Thiết lập Ban đầu (Chạy 1 lần)
Sao chép mã từ `scripts/setup.sh` lên VPS và chạy:

```bash
# Tạo file setup.sh
nano setup.sh
# Dán nội dung scripts/setup.sh vào
chmod +x setup.sh
./setup.sh
```

## 3. Clone Code và Cấu hình Env
```bash
cd /home
git clone https://github.com/newli5737/JLearn.git
cd jlearn
```

Tạo file `.env` cho cả backend và frontend. Lưu ý cấu hình `DATABASE_URL` trong backend trùng với mật khẩu đã thiết lập trong `setup.sh` (`test1234`).

## 4. Triển khai (Deploy)
Dùng script `deploy.sh` để tự động hóa việc cài đặt dependency, chạy Prisma migration, build và restart server:

```bash
chmod +x backend/scripts/deploy.sh
./backend/scripts/deploy.sh
```

## 5. Cấu hình Nginx
Bạn cần tự cấu hình Nginx để forward traffic vào các port:
- **Frontend**: Port 3000
- **Backend API**: Port 3050

## Các lệnh PM2 hữu ích
- `pm2 list`: Xem trạng thái các ứng dụng.
- `pm2 logs`: Xem log trực tiếp.
- `pm2 restart all`: Khởi động lại tất cả.
