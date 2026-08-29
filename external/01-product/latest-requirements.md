I. PROPOSAL:
Nền tảng AI tự động hóa quản lý tài trợ cho dự án cộng đồng
1. One-liner
Giải pháp giúp các CLB sinh viên, nhóm thiện nguyện và tổ chức phi lợi nhuận biến hàng trăm hóa đơn, ảnh chuyển khoản rời rạc thành báo cáo tài chính - tác động minh bạch, tự động, chỉ trong vài phút thay vì vài tuần.
2. Vấn đề
Người quản lý tài chính của các dự án cộng đồng (kinh phí 20 - 100 triệu VNĐ) đang mất hàng tuần để:
Đôn đốc thành viên nộp hóa đơn, lục tìm ảnh chuyển khoản trôi nổi trên Zalo/Messenger.
Đối chiếu thủ công để phát hiện chứng từ trùng, thiếu, hoặc chi vượt ngân sách.
Giải quyết tình trạng “tiêu trước, đối soát sau”, dẫn đến vượt ngân sách hoặc chi lệch định hướng cam kết với nhà tài trợ, không thể cứu vãn.
Trong khi đó, việc lập báo cáo tài chính tổng hợp chỉ mất 0.5 - 2 ngày nếu dữ liệu đã đầy đủ, nghĩa là nút thắt không nằm ở kế toán, mà ở khâu thu thập và đối soát chứng từ.
Google Sheets/Excel không giải được bài toán này vì không đọc được chứng từ phi cấu trúc (ảnh bill, hóa đơn) và không theo dõi được dòng tiền real-time. Còn phần mềm kế toán doanh nghiệp (MISA, Fast) thì quá phức tạp, quá đắt, và không được thiết kế cho luồng Lead → Member → Sponsor đặc thù của hoạt động tài trợ cộng đồng.
Áp lực về pháp lí đang tăng thêm: Thông tư 41/2022/TT-BTC, Nghị định 93/2021/NĐ-CP và Nghị định 03/2026/NĐ-CP đã biến minh bạch tài chính từ “nên có” thành bắt buộc, trong bối cảnh niềm tin cộng đồng vào báo cáo tài chính thủ công đang suy giảm sau nhiều vụ việc lùm xùm.
3. Giải pháp (prototype tại đây: link)
Giải pháp biến mỗi khoản chi thành một điểm kiểm soát tài chính, từ lúc phát sinh chi tiêu đến khi hoàn tất báo cáo. Thay vì đợi đến cuối dự án mới gom hóa đơn và đối soát, giải pháp này đưa AI vào ngay tại thời điểm thành viên phát sinh khoản chi:
THÀNH VIÊN CHI TIỀN → AI ĐỌC & ĐỐI SOÁT → APP CẢNH BÁO → LEAD PHÊ DUYỆT → TỰ ĐỘNG GHI NHẬN & BÁO CÁO
Cách hoạt động như thế nào?
1. Chụp - AI biến chứng từ thành dữ liệu
Thành viên chỉ cần chụp hoặc tải lên bill, hóa đơn hoặc ảnh chuyển khoản. OCR + AI tự động trích xuất các thông tin quan trọng như số tiền, thời gian, nội dung và hạng mục chi tiêu, thay vì yêu cầu thành viên nhập liệu thủ công.
2. Kiểm tra - Budget Guard phát hiện vấn đề trước khi quá muộn
Giải pháp tự động đối chiếu khoản chi với ngân sách và dữ liệu đã ghi nhận để phát hiện:
Chi vượt hoặc sắp vượt ngân sách.
Khoản chi không đúng hạng mục.
Chứng từ thiếu hoặc có dấu hiệu trùng lặp.
Khoản chi có nguy cơ làm sai lệch cam kết với nhà tài trợ.
AI không tự quyết định thay con người. Khi phát hiện bất thường, giải pháp gửi cảnh báo và đưa ra đề xuất để Lead kiểm tra và phê duyệt.
3. Kết nối - Từ một khoản chi đến kết quả của dự án
Mỗi khoản chi được liên kết với nguồn tài trợ → hạng mục ngân sách → hoạt động triển khai. Nhờ đó, dữ liệu tài chính không còn là những dòng giao dịch riêng lẻ mà trở thành cơ sở để theo dõi dự án đang sử dụng nguồn lực như thế nào.
4. Báo cáo - Từ dữ liệu đã kiểm soát thành báo cáo một chạm
Khi dữ liệu đã được xác nhận, App sẽ tự động tổng hợp thành Financial Report và Impact Report, giúp Lead giảm thời gian tổng hợp thủ công và giúp nhà tài trợ dễ dàng theo dõi:
Tiền nhận → Tiền đã sử dụng → Tiền còn lại → Đã chi cho hoạt động nào → Tạo ra tác động gì
Con người vẫn là người quyết định cuối cùng. Web/app chỉ đảm nhận phần đọc, đối chiếu, phát hiện bất thường và tổng hợp dữ liệu, để Lead có thể tập trung vào việc điều hành dự án thay vì dành hàng giờ lục bill và làm Excel.
4. Quy mô thị trường
Tầng
Khách hàng
Phạm vi
TAM (Dài hạn)
Tất cả tổ chức/dự án có hoạt động tài trợ cộng đồng cần quản lý thu - chi và báo cáo
CLB, nhóm thiện nguyện, NPO/quỹ xã hội, tổ chức xã hội, SME triển khai CSR
SAM (Mở rộng)
Các dự án cộng đồng quy mô nhỏ - vừa có 10 - 500 triệu VNĐ ngân sách/dự án
CLB sinh viên, nhóm thiện nguyện, dự án CSR nhỏ, NPO quy mô nhỏ
SOM (Ngách)
CLB sinh viên & nhóm thiện nguyện tự phát tại Việt Nam
Ưu tiên các dự án có nhiều thành viên cùng chi tiêu và phải báo cáo cho Lead/Sponsor

5. Mô hình kinh doanh


FREEMIUM
PRO (theo dự án)
BUSINESS (theo năm)
Đối tượng
CLB, nhóm nhỏ
Dự án 30 - 100tr
Quỹ, SME, NGO
Giá
Miễn phí
199k - 499k/dự án
Subscription tháng/năm
Điểm bán
Real-time qua Chatbot Zalo/Telegram
OCR tự động + cảnh báo vượt ngân sách real-time + báo cáo 1-click cho Sponsor
Multi-level approval, dashboard tác động, kết nối sao kê ngân hàng

Nguồn thu phụ: đào tạo quy trình cho ban tổ chức; thiết kế mẫu báo cáo riêng theo yêu cầu quỹ/doanh nghiệp lớn.
Chiến lược đi: chiếm lĩnh SOM (CLB/SME) trước để có dòng tiền và validate sản phẩm nhanh → mở rộng Enterprise/ERP về sau.
6. Lộ trình Roadmap
Bước 1. Nghiên cứu nhu cầu - đã hoàn thành phỏng vấn, xác định quy trình chuẩn.
Bước 2. Xây MVP - tạo dự án, tải hóa đơn, OCR, cảnh báo trùng/vượt ngân sách, xuất báo cáo.
Bước 3. Pilot thực tế - 3 - 5 CLB/nhóm thiện nguyện, đo độ chính xác OCR, thời gian làm báo cáo, mức hài lòng.
Bước 4. Mở rộng - thêm mẫu báo cáo theo sponsor, phân quyền, tích hợp cloud, dashboard.
Mục tiêu pilot 3 tháng:
3 - 5 tổ chức
 ≥ 300 chứng từ số hóa
giảm ≥50% thời gian làm báo cáo
phát hiện tự động ≥ 90% chứng từ trùng/vượt ngân sách
7. Rủi ro lớn nhất & cách kiểm soát

Rủi ro
Cách kiểm soát
AI đọc sai hóa đơn/chứng từ
AI tự chấm confidence score; chứng từ dưới ngưỡng được gắn cờ để người dùng xác nhận trước khi ghi nhận vào sổ.
Dữ liệu tài chính & thông tin nhà tài trợ bị lộ
Mã hóa dữ liệu, phân quyền theo vai trò và lưu lịch sử thao tác để kiểm soát ai được xem/sửa dữ liệu.
Chứng từ giả hoặc khai khống khoản chi
Đối chiếu ảnh chứng từ - số tiền - thời gian - giao dịch; các khoản chi vượt ngưỡng yêu cầu xác nhận bởi người có thẩm quyền.
AI tạo báo cáo nhưng số liệu đầu vào không đầy đủ
Giải pháp không tự “đoán” số liệu; giao dịch thiếu chứng từ hoặc dữ liệu bất thường được đánh dấu để bổ sung/xác minh.
Người dùng không tin tưởng kết quả AI
Mỗi con số trong báo cáo đều có thể truy ngược về chứng từ gốc, giúp người dùng kiểm tra và giải trình khi cần.


II. FORM
CHỐT: LẤY BẢN BẢO ANH LÀM BẢN GỐC + SỬA 3 CHỖ THAM KHẢO TỪ FORM MỌI NGƯỜI
Sửa câu 12 “thông thường” => “Trong dự án gần nhất”
Thêm câu 18 => Câu mở để lấy lời trích dẫn
Thêm câu 21 => Để lại liên hệ thử nghiệm
Tổng: 21 câu (19 bắt buộc + 2 tự do không bắt buộc)
Mục tiêu mẫu: n ≥ 50 - 100, trong đó ≥ 20 người nhóm “phụ trách chính” (Câu 1) + tách nhóm này khi phân tích.
Câu hỏi đắt giá cho pitching: Câu 7 và 8 (nút thắt) + Câu 16 “bù tiền cá nhân” và “uy tín với nhà tài trợ” + Câu 13 (mù real-time) + quote từ Câu 18.
Insight tổng:
“Làm báo cáo chỉ mất một buổi, nhưng gom đủ bill thì mất cả tuần, có khi hơn.”
PHẦN 1: VY
PHẦN 2: YẾN GIANG
PHẦN 3: HÂN
PHẦN 4: QUỲNH
LỰA SỐ PHẦN TRĂM ĐỂ SEED FORM

KHẢO SÁT THỰC TRẠNG QUẢN LÝ CHỨNG TỪ VÀ TÀI CHÍNH CỦA CÂU LẠC BỘ VÀ DỰ ÁN CỘNG ĐỒNG
LỜI MỞ ĐẦU
Chào bạn,
Chúng mình là một nhóm dự án tham gia chương trình UII Sandbox 2026 và đang nghiên cứu cách các CLB, nhóm thiện nguyện và dự án cộng đồng quản lý khoản chi, chứng từ và báo cáo tài chính.
Khảo sát này tập trung vào dự án hoặc sự kiện gần nhất mà bạn đã tham gia để ghi nhận trải nghiệm thực tế.
Thời gian trả lời: khoảng 5-7 phút.
Câu trả lời chỉ được sử dụng cho mục đích nghiên cứu và phát triển sản phẩm.
Bạn không cần cung cấp tên cá nhân, số tài khoản, ảnh giao dịch hay dữ liệu tài chính nhạy cảm.
Cảm ơn bạn đã dành thời gian chia sẻ trải nghiệm!

PHẦN I. THÔNG TIN CHUNG
Câu 1. Trong 12 tháng qua, bạn có tham gia vào việc phát sinh khoản chi, thu thập chứng từ, quản lý thu-chi hoặc lập báo cáo tài chính cho một CLB/dự án cộng đồng không? (chọn một, bắt buộc)
Có, mình là người phụ trách chính về tài chính/chứng từ. (29.4%)
Có, mình hỗ trợ người phụ trách tài chính/chứng từ. (23.7%)
Có, mình là thành viên thường phát sinh khoản chi và nộp chứng từ. (41.6%)
Không, mình chưa từng tham gia các công việc trên trong 12 tháng qua. (5.3%)
**Ba phương án đầu => Câu 2. Phương án cuối => trang Kết thúc dành cho người không thuộc mẫu.
Câu 2. Tổ chức hoặc dự án gần nhất bạn tham gia thuộc loại hình nào? (chọn một, bắt buộc)
CLB/Đội/Nhóm sinh viên trực thuộc trường hoặc khoa. (60.8%)
Nhóm thiện nguyện tự phát. (18.4%)
Dự án cộng đồng độc lập. (9.6%)
Tổ chức phi lợi nhuận/quỹ xã hội có đăng ký. (5.1%)
Dự án CSR của doanh nghiệp. (1.8%)
Khác: ________ (4.3%)
Câu 3. Tổng ngân sách của dự án gần nhất khoảng bao nhiêu? (chọn một, bắt buộc)
Dưới 10 triệu VNĐ. (14.6%)
Từ 10 đến dưới 20 triệu VNĐ. (24.7%)
Từ 20 đến dưới 50 triệu VNĐ. (34.9%)
Từ 50 đến 100 triệu VNĐ. (15.3%)
Trên 100 triệu VNĐ. (5.2%)
Mình không nắm rõ. (5.3%)
Câu 4. Dự án gần nhất có khoảng bao nhiêu khoản chi phát sinh? (Mỗi bill, hóa đơn hoặc giao dịch tính là một khoản chi - chọn một, bắt buộc)
Dưới 10 khoản. (9.7%)
10-30 khoản. (24.8%)
31-50 khoản. (39.6%)
51-100 khoản. (15.4%)
Trên 100 khoản. (7.1%)
Mình không nắm rõ. (3.4%)
=> Dữ liệu đúng SOM, đa số dự án 10-50tr với 31-50 khoản chi => đủ phức tạp để cần công cụ.
PHẦN II. QUY TRÌNH VÀ THỜI GIAN
Các câu dưới đây tiếp tục đề cập đến dự án gần nhất mà bạn vừa chọn.
Câu 5. Có khoảng bao nhiêu người trực tiếp phát sinh khoản chi và phải nộp chứng từ trong dự án? (chọn một, bắt buộc)
1-3 người: 9.8%
4-10 người: 44.5%
11-20 người: 29.7%
21-50 người: 12.1%
Trên 50 người: 2.8%
Mình không nắm rõ: 1.1%
Câu 6. Kể từ khi dự án/sự kiện kết thúc, mất bao lâu để gom đủ chứng từ từ các thành viên? (chọn một, bắt buộc)
Đã gom đủ ngay trong lúc dự án diễn ra: 5.2%
1-3 ngày: 15.6%
4-7 ngày: 26.1%
1-2 tuần: 31.4%
Trên 2 tuần: 19.5%
Mình không nắm rõ: 2.2%
Câu 7. Sau khi đã có đủ chứng từ, việc kiểm tra, đối soát và lập báo cáo tài chính hoàn chỉnh mất thêm bao lâu? (chọn một, bắt buộc)
Dưới nửa ngày: 20.3%
0,5-1 ngày: 41.2%
1-2 ngày: 24.5%
3-5 ngày: 9.6%
Trên 5 ngày: 2.8%
Dự án chưa hoàn thành bước này: 0.9%
Mình không nắm rõ: 0.7%
=> Dữ liệu câu 7 và 8 quan trọng nhất => Chứng minh nút thắt ở thu thập.
Câu 8. Trong dự án gần nhất, người phụ trách phải nhắc thành viên nộp hoặc bổ sung chứng từ khoảng bao nhiêu lần? (chọn một, bắt buộc)
Không cần nhắc: 4.6%
1-3 lần: 19.7%
4-10 lần: 40.5%
11-20 lần: 15.3%
Trên 20 lần: 5.2%
Phải nhắc liên tục nên không thể ước tính: 13.8%
Mình không nắm rõ: 0.9%
Khi phân tích: chỉ tin câu này từ nhóm "phụ trách chính + hỗ trợ".

PHẦN III. CÔNG CỤ VÀ CÁCH QUẢN LÝ HIỆN TẠI
Câu 9. Tổ chức của bạn đã sử dụng những công cụ nào để quản lý thu-chi và chứng từ trong dự án gần nhất? (chọn nhiều, bắt buộc)
Microsoft Excel. (42.8%)
Google Sheets. (78.6%)
Google Forms. (19.1%)
Google Drive hoặc dịch vụ lưu trữ đám mây khác. (39.8%)
Zalo/Messenger hoặc ứng dụng nhắn tin khác. (74.2%)
Phần mềm kế toán. (4.3%)
Sổ sách hoặc chứng từ giấy. (18.5%)
Khác: ________
Câu 10. Thành viên chủ yếu nộp bill, hóa đơn hoặc ảnh chuyển khoản qua đâu? (chọn tối đa 2, bắt buộc)
Group chat chung trên Zalo/Messenger. (72.4%)
Nhắn riêng cho người phụ trách. (52.7%)
Google Forms. (8.6%)
Thư mục Google Drive hoặc dịch vụ lưu trữ khác. (20.1%)
Email. (2.4%)
Nộp chứng từ giấy trực tiếp. (8.5%)
Khác: ________
Câu 11. Trong dự án gần nhất, khi cần tìm lại một chứng từ cụ thể, bạn hoặc người phụ trách mất bao lâu? (chọn một, bắt buộc)
Dưới 1 phút. (4.7%)
1-5 phút. (19.8%)
6-10 phút. (24.3%)
11-30 phút. (19.5%)
Trên 30 phút. (11.9%)
Đã có trường hợp không tìm lại được. (13.2%)
Mình không nắm rõ. (6.6%)
Câu 12. Nếu Lead hỏi giữa dự án: "Hiện tại còn chính xác bao nhiêu ngân sách?", tổ chức của bạn có thể trả lời như thế nào? (chọn một, bắt buộc)
Có thể trả lời chính xác ngay. (7.4%)
Có thể trả lời nhưng phải kiểm tra lại một nguồn dữ liệu. (21.3%)
Phải kiểm tra và tổng hợp từ nhiều nguồn khác nhau. (27.8%)
Chỉ biết chính xác sau khi gom đủ chứng từ và đối soát. (26.6%)
Thường không xác định được chính xác khi dự án đang diễn ra. (11.5%)
Mình không nắm rõ. (5.4%)
PHẦN IV. SAI SÓT VÀ HẬU QUẢ THỰC TẾ
Câu 13. Trong dự án gần nhất, tổ chức của bạn đã gặp những tình huống nào sau đây? (chọn nhiều, bắt buộc)
Thiếu chứng từ cho một khoản chi đã phát sinh. (64.6%)
Chứng từ bị mờ, thiếu thông tin hoặc không hợp lệ. (45.7%)
Nhập sai số tiền, ngày hoặc nội dung khoản chi. (35.3%)
Không xác định được khoản chi thuộc hạng mục ngân sách nào.
Chứng từ hoặc khoản chi bị nhập trùng. (20.5%)
Giao dịch không khớp với chứng từ.
Chi vượt ngân sách của một hạng mục. (30.4%)
Chỉ phát hiện sai sót sau khi khoản chi đã xảy ra quá lâu. (28.6%)
Số liệu giữa các file hoặc công cụ không khớp nhau. (35.5%)
Khác: ________(8.5%)
Câu 14. Các vấn đề về chứng từ hoặc số liệu như trên xảy ra với tần suất như thế nào trong những dự án bạn từng tham gia? (chọn một, bắt buộc)
Hầu như dự án nào cũng xảy ra. (30.4%)
Xảy ra trong phần lớn dự án. (24.7%)
Xảy ra trong khoảng một nửa số dự án. (19.8%)
Thỉnh thoảng xảy ra. (17.6%)
Hiếm khi xảy ra. (5.3%)
Chưa từng xảy ra. (2.2%)
Mình không nắm rõ.
=> Câu này chủ đích hỏi nhiều dự án (đo tần suất) => không sửa về "dự án gần nhất".
Câu 15. Các vấn đề về chứng từ hoặc số liệu đã từng gây ra hậu quả nào? (chọn nhiều, bắt buộc)
Phải liên hệ và nhắc lại nhiều thành viên. (60.8%)
Phải kiểm tra hoặc làm lại báo cáo. (45.5%)
Báo cáo bị trễ hạn. (35.2%)
Phải điều chỉnh hoặc cắt giảm ngân sách ở giai đoạn sau.
Thành viên/người phụ trách phải ứng hoặc bù tiền cá nhân. (38.7%)
Phải giải trình lại với Lead, nhà trường hoặc đơn vị chủ quản. (25.3%)
Phải giải trình lại với nhà tài trợ. (15.4%)
Gây mâu thuẫn hoặc căng thẳng trong nội bộ. (22.2%)
Làm người phụ trách tài chính quá tải hoặc không muốn tiếp tục đảm nhiệm vai trò. (20.8%)
Ảnh hưởng đến uy tín hoặc khả năng xin tài trợ của tổ chức. (12.2%)
Khác: ________ (10.5%)
Câu 16. Nhìn chung, mức độ bất tiện hoặc áp lực mà quy trình quản lý tài chính hiện tại gây ra cho bạn là bao nhiêu? (thang 1-5, bắt buộc) => (Trung bình 3.9/5, riêng nhóm phụ trách chính 4.4/5)
1. Hoàn toàn ổn, hầu như không gây bất tiện.
5. Rất mất công hoặc áp lực, cần một cách làm tốt hơn.
Câu 17. Kể tụi mình nghe một tình huống khó quên nhất (ức chế, "dở khóc dở cười" hoặc vất vả) mà bạn từng gặp khi làm việc với hóa đơn, chứng từ hay tiền bạc của dự án? (trả lời tự do, KHÔNG bắt buộc) (30% người điền có viết)
Ví dụ: đòi bill cả tháng không được, bill mờ chữ phải cãi nhau, tự bỏ tiền túi đền… (ÔNG ƠI KÊU BOT GENERATE CÁC CÂU CÙNG CHỦ ĐỀ ĐƯỢC HÔNG)

PHẦN V. ĐỊNH HƯỚNG GIẢI PHÁP VÀ ĐĂNG KÝ DÙNG THỬ
Đoạn giới thiệu hiển thị trước Câu 18:
Nhóm nghiên cứu đang cân nhắc xây dựng một nền tảng dành cho CLB, nhóm thiện nguyện và dự án cộng đồng. Thành viên có thể chụp hoặc tải chứng từ lên hệ thống hỗ trợ trích xuất dữ liệu, sắp xếp chứng từ, kiểm tra ngân sách và tổng hợp báo cáo. Người phụ trách vẫn là người xác nhận và phê duyệt cuối cùng.
Câu 18. Nếu chỉ được giải quyết một vấn đề trước tiên, bạn muốn công cụ ưu tiên vấn đề nào nhất? (chọn một, bắt buộc)
Gom và lưu chứng từ tập trung, dễ tìm lại. (25.3%)
Tự động nhập dữ liệu từ bill, hóa đơn hoặc ảnh chuyển khoản. (21.6%)
Nhắc thành viên nộp hoặc bổ sung chứng từ. (11.8%)
Theo dõi số tiền còn lại của từng hạng mục theo thời gian thực. (17.5%)
Cảnh báo khi khoản chi gần/vượt ngân sách hoặc sai hạng mục. (9.7%)
Phát hiện chứng từ trùng hoặc dữ liệu sai lệch. (3.8%)
Đối chiếu chứng từ với giao dịch. (4.2%)
Tự động tổng hợp và xuất báo cáo tài chính. (0.9%)
Khác: ________ (5.2%)
Câu 19. Nếu có một phiên bản dùng thử miễn phí, tổ chức của bạn có sẵn sàng sử dụng trong một dự án thực tế không? (chọn một, bắt buộc)
Có, mình muốn đăng ký tham gia. (45.8%)
Có thể cân nhắc trong tương lai. (38.4%)
Chưa có nhu cầu, quy trình hiện tại vẫn ổn. (12.3%)
Không muốn sử dụng công cụ này. (3.5%)
TRANG KẾT THÚC - NGƯỜI KHÔNG THUỘC MẪU
Cảm ơn bạn đã quan tâm đến khảo sát! Khảo sát này dành cho những người có kinh nghiệm trực tiếp trong việc phát sinh chi phí, xử lý chứng từ, quản lý thu–chi hoặc lập báo cáo tài chính trong 12 tháng qua. Vì vậy, khảo sát xin được kết thúc tại đây.
LỜI CẢM ƠN CUỐI KHẢO SÁT
Cảm ơn bạn đã chia sẻ trải nghiệm! Những thông tin này sẽ giúp nhóm hiểu rõ hơn điểm nghẽn thực tế trong quá trình quản lý chứng từ và tài chính, đồng thời xác định đúng vấn đề cần ưu tiên khi xây dựng sản phẩm thử nghiệm.




III. OUTLINE
MỤC LỤC BÀI DỰ THI
Trang bìa – Giới thiệu
Vấn đề (Problem) - Thực trạng tại VN & hạn chế của giải pháp hiện có
Giải pháp sản phẩm - Triết lý, USP
Cấu tạo sản phẩm
Thị trường (SOM - SAM - TAM) - Quy mô thị trường nội địa & toàn cầu
Bối cảnh cạnh tranh - Bản đồ định vị; bảng so sánh tính năng
Đối tượng sử dụng trực tiếp - Chân dung khách hàng (nhu cầu & hành vi)
User Journey - Awareness → Consideration → Purchase → Services → Loyalty
Mô hình kinh doanh – Doanh thu, chiến lược giá, các phân khúc CSR/NGOs – B2C – B2B – B2H
Kế hoạch Go-to-Market – Mục tiêu 4 năm, timeline phân phối/marketing/sản phẩm/pháp lý 2024 - 2029
Kế hoạch Marketing – 3 giai đoạn Trust – Growth – Scale, key message, tactics, KPIs
Social Impact – Tác động cộng đồng, công nhận truyền thông, đối tác, pháp lý, SDGs
Dự báo tài chính – doanh thu/lợi nhuận, biên lợi nhuận 2025 - 2029
Cấu trúc chi phí – Phân bổ vốn, dòng tiền, OPEX, thời gian hoàn vốn 16–17. Dự trù rủi ro – Ma trận rủi ro (khả năng xảy ra vs dự đoán) & 4 rủi ro chính kèm giải pháp
Tầm nhìn – Roadmap 2025 - 2029, mở rộng Đông Nam Á
Đội ngũ – Founder, Co-founder, các thành viên
Đội ngũ Cố vấn – 4 cố vấn kỹ thuật/chuyên môn/kinh doanh
Trang kết – Hình ảnh & thông điệp cảm xúc kết bài


IV. MÔ HÌNH KINH DOANH
Mô hình kinh doanh vận hành theo chiến lược Product-Led Growth (PLG), lấy sản phẩm làm cốt lõi để tự tăng trưởng người dùng, kết hợp với mô hình Freemium sang SaaS, trên nền tảng định vị hai phía của đồng tiền (two-sided value).
Cơ chế hai phía của đồng tiền (Two-sided value)
Phía 1 - Người quản tiền (CLB/Admin/Finance Lead): Nhận tiền tài trợ và phải chi tiêu nó. Cần gom bill nhanh, biết ngân sách còn bao nhiêu, xuất báo cáo dễ dàng. Đây là phía trả tiền chính (Free → Free Trial → Subscription/Business).
Phía 2 - Người cho tiền (Sponsor/Nhà tài trợ): Đưa tiền ra nhưng mất dấu, không biết tiền đi đâu. Cần thấy dòng tiền real-time, tin tưởng tiền dùng đúng mục đích. Xem minh bạch từng dự án luôn miễn phí, điều kiện bắt buộc để vòng lặp tin tưởng hoạt động. Chỉ khi cần công cụ quản trị nâng cao (gộp xem nhiều dự án cùng lúc, xuất báo cáo CSR tổng hợp thay vì tự tổng hợp thủ công từ nhiều link) mới phát sinh phí (Add-on B2S) - bán sự tiện lợi quản trị, không bán quyền truy cập minh bạch.
Vòng lặp Flywheel: CLB càng minh bạch (nhiều dữ liệu, nhiều dự án công khai) → Sponsor càng tin tưởng → Sponsor càng sẵn sàng tài trợ nhiều hơn → CLB càng có động lực dùng sản phẩm minh bạch hơn. Hai bên nuôi nhau và chính vì vòng lặp này phụ thuộc vào việc Sponsor xem miễn phí, nên Add-on B2S chỉ được phép đứng bên ngoài lớp "xem minh bạch cơ bản", không được chạm vào nó.
1. Phân tích Phân khúc Khách hàng (Customer Segments & Pain Points)
Tệp B2C (Ngách khởi điểm / SOM): CLB/Đoàn - Hội - Nhóm Sinh viên & Nhóm thiện nguyện tự phát
Độ tuổi Admin/Lead: 18 - 22 tuổi.
Mức chi trả (Willingness to Pay): Rất thấp.
Pain point cốt lõi: Sự phân tán dữ liệu phi cấu trúc (Decentralized unstructured data). Hoạt động thu - chi diễn ra rải rác bởi nhiều cá nhân, dẫn đến "nút thắt thu thập" kéo dài hàng tuần. Ban tài chính kiệt sức (burnout) vì phải đóng vai trò đi đòi chứng từ.
Tệp B2NGO (Quỹ xã hội, Tổ chức phi lợi nhuận)
Độ tuổi Quản lý: 25 - 50 tuổi.
Mức chi trả: Khá - Cao.
Pain point cốt lõi: Áp lực tuân thủ pháp lý (Compliance pressure) theo Nghị định 93/2021/NĐ-CP và khủng hoảng niềm tin từ công chúng (Trust deficit). Họ cần một "Audit trail" (dấu vết kiểm toán) rõ ràng từ lúc nhận tiền đến lúc giải ngân để báo cáo trực tiếp cho các nhà tài trợ lớn.
Tệp B2B (Doanh nghiệp SME triển khai CSR)
Độ tuổi Quản lý: 30 - 55 tuổi (Giám đốc Marketing, Trưởng ban CSR).
Mức chi trả: Cao nhất.
Pain point cốt lõi: Rủi ro thương hiệu (Brand Risk). Khi giải ngân CSR thông qua bên thứ 3, doanh nghiệp thiếu công cụ để minh bạch dòng tiền, làm giảm hiệu quả truyền thông thương hiệu và khó đưa vào chi phí hợp lệ để tính thuế.
Hành vi mở rộng (B2S): khi B2B tài trợ ≥3 dự án/CLB cùng lúc, phát sinh nhu cầu dashboard tổng hợp + báo cáo CSR gộp thay vì theo dõi rời rạc từng dự án,xử lý bằng Add-on Sponsor Dashboard, không phải khách hàng mới cần đi tìm riêng.
2. END-USER JOURNEY MAP (Hành trình Người dùng Cốt lõi)
Lưu ý: Bảng này mô phỏng hành trình của Admin/Finance Lead – người ra quyết định sử dụng và mang lại giá trị lõi cho.
Stage
1. Awareness (Nhận thức)
2. Consideration (Cân nhắc)
3. Onboarding (Triển khai)
4. Post-Decision (Trải nghiệm)
5. Loyalty (Gắn bó & Lan tỏa)
OBJECTIVES
Tìm kiếm giải pháp gom chứng từ nhanh, tránh thất lạc và tự động hóa báo cáo.
So sánh với việc nộp bill qua Zalo group + tổng hợp thủ công trên Sheets, tìm hiểu cách hoạt động không cần tài khoản.
Tạo dự án, ngân sách và bắt đầu nhận bill từ thành viên sự kiện.
Theo dõi ngân sách còn lại (real-time) và chốt báo cáo cuối dự án.
Chuyển từ Free Trial sang Subscription CLB (nếu hoạt động dày) hoặc Business (nếu quy mô lớn), giới thiệu cho Ban/CLB khác.
NEEDS
Thông tin rõ ràng về khả năng gom chứng từ tập trung, dễ tìm lại, kèm AI OCR hỗ trợ nhập liệu tự động và các review thực tế.
Demo luồng duyệt bill, xem trước Dashboard, đánh giá mức độ bảo mật.
Hướng dẫn tạo link/QR nhanh, phân quyền duyệt, cách kích hoạt Cổng minh bạch để chia sẻ cho nhà tài trợ, hỗ trợ kỹ thuật khi AI đọc sót.
Dashboard trực quan, xuất file báo cáo 1 chạm, Chatbot tra cứu nhanh.
Các tính năng nâng cao (Multi-admin), báo cáo tác động (Impact report).
ACTIONS
Hỏi han trong cộng đồng Ban Điều hành CLB/Đoàn Hội, thấy bài đăng tài trợ của app.
Xem demo hoặc dùng thử link mẫu, tự tạo 1 dự án test để trải nghiệm luồng duyệt bill và tính năng AI.
Tạo QR/Link, gửi vào group Zalo nội bộ, duyệt bill trả về từ hàng chờ.
Dùng Chatbot hỏi số dư quỹ, duyệt toàn bộ chứng từ, xuất báo cáo và gửi link Cổng minh bạch cho nhà tài trợ theo dõi trực tiếp.
Ký hợp đồng dài hạn, trở thành Case Study thành công, tham gia Workshop.
FEELINGS
Tò mò, le lói hy vọng nhưng vẫn hoài nghi độ chính xác của AI.
Ấn tượng với No-login submit, nhưng hơi lo ngại thói quen của thành viên.
Bất ngờ vì tốc độ thu thập, giảm hẳn áp lực phải đi "đòi nợ" hóa đơn.
Nhẹ nhõm vì không phải giải trình thủ công từng câu hỏi từ nhà tài trợ (họ tự xem cổng), tự tin với số liệu minh bạch, hưng phấn vì không phải thức đêm đối soát.
Tự hào, tin tưởng hệ thống, tự tin vì nhà tài trợ có thể tự kiểm chứng qua Cổng minh bạch mà không cần mình phải trình bày thêm.
BARRIERS (Điểm gãy)
Thiếu thông tin, sợ công nghệ làm rườm rà thêm quy trình làm việc hiện tại.
Ngại phải hướng dẫn lại quy trình cho hàng chục thành viên vốn đã quen Zalo/Sheets/tiền mặt; ngại công khai dữ liệu tài chính ra ngoài, sợ bị soi nếu có sai sót nhỏ.
Một số bill viết tay/nhòe AI nhận diện sai hạng mục, admin phải sửa thủ công.
Chưa tích hợp trực tiếp sao kê ngân hàng (ngoài phạm vi MVP).
Chi phí gói Subscription hàng tháng cần được đơn vị chủ quản phê duyệt.

3. Chiến lược Giá (Pricing Strategy) & Quyền lợi Đi kèm
Chiến lược định giá kết hợp Tiered Pricing và Subscription, nhằm đa dạng hóa lựa chọn thanh toán và giảm rào cản gia nhập cho khách hàng (Barrier to Entry).
Gói Freemium (0 VNĐ)
Mục đích chiến lược: Giảm triệt để chi phí thu hút khách hàng (CAC - Customer Acquisition Cost), tạo thói quen (User Habit) và khai thác hiệu ứng mạng lưới.
Tính năng: Giới hạn 1 dự án active; AI OCR đọc tối đa 20 bill/tháng; Dashboard cơ bản; Cổng minh bạch công khai bản chuẩn (Sponsor xem tổng quan + bấm xem chứng từ gốc, không cần đăng nhập); Không cần tạo tài khoản cho member.
Nguyên nhân: 20 bill đủ test nhưng tạo áp lực nâng cấp sớm, sự kiện CLB trung bình phát sinh 30-50+ bill (lưu ý: theo khảo sát thực tế chỉ ~60-65% dự án vượt ngưỡng này ngay từ đầu, không phải tuyệt đối).
Gói Pro - dành cho B2C (CLB, nhóm thiện nguyện, NGO nhỏ)
Mục đích chiến lược: Chuyển đổi toàn bộ tệp B2C, là cửa vào chính vì khớp cách CLB/nhóm thiện nguyện xin và giải trình ngân sách.
Tính năng: AI OCR không giới hạn; Budget Guard cảnh báo vượt ngân sách real-time; 1-click Export báo cáo; Cổng minh bạch công khai bản chuẩn.
Free Trial - 1 dự án đầu tiên
Cơ chế: Khi tài khoản tạo dự án đầu tiên, tự động mở khóa toàn bộ tính năng Pro miễn phí cho đúng dự án đó, không giới hạn số bill.
Mục đích: Giải quyết đúng nhu cầu "CLB tổ chức sự kiện thưa, không đều đặn", họ được trải nghiệm trọn vẹn Pro mà không phải cam kết trả phí ngay từ lần đầu, đồng thời tạo điểm chuyển đổi tự nhiên sang Subscription khi có dự án thứ 2.
Giới hạn: 1 lần duy nhất/tài khoản (không lặp lại theo kỳ), để tránh bị lạm dụng tạo tài khoản mới liên tục nhằm "cày" trial.
Subscription theo kỳ (1 - 3 - 6 tháng) - cơ chế billing DUY NHẤT sau khi hết Free Trial
Cách tính tiền: Trả 1 lần cho cả kỳ đã chọn, trong thời gian đó tạo bao nhiêu dự án cũng không tính thêm phí.
3 mốc thời hạn:
1 tháng: dành cho CLB chỉ chắc chắn có 1 đợt sự kiện gần, kể cả nhóm tần suất thấp (dự án hiếm), đây là "cửa" thay thế cho Pay-per-project đã bỏ, giá cần đủ rẻ để nhóm 1 sự kiện/năm vẫn chấp nhận mua khi hết Free Trial.
3 tháng: phù hợp CLB hoạt động theo học kỳ ngắn hoặc mùa cao điểm.
6 tháng: phù hợp CLB có kế hoạch dày cả học kỳ, giá/tháng rẻ nhất để khuyến khích cam kết dài hạn (giống mô hình gói năm của Netflix).
Giá trung bình/tháng giảm dần theo kỳ dài hơn.
Kèm ưu đãi: …
Gói Business ( X VNĐ / Tháng)
Mục đích chiến lược: Tạo nguồn thu định kỳ (MRR - Monthly Recurring Revenue) từ B2NGO lớn và B2B CSR.
Tính năng: Quản lý không giới hạn dự án; Phân quyền phê duyệt đa cấp (Maker - Checker); Dashboard White-label (Gắn logo doanh nghiệp/Tùy chỉnh giao diện); Tích hợp lưu trữ Cloud doanh nghiệp.
Nguyên nhân: Giải quyết bài toán quản trị cấp cao. Các tổ chức này coi đây là khoản đầu tư cho rủi ro pháp lý và thương hiệu (Risk Management Investment), nên mức giá này rất rẻ so với việc thuê dịch vụ kiểm toán bên ngoài.
4. Cấu trúc Luồng Doanh thu (Revenue Streams)
Core Revenue:
Free Trial → Subscription (Gói Pro).
Phí duy trì định kỳ Gói Business (B2NGO, B2B CSR).
Dòng phụ trợ (triển khai sớm):
Advertising: Toast ads nhắm mục tiêu, chỉ ở giao diện nội bộ Free/Pro - không đặt trên Cổng minh bạch công khai (giữ đúng nguyên tắc phía Sponsor).
Add-on Sponsor Dashboard (B2S), bán tiện ích quản trị, không bán quyền xem minh bạch.
Upsell/Cross-sell (Tương lai):
Thiết kế mẫu Impact Report độc quyền theo chuẩn tổ chức quốc tế.
Khóa đào tạo/chứng nhận "Quy trình minh bạch tài chính dự án cộng đồng".
5. Bảng Social Business Model Canvas (SBMC):
Social Problem
Network Partners
Service Portfolio
Core Value Offerings
Beneficiaries
• Bill bị trôi, mờ, thiếu thông tin, nhập trùng hoặc thất lạc.
• Người phụ trách mất thời gian gom và đối soát trước khi lập báo cáo.
• Giữa dự án, Lead khó biết chính xác ngân sách còn lại.
• Nhà tài trợ thiếu kênh xác minh độc lập, real-time về dòng tiền đã tài trợ, phải chờ báo cáo cuối kỳ mới biết.



• Mạng lưới CLB/Đoàn – Hội tại các trường
• Các vườn ươm, trung tâm đổi mới sáng tạo
• Quỹ xã hội, doanh nghiệp tài trợ.
• Các tổ chức phi chính phủ quốc tế (INGOs) và các mạng lưới thanh niên toàn cầu hoạt động tại địa phương
• Một cổng nộp bill bằng link hoặc QR.
• AI đọc và chuẩn hóa thông tin trên bill
• Admin kiểm tra và phê duyệt.
• Dashboard ngân sách, tìm kiếm bill và xuất báo cáo.
• Cổng minh bạch công khai - Sponsor xem tổng quan ngân sách/dòng tiền real-time, có thể bấm vào từng khoản chi để xem trực tiếp chứng từ/bill gốc đã được Admin duyệt, không cần đăng nhập.
• Free Trial: trải nghiệm đầy đủ tính năng Pro miễn phí cho dự án đầu tiên của mỗi tài khoản.
• Chatbot tra cứu.
• Thành viên nộp bill không cần tài khoản.
• AI giúp nhận diện các trường cơ bản như đơn vị bán hàng, ngày, tổng tiền.
• Admin biết ngân sách còn lại và báo cáo rõ ràng.
• Nhà tài trợ theo dõi dòng tiền real-time, tổng hợp nhiều dự án tài trợ trong 1 nơi mà không cần hỏi báo cáo, và có thể tự kiểm chứng từng khoản chi bằng chứng từ gốc - không phải tin vào số liệu tổng hợp báo cáo lại, giải quyết đúng nhu cầu Audit trail của B2NGO/B2B.
• Từ dữ liệu phân tán đến một quy trình tài chính có kiểm duyệt.
• CLB, nhóm thiện nguyện và dự án cộng đồng.
• Admin / Finance Lead.
• Nhà tài trợ (Viewer/Sponsor B2S). .
• Tổ chức triển khai dự án CSR.
Impact
Channels
Costs
Revenue Stream


• Minh bạch tài chính; Tiết kiệm hàng ngàn giờ lao động thủ công vô ích cho cộng đồng.
• Tạo ra dữ liệu tài chính có thể tin cậy để ra quyết định.
• Hỗ trợ tuân thủ quy chuẩn kế toán thiện nguyện.
• Đóng góp trực tiếp vào Mục tiêu Phát triển Bền vững của Liên Hợp Quốc: SDG 16 (Peace, Justice and Strong Institutions), SDG 17 (Partnerships for the Goals)
• Phát tán URL/QR nộp bill qua nhóm Zalo nội bộ.
• Chương trình Đại sứ Sinh viên (Student Ambassadors).
• Tài trợ công cụ cho các cuộc thi, mạng lưới khởi nghiệp.
Biến đổi theo scale (giá sàn - quyết định "bán giá này có lỗ không"):
AI OCR - chi phí API/vận hành theo lượng bill xử lý (~10%)
Payment Gateway/Transaction fee (~5%)
Cố định (quyết định "cần bao nhiêu đơn để hòa vốn"):
Nhân sự - phát triển, vận hành & Customer Success (~40%)
Server Hosting + Bandwidth cho Cổng minh bạch công khai + lưu trữ chứng từ dài hạn (~10%)
Marketing/CAC (Đại sứ Sinh viên, sales tiếp cận B2NGO/B2B) (~12%)
Công cụ & license (~5%)
Kiểm toán bảo mật dữ liệu, tư vấn pháp lý & đăng ký doanh nghiệp (~8%)
Dự phòng rủi ro (~10%)
Freemium: Kéo người dùng, thiết lập thói quen, có sẵn Cổng minh bạch công khai bản chuẩn (20 bill/tháng, 1 dự án active).
Free Trial → Subscription CLB (Gói Pro, 1-3-6 tháng): Free trial mở khóa Pro cho dự án đầu tiên, sau đó chuyển đổi sang Subscription theo kỳ, cửa vào chính cho B2C.
Gói Business: Thu phí định kỳ từ NGO và SME CSR cần quản trị phức tạp, kèm Cổng minh bạch công khai bản White-label.
Add-on Sponsor Dashboard Pro (B2S): Phụ phí khi Sponsor theo dõi ≥3 dự án cùng lúc.
Advertising: Toast ads nhắm mục tiêu, chỉ ở giao diện nội bộ Free/Pro, không đặt trên Cổng minh bạch công khai.




V. NHÁP ĐO GIÁ
1. Khung định giá (Sàn - Trần - Điểm đặt)
Sàn = chi phí (không được bán dưới mức này, lỗ)
Trần = giá cao nhất khách còn chấp nhận trả
Điểm đặt giá = nằm ở giữa, khớp với túi tiền + nhịp ngân sách của từng tệp khách hàng
Kiểm tra = so với giá tham chiếu thị trường, không bị chê đắt/rẻ bất thường
=> Sàn ≤ Giá đặt ≤ Trần
2. 4 cách đo giá thực tế (xếp theo độ mạnh/tin cậy)
Phỏng vấn sâu - không hỏi thẳng “trả bao nhiêu”, mà hỏi hành vi thật: ngưỡng chi tự quyết không cần họp là bao nhiêu, đã từng trả tiền cho công cụ nào chưa, tiền về theo nhịp nào (kỳ/sự kiện/tháng), khoản lớn cần ai duyệt.
Xin bằng chứng giấy - bảng dự trù kinh phí thật của 2-3 CLB (xem có khe cho mục “công cụ” ~199k không), quy chế chi tiêu.
Đối chiếu data form - xem Câu 4 (quy mô ngân sách dự án), nếu đa số dự án 10-50tr thì giá 199-499k ≈ 1% ngân sách là hợp lý; nếu đa số <10tr thì phải hạ giá.
Pilot thật - cho dùng free 1 dự án, cuối kỳ hỏi 3 câu Van Westendorp (giá nào quá đắt/quá hời/phải cân nhắc) + đưa đề nghị thật “dự án sau Xxxk, dùng tiếp không?” và đếm số người thật sự gật (đây là bằng chứng mạnh nhất vì là hành vi thật, không phải trả lời khảo sát).
3. Chi phí biến đổi và Chi phí cố định


Định nghĩa
Trả lời câu hỏi gì
Biến đổi
Bán thêm 1 đơn thì tốn thêm 1 phần (API OCR đọc bill, phí cổng thanh toán, phí chatbot/lượt hỏi)
“Bán giá này có lỗ không?” → ra giá sàn
Cố định
Bán bao nhiêu cũng tốn như nhau (lương team, server, marketing, pháp lý)
“Cần bao nhiêu đơn để hòa vốn?” → bài toán hòa vốn, tính sau pilot

Công thức: Giá - Chi phí biến đổi = Lãi gộp/đơn
Chi phí cố định ÷ Lãi gộp/đơn = Số đơn cần bán để hòa vốn
Thuế: tính trên lợi nhuận, chuyện của giai đoạn lập pháp nhân sau này, chưa cần lo lúc này.

VI. GO TO MARKET
TẦM NHÌN 4 NĂM
2026: Hoàn thiện MVP, đạt Product-Market Fit tại ngách sinh viên. Số hóa 10.000 chứng từ đầu tiên.
2027: Sang số (Scale up), thương mại hóa mạnh mẽ tệp B2NGO và B2H, đạt điểm hòa vốn (Break-even).
2028: Thâm nhập sâu B2B CSR, chuẩn hóa bảo mật dữ liệu cấp doanh nghiệp.
2029: Trở thành Hạ tầng quản trị tài chính phi lợi nhuận Top 1 Việt Nam, tích hợp Open Banking, có khả năng nhân rộng sang các nước Đông Nam Á
TIMELINE CHI TIẾT
Giai đoạn 1: Product-Market Fit & User Acquisition (2026) - Tập trung B2C
Sản phẩm: Launch bản MVP (Web-app). Hoàn thiện luồng nộp bill QR code. Đạt độ chính xác AI OCR >90% với hóa đơn tiếng Việt mờ/nhòe.
Phân phối/Marketing:
Phát triển mạng lưới Student Ambassadors (Đại sứ sinh viên) làm cánh tay nối dài tại các trường Đại học để onboard trực tiếp các CLB.
Tài trợ công cụ nền tảng cho các cuộc thi Khởi nghiệp/Dự án cộng đồng (Dùng sản phẩm đổi lấy nhận diện thương hiệu).
Pháp lý: Ban hành Tuyên bố quyền riêng tư (Privacy Policy) minh bạch về quyền sở hữu dữ liệu người dùng.
Giai đoạn 2: Commercialization & B2H/B2NGO Expansion (2027) - Tạo MRR
Sản phẩm: Nâng cấp tính năng Phân quyền nhiều cấp. Ra mắt Chatbot truy vấn ngân sách đa nền tảng (Telegram, Web).
Phân phối/Marketing:
Thiết lập một cấu trúc Database Đối tác tiềm năng (Partnership Database) bài bản, phân loại rõ các Quỹ NGO và Doanh nghiệp có quỹ CSR lớn.
Tổ chức các Keynote / B2B Workshop hướng dẫn chuẩn hóa tài chính cộng đồng, mời đại diện các trường Đại học tham dự để chốt hợp đồng B2H.
Pháp lý: Cập nhật form báo cáo xuất ra tự động khớp hoàn toàn với biểu mẫu của Thông tư 41/2022/TT-BTC.
Giai đoạn 3: Enterprise Scale (2028) - Chiếm lĩnh B2B CSR
Sản phẩm: Xây dựng cổng API kết nối dữ liệu. Cung cấp tính năng White-label cho phép doanh nghiệp custom giao diện báo cáo tác động.
Chuẩn hóa hệ thống đa ngôn ngữ (Localization) và tinh chỉnh cấu trúc báo cáo tự động để đáp ứng các tiêu chuẩn kiểm toán minh bạch của các tổ chức quốc tế.
Phân phối/Marketing:
Triển khai chiến lược B2B Direct Sales (Bán hàng trực tiếp).
Pitching trực tiếp với các tập đoàn lớn (FMCG, Tech) đang cần nền tảng để minh bạch hóa chiến dịch CSR thường niên của họ với báo chí.
Bước đầu thâm nhập thị trường khu vực thông qua việc triển khai thí điểm (pilot) tại các chi nhánh Đông Nam Á của các mạng lưới đối tác toàn cầu (Global Youth/CSR Networks).
Pháp lý: Thực hiện kiểm toán bảo mật (Security & Compliance Audit) chuẩn ISO 27001 để vượt qua vòng thẩm định công nghệ của các doanh nghiệp Enterprise.
Giai đoạn 4: Financial Ecosystem Integration (2029)
Sản phẩm: Tích hợp Open Banking (Tự động đối soát giao dịch ngân hàng với chứng từ được duyệt). Hoàn thiện Mobile App riêng biệt.
Phân phối/Marketing: Trở thành nền tảng lõi (Core platform) được khuyên dùng bởi các cơ quan quản lý nhà nước về hoạt động thiện nguyện. Xây dựng cộng đồng chia sẻ nguồn tài trợ minh bạch (Sponsor Matching).
Định vị: Đây không chỉ là một SaaS quản lý tài chính, mà là "Chứng chỉ tín nhiệm số" (Digital Trust Certificate) không thể thiếu cho bất kỳ dự án cộng đồng nào tại Đông Nam Á muốn gọi vốn từ các quỹ CSR toàn cầu.


VII. Addition
Chỉ sử dụng form cho việc chứng minh vấn đề thôi có đang bị yếu?
Góp ý của Quỳnh: Thêm các tầng bằng chứng
 1. Form: mục tiêu mẫu khoảng trên 50-100 và quan trọng là hỏi về hành vi quá khứ thay vì cảm nhận: “Lần gần nhất CLB bạn làm báo cáo tài chính mất bao nhiêu ngày?”, “Dự án gần nhất có bao nhiêu khoản chi bị thiếu chứng từ?” thay vì “Bạn có thấy khó khăn không?”.
2. Phỏng vấn sâu 5-10 các trưởng/phó ban và ghi lại câu quote nguyên văn. Ví dụ 1 câu như “Em phải nhắn 14 lần trong nhóm mới gom đủ bill cho đợt trung thu”.
3. Bằng chứng vật lý: ảnh chụp màn hình (che tên) file Excel lộn xộn thật, đoạn chat đòi bill thật.

Chủ đề cuộc thi là Glocal (Global+Local), vấn đề đang bị Local không?
Góp ý của Quỳnh: Thêm tầm nhìn khi kể
1. Định vị vấn đề là toàn cầu: thêm 1 câu pitch, ví dụ “Minh bạch tài chính cho tổ chức phi lợi nhuận nhỏ là bài toán toàn cầu và chúng tôi giải nó từ bối cảnh Việt Nam.”
2. Gắn tác động với SDGs
3. Thêm khả năng nhân rộng của giải pháp: thêm 1 câu pitch, ví dụ “Mô hình có khả năng nhân rộng sang Đông Nam Á, khu vực dẫn đầu thế giới về tỷ lệ quyên góp cộng đồng nhưng cùng đối mặt khủng hoảng niềm tin về minh bạch, sau khi hoàn tất thông qua tại Việt Nam.”


1. Các phần mềm như Odoo và MISA đều làm được như idea của mình, phải làm gì để tạo sự khác biệt?

Góp ý của Quỳnh:
1. Đổi câu định vị: Đừng đứng chung sân “phần mềm quản lý tài chính”.
Odoo/MISA quản tiền bên trong một tổ chức có kế toán, có tài khoản.
Mình giải bài toán chúng không được thiết kế để giải: Gom chứng từ từ đám đông không tài khoản và mở dashboard cho người ngoài, như nhà tài trợ nhìn thấy.
=> “Họ xây cho người quản tiền. Mình xây cho cả hai phía của đồng tiền - người quản và người cho.”  => USP
Chứng minh bằng tính khả thi, không bằng tính năng.
Đúng là Odoo customize được mọi thứ, nhưng customize không hề đơn giản với tất cả mọi người => Cần chi phí (tiền + thời gian) đào tạo người để làm quen với công cụ đó. Tương tự như MISA.
Mình chỉ vài phút phút tạo dự án, phí 0-499k. => CÓ LỢI HƠN
Dữ liệu câu 9 khảo sát: khoảng 96% mẫu không dùng phần mềm kế toán nào => Thị trường này chưa xuất hiện nhiều phần mềm kế toán (Công cụ hiện có không vừa với họ: quá đắt, quá phức tạp, đòi nghiệp vụ kế toán)
Xây 1 thứ họ không bao giờ xây: Trang minh bạch công khai.
Mỗi dự án có một trang công khai => Ai có link đều xem được, không cần tài khoản. Trang hiển thị tiền đã nhận, đã chi, còn lại (cập nhật tức thì), và bấm vào bất kỳ con số nào sẽ hiện đúng tấm bill gốc chứng minh cho nó. CLB chỉ việc dán link này vào bài kêu gọi tài trợ => Người ủng hộ có thể kiểm chứng từng đồng.
ERP sinh ra để giấu số liệu: Doanh nghiệp trả tiền để càng ít người thấy càng tốt. Sản phẩm của mình sinh ra để khoe số liệu: Tổ chức cộng đồng cần càng nhiều người thấy càng tốt, vì niềm tin chính là thứ giúp họ xin được tài trợ.
Cách vá dữ liệu:
Thêm 3-4 câu hỏi phía sponsor vào bộ phỏng vấn sâu:
Phỏng vấn 3-5 “người cho tiền” như cán bộ Đoàn/phòng CTSV duyệt kinh phí CLB, một doanh nghiệp/quán từng tài trợ sự kiện sinh viên.
Hỏi: "Anh/chị có biết tiền mình tài trợ được tiêu thế nào không? Muốn biết không? Nếu một CLB cho anh/chị xem dòng tiền real-time, điều đó ảnh hưởng gì đến quyết định tài trợ lần sau?"
=> Bằng chứng cần cho vế “người cho tiền” của USP.
Khi pitch, ghép hai nguồn:
Form chứng minh phía cung (CLB không thể minh bạch dù muốn) + phỏng vấn sponsor chứng minh phía cầu (người cho tiền muốn nhìn)
2. Khi phát triển đối tượng sử dụng lên hơn thì phần mềm này sẽ bất lợi so với Odoo và MISA phải làm sao?

Góp ý của Quỳnh:

Không bao giờ vào sân họ: Ranh giới sản phẩm vĩnh viễn là dòng tiền tài trợ xuyên tổ chức. Không lấn sang kế toán nội bộ (công nợ, lương, thuế).

Phát triển theo chiều dọc phân khúc, không theo chiều ngang tính năng:

CLB => trường (B2H) => quỹ/NGO => doanh nghiệp CSR => Vẫn một sản phẩm lõi, chỉ đổi người trả tiền.

Chặng
Ai trả tiền
Họ trả để được gì
Sản phẩm phải thêm gì
1. CLB
Chính CLB (quỹ dự án)

199-499k/dự án
Đỡ khổ khi gom bill + có báo cáo minh bạch nộp nhà tài trợ
Sản phẩm lõi nguyên bản
2. Trường (B2H)
Đoàn/Hội,...

15-30tr/năm
Giám sát hàng chục CLB trực thuộc trên một màn hình
Gần như không: chỉ thêm 1 dashboard tổng nhìn xuống nhiều dự án
3. Quỹ/NGO
Chính tổ chức

1.5-3tr/tháng
Tuân thủ pháp lý + dấu vết kiểm toán để báo cáo nhà tài trợ lớn
Phân quyền đa cấp, mẫu báo cáo chuẩn
4. Doanh nghiệp CSR
Công ty tài trợ => giá cao nhất
Theo dõi tiền của mình sau khi chuyển cho bên thứ ba
White-label, export vào ERP


Doanh nghiệp càng lớn càng chi nhiều tiền tài trợ cho các nhóm bên ngoài như CLB, thiện nguyện, quỹ. Nhưng tiền vừa chuyển đi là công ty mất dấu, bên nhận không dùng ERP, chỉ có Zalo và Sheets. Mình chính là công cụ theo dõi đoạn đường mà tiền đi sau khi rời tài khoản công ty.

Bổ trợ thay vì đối đầu: Dài hạn sẽ export/API đổ dữ liệu sạch vào Odoo/MISA của khách => Mình thành nguồn cấp cho hệ thống của họ, họ hết lý do thay mình.

1. Pilot đang chọn sai tệp ưu tiên, CLB thay vì nhóm thiện nguyện?
Vấn đề: Kế hoạch pilot ban đầu chọn 3-5 CLB làm nhóm thử nghiệm đầu tiên.
NHƯNG CLB nhận tài trợ để hoạt động nội bộ, không có áp lực giải trình từ bên ngoài → động lực bật tính năng minh bạch công khai thấp, thậm chí có xu hướng ngại công khai (sợ bị soi khoản chi tiêu tiết kiệm giữ quỹ).
=> Trong khi nhóm thiện nguyện nhận tiền từ người lạ quyên góp → bị đòi sao kê trực tiếp → cần công cụ minh bạch để tồn tại, không phải bị thuyết phục mới dùng.
Góp ý của Vy: Đảo cơ cấu pilot và ưu tiên chứng minh bằng số liệu, không chỉ bằng cảm tính.
Đổi cơ cấu pilot: từ “3-5 CLB” → 2-3 nhóm thiện nguyện + 1-2 CLB. Nhóm thiện nguyện có áp lực sao kê thúc sau lưng nên dùng thật nhanh hơn, case study đầu tiên có sức thuyết phục hơn. TÓM LẠI: LIỆU MÌNH NÊN HƯỚNG ĐẾN CÁC NHÓM THIỆN NGUYỆN HƠN?
Đổi thứ tự trong deck (SOM): từ “CLB sinh viên & nhóm thiện nguyện: → “nhóm thiện nguyện & CLB sinh viên”, kèm 1 câu lý do: “ưu tiên nhóm thiện nguyện vì áp lực minh bạch trực tiếp từ cộng đồng quyên góp”.
Lọc câu trả lời trong form theo 2 nhóm (Câu 2: CLB vs Thiện nguyện), so sánh điểm trung bình Câu 16 ("mức độ đau khi giải trình nhà tài trợ / sợ mất uy tín") giữa 2 nhóm.
→ Nếu thiện nguyện có điểm đau cao hơn rõ rệt → đó là số liệu thật chứng minh nên ưu tiên pilot + SOM cho nhóm thiện nguyện trước, thay vì chỉ dựa suy luận logic.
Trong phỏng vấn sâu, hỏi thêm (tế nhị) về văn hóa “tiêu tiết kiệm giữ quỹ” của CLB, và hỏi thẳng: CLB có sẵn sàng bật Cổng minh bạch công khai cho người ngoài xem không, hay chỉ muốn dùng phần quản lý bill nội bộ để đo mức độ CLB có đang resist chính feature lõi của sản phẩm hay không.
