import fs from 'node:fs/promises';

const FORM_ID = '1FAIpQLSexwDkGe-XL2Pd7rxsATeTGU7i-yrTouAXT2bz303DUha-57g';
const VIEW_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/viewform?hl=vi`;
const SUBMIT_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;
const AUDIT_PATH = new URL('./synthetic-seed-68.json', import.meta.url);

const E = {
  q1: '792480985', q2: '503689437', q3: '1826108745', q4: '782240152',
  q5: '1789510337', q6: '370310528', q7: '1763469728', q8: '303694722',
  q9: '1148266930', q10: '1861962672', q11: '1172035025', q12: '66305808',
  q13: '1464531368', q14: '254075368', q15: '2057318522', q16: '1259334091',
  q17: '1211646647', q18: '689358872', q19: '2116389813',
};

const O = {
  q1: [
    'Có, mình là người phụ trách chính về tài chính/chứng từ.',
    'Có, mình hỗ trợ người phụ trách tài chính/chứng từ.',
    'Có, mình là thành viên thường phát sinh khoản chi và nộp chứng từ.',
    'Không, mình chưa từng tham gia các công việc trên trong 12 tháng qua.',
  ],
  q2: [
    'CLB/Đội/Nhóm sinh viên trực thuộc trường hoặc khoa.',
    'Nhóm thiện nguyện tự phát.',
    'Dự án cộng đồng độc lập.',
    'Tổ chức phi lợi nhuận/quỹ xã hội có đăng ký.',
    'Dự án CSR của doanh nghiệp.',
    '__other_option__',
  ],
  q3: ['Dưới 10 triệu VNĐ.', 'Từ 10 đến dưới 20 triệu VNĐ.', 'Từ 20 đến dưới 50 triệu VNĐ.', 'Từ 50 đến 100 triệu VNĐ.', 'Trên 100 triệu VNĐ.', 'Mình không nắm rõ.'],
  q4: ['Dưới 10 khoản.', '10-30 khoản.', '31-50 khoản.', '51-100 khoản.', 'Trên 100 khoản.', 'Mình không nắm rõ.'],
  q5: ['1-3 người.', '4-10 người.', '11-20 người.', '21-50 người.', 'Trên 50 người.', 'Mình không nắm rõ.'],
  q6: ['Đã gom đủ ngay trong lúc dự án diễn ra.', '1-3 ngày.', '4-7 ngày.', '1-2 tuần.', 'Trên 2 tuần.', 'Mình không nắm rõ.'],
  q7: ['Dưới nửa ngày.', '0,5-1 ngày.', '1-2 ngày.', '3-5 ngày.', 'Trên 5 ngày.', 'Dự án chưa hoàn thành bước này.', 'Mình không nắm rõ.'],
  q8: ['Không cần nhắc.', '1-3 lần.', '4-10 lần.', '11-20 lần.', 'Trên 20 lần.', 'Phải nhắc liên tục nên không thể ước tính.', 'Mình không nắm rõ.'],
  q9: ['Microsoft Excel.', 'Google Sheets.', 'Google Forms.', 'Google Drive hoặc dịch vụ lưu trữ đám mây khác.', 'Zalo/Messenger hoặc ứng dụng nhắn tin khác.', 'Phần mềm kế toán.', 'Sổ sách hoặc chứng từ giấy.'],
  q10: ['Group chat chung trên Zalo/Messenger.', 'Nhắn riêng cho người phụ trách.', 'Google Forms.', 'Thư mục Google Drive hoặc dịch vụ lưu trữ khác.', 'Email.', 'Nộp chứng từ giấy trực tiếp.'],
  q11: ['Dưới 1 phút.', '1-5 phút.', '6-10 phút.', '11-30 phút.', 'Trên 30 phút.', 'Đã có trường hợp không tìm lại được.', 'Mình không nắm rõ.'],
  q12: ['Có thể trả lời chính xác ngay.', 'Có thể trả lời nhưng phải kiểm tra lại một nguồn dữ liệu.', 'Phải kiểm tra và tổng hợp từ nhiều nguồn khác nhau.', 'Chỉ biết chính xác sau khi gom đủ chứng từ và đối soát.', 'Thường không xác định được chính xác khi dự án đang diễn ra.', 'Mình không nắm rõ.'],
  q13: ['Thiếu chứng từ cho một khoản chi đã phát sinh.', 'Chứng từ bị mờ, thiếu thông tin hoặc không hợp lệ.', 'Nhập sai số tiền, ngày hoặc nội dung khoản chi.', 'Không xác định được khoản chi thuộc hạng mục ngân sách nào', 'Chứng từ hoặc khoản chi bị nhập trùng.', 'Giao dịch không khớp với chứng từ.', 'Chi vượt ngân sách của một hạng mục.', 'Chỉ phát hiện sai sót sau khi khoản chi đã xảy ra quá lâu.', 'Số liệu giữa các file hoặc công cụ không khớp nhau.'],
  q14: ['Hầu như dự án nào cũng xảy ra.', 'Xảy ra trong phần lớn dự án.', 'Xảy ra trong khoảng một nửa số dự án.', 'Thỉnh thoảng xảy ra.', 'Hiếm khi xảy ra.', 'Chưa từng xảy ra.', 'Mình không nắm rõ.'],
  q15: ['Phải liên hệ và nhắc lại nhiều thành viên.', 'Phải kiểm tra hoặc làm lại báo cáo.', 'Báo cáo bị trễ hạn.', 'Phải điều chỉnh hoặc cắt giảm ngân sách ở giai đoạn sau.', 'Thành viên/người phụ trách phải ứng hoặc bù tiền cá nhân.', 'Phải giải trình lại với Lead, nhà trường hoặc đơn vị chủ quản.', 'Phải giải trình lại với nhà tài trợ.', 'Gây mâu thuẫn hoặc căng thẳng trong nội bộ.', 'Làm người phụ trách tài chính quá tải hoặc không muốn tiếp tục đảm nhiệm vai trò.', 'Ảnh hưởng đến uy tín hoặc khả năng xin tài trợ của tổ chức.'],
  q18: ['Gom và lưu chứng từ tập trung, dễ tìm lại.', 'Tự động nhập dữ liệu từ bill, hóa đơn hoặc ảnh chuyển khoản.', 'Nhắc thành viên nộp hoặc bổ sung chứng từ.', 'Theo dõi số tiền còn lại của từng hạng mục theo thời gian thực.', 'Cảnh báo khi khoản chi gần/vượt ngân sách hoặc sai hạng mục.', 'Phát hiện chứng từ trùng hoặc dữ liệu sai lệch.', 'Đối chiếu chứng từ với giao dịch.', 'Tự động tổng hợp và xuất báo cáo tài chính.', '__other_option__'],
  q19: ['Có, mình muốn đăng ký tham gia.', 'Có thể cân nhắc trong tương lai.', 'Chưa có nhu cầu.', 'Không muốn sử dụng.'],
};

const TARGET = {
  q1: [20, 16, 28, 4], q2: [39, 12, 6, 3, 1, 3], q3: [9, 16, 22, 10, 3, 4],
  q4: [6, 16, 25, 10, 5, 2], q5: [6, 28, 19, 8, 2, 1], q6: [3, 10, 17, 20, 13, 1],
  q7: [13, 26, 16, 6, 2, 1, 0], q8: [3, 13, 26, 10, 3, 9, 0],
  q9: [27, 50, 12, 25, 47, 3, 12], q10: [46, 34, 6, 13, 2, 5],
  q11: [3, 13, 16, 12, 8, 8, 4], q12: [5, 14, 18, 17, 7, 3],
  q13: [41, 29, 23, 14, 13, 11, 19, 18, 23], q13Other: 5,
  q14: [20, 16, 13, 11, 3, 1, 0],
  q15: [39, 29, 23, 12, 25, 16, 10, 14, 13, 8], q15Other: 7,
  q16: [2, 5, 10, 27, 20], q17: 19,
  q18: [16, 14, 8, 11, 6, 2, 3, 1, 3], q19: [29, 25, 8, 2],
};

function mulberry32(seed) {
  return () => {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
const rng = mulberry32(20260823);
const noise = () => rng() * 2 - 1;

function shuffle(a) {
  a = [...a];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function expanded(options, counts) {
  return counts.flatMap((count, i) => Array(count).fill(options[i]));
}

function assignRanked(rows, key, options, counts, score, optionOrder = options) {
  const ranked = [...rows].sort((a, b) => score(a) - score(b));
  const values = expanded(optionOrder, counts);
  if (values.length !== ranked.length) throw new Error(`${key}: target count mismatch`);
  ranked.forEach((row, i) => row[key] = values[i]);
}

function selectMulti(rows, key, options, counts, score, excluded = new Set()) {
  rows.forEach(r => r[key] = []);
  options.forEach((option, oi) => {
    const candidates = rows.filter(r => !excluded.has(r.id)).sort((a, b) => score(b, oi) - score(a, oi));
    candidates.slice(0, counts[oi]).forEach(r => r[key].push(option));
  });
  for (const empty of rows.filter(r => !excluded.has(r.id) && r[key].length === 0)) {
    let moved = false;
    for (const option of options) {
      const donor = rows.find(r => !excluded.has(r.id) && r[key].length > 1 && r[key].includes(option) && !empty[key].includes(option));
      if (donor) {
        donor[key] = donor[key].filter(v => v !== option);
        empty[key].push(option);
        moved = true;
        break;
      }
    }
    if (!moved) throw new Error(`${key}: cannot repair empty response`);
  }
}

function assignAtMostTwo(rows, key, options, counts) {
  rows.forEach(r => r[key] = []);
  const remaining = [...counts];
  const rowOrder = shuffle(rows);
  for (const row of rowOrder) {
    const choices = options.map((_, i) => i).filter(i => remaining[i] > 0)
      .sort((a, b) => (remaining[b] + rng() * 2) - (remaining[a] + rng() * 2));
    const chosen = choices[0];
    row[key].push(options[chosen]);
    remaining[chosen]--;
  }
  const extraSlots = remaining.reduce((a, b) => a + b, 0);
  for (const row of shuffle(rows).slice(0, extraSlots)) {
    const candidates = options.map((_, i) => i).filter(i => remaining[i] > 0 && !row[key].includes(options[i]));
    if (!candidates.length) throw new Error(`${key}: no valid second choice`);
    candidates.sort((a, b) => remaining[b] - remaining[a] || a - b);
    const chosen = candidates[0];
    row[key].push(options[chosen]);
    remaining[chosen]--;
  }
  if (remaining.some(Boolean)) throw new Error(`${key}: unresolved counts ${remaining}`);
}

function buildRows() {
  const eligible = Array.from({ length: 64 }, (_, i) => ({
    id: i + 1,
    eligible: true,
    complexity: Math.min(1, Math.max(0, (i + 0.5) / 64 + noise() * 0.13)),
    pressure: Math.min(1, Math.max(0, (i + 0.5) / 64 + noise() * 0.17)),
  }));
  const q1Values = shuffle(expanded(O.q1.slice(0, 3), TARGET.q1.slice(0, 3)));
  eligible.forEach((r, i) => r.q1 = q1Values[i]);
  const ineligible = Array.from({ length: 4 }, (_, i) => ({ id: 65 + i, eligible: false, q1: O.q1[3] }));

  assignRanked(eligible, 'q2', O.q2, TARGET.q2, r => r.complexity + noise() * .45, [O.q2[0], O.q2[1], O.q2[2], O.q2[3], O.q2[4], O.q2[5]]);
  const q2Other = ['Ban tổ chức sự kiện sinh viên độc lập', 'Nhóm gây quỹ cộng đồng tại địa phương', 'Mạng lưới tình nguyện viên liên trường'];
  eligible.filter(r => r.q2 === '__other_option__').forEach((r, i) => r.q2Other = q2Other[i]);
  assignRanked(eligible, 'q3', O.q3, TARGET.q3, r => r.complexity + noise() * .25);
  assignRanked(eligible, 'q4', O.q4, TARGET.q4, r => r.complexity + noise() * .18);
  assignRanked(eligible, 'q5', O.q5, TARGET.q5, r => r.complexity + noise() * .22);
  assignRanked(eligible, 'q6', O.q6, TARGET.q6, r => .65 * r.pressure + .35 * r.complexity + noise() * .18);
  assignRanked(eligible, 'q7', O.q7, TARGET.q7, r => .55 * r.complexity + .45 * r.pressure + noise() * .28);
  assignRanked(eligible, 'q8', O.q8, TARGET.q8, r => .7 * r.pressure + .3 * r.complexity + noise() * .16);

  selectMulti(eligible, 'q9', O.q9, TARGET.q9, (r, oi) => {
    const bias = [0.2, 0.75, 0.15, 0.35, 0.65, -0.6, -0.1][oi];
    return bias + noise() * .8 + (oi === 5 ? r.complexity * .4 : 0);
  });
  assignAtMostTwo(eligible, 'q10', O.q10, TARGET.q10);
  assignRanked(eligible, 'q11', O.q11, TARGET.q11, r => .65 * r.pressure + .35 * r.complexity + noise() * .2);
  assignRanked(eligible, 'q12', O.q12, TARGET.q12, r => .55 * r.pressure + .45 * r.complexity + noise() * .2);

  assignRanked(eligible, 'q14', O.q14, TARGET.q14, r => -(r.pressure + noise() * .2));
  const neverRow = eligible.find(r => r.q14 === O.q14[5]);
  const excluded = new Set([neverRow.id]);
  selectMulti(eligible, 'q13', O.q13, TARGET.q13, (r, oi) => r.pressure * .8 + r.complexity * .2 + noise() * .65 + oi * .003, excluded);
  selectMulti(eligible, 'q15', O.q15, TARGET.q15, (r, oi) => r.pressure * .85 + r.complexity * .15 + noise() * .7 + oi * .003, excluded);

  const issueOthers = [
    [neverRow, 'Không gặp tình huống nào'],
    ...shuffle(eligible.filter(r => r !== neverRow)).slice(0, 4).map((r, i) => [r, [
      'Bill nộp không ghi rõ người chi', 'Ảnh chứng từ bị cắt mất phần ngày tháng',
      'Khoản hoàn ứng bị ghi nhận chậm', 'Nội dung chuyển khoản quá chung chung',
    ][i]]),
  ];
  issueOthers.forEach(([r, text]) => { r.q13Other = text; });
  const consequenceOthers = [
    [neverRow, 'Chưa gây hậu quả đáng kể'],
    ...shuffle(eligible.filter(r => r !== neverRow)).slice(0, 6).map((r, i) => [r, [
      'Mất thêm thời gian họp để đối soát', 'Phải dời ngày công khai báo cáo',
      'Không kịp chốt hoàn ứng cho thành viên', 'Phải rà lại toàn bộ lịch sử tin nhắn',
      'Khó bàn giao dữ liệu cho nhiệm kỳ sau', 'Nhà tài trợ yêu cầu bổ sung hồ sơ nhiều lần',
    ][i]]),
  ];
  consequenceOthers.forEach(([r, text]) => { r.q15Other = text; });

  const primary = eligible.filter(r => r.q1 === O.q1[0]);
  const nonPrimary = eligible.filter(r => r.q1 !== O.q1[0]);
  assignRanked(primary, 'q16', ['3', '4', '5'], [1, 10, 9], r => r.pressure + noise() * .15);
  assignRanked(nonPrimary, 'q16', ['1', '2', '3', '4', '5'], [2, 5, 9, 17, 11], r => r.pressure + noise() * .12);

  const quotes = [
    'Đến lúc chốt báo cáo mới phát hiện một bạn gửi bill ở tin nhắn riêng từ hai tuần trước, cả nhóm phải lục lại từng đoạn chat.',
    'Có bill bị mờ mất phần số tiền, hỏi lại thì người mua cũng không còn nhớ nên mình phải đối chiếu sao kê và lịch sử chuyển khoản.',
    'Mình nhắc bill gần như mỗi ngày nhưng vẫn có vài khoản chỉ được gửi sau khi sự kiện kết thúc hơn một tuần.',
    'Một khoản bị nhập hai lần vì ảnh được gửi cả trong nhóm lẫn tin nhắn riêng, may là phát hiện trước khi gửi báo cáo.',
    'Có bạn quên lấy hóa đơn nên người phụ trách phải tự bù khoản chênh lệch để kịp chốt sổ.',
    'Lead hỏi còn bao nhiêu ngân sách nhưng dữ liệu nằm ở ba file khác nhau, mình mất gần một buổi mới trả lời chắc chắn.',
    'Ảnh chuyển khoản không ghi nội dung, vài ngày sau không ai nhớ đó là chi cho hạng mục nào.',
    'Bill giấy được gom trong một túi, lúc cần đối chiếu thì có một tờ bị nhòe mực và không đọc được ngày.',
    'Nhà tài trợ yêu cầu giải trình gấp nhưng chứng từ nằm rải rác trên Drive và Zalo nên cả nhóm phải tìm lại từ đầu.',
    'Mình từng làm xong báo cáo rồi mới nhận thêm ba bill cũ, cuối cùng phải sửa lại toàn bộ số liệu.',
    'Có khoản vượt ngân sách nhưng chỉ phát hiện khi tổng hợp cuối kỳ vì trong lúc chạy dự án không có số dư theo hạng mục.',
    'Thành viên gửi bill nhưng không ghi tên hoạt động, mình phải hỏi từng người để phân loại lại.',
    'Một bạn đổi điện thoại nên mất ảnh hóa đơn đã chụp, nhóm phải liên hệ cửa hàng xin lại chứng từ.',
    'Mình nhớ nhất lần cả nhóm tranh luận vì số liệu trên Excel và tổng tiền trong nhóm chat không khớp nhau.',
    'Chỉ riêng việc nhắc mọi người đặt đúng tên file đã mất nhiều thời gian hơn cả khâu lập báo cáo.',
    'Có giao dịch đúng số tiền nhưng khác ngày trên bill, mình phải kiểm tra lại với cả người mua và thủ quỹ.',
    'Khi bàn giao cho nhiệm kỳ sau, thư mục chứng từ không có cấu trúc nên các bạn mới gần như phải sắp xếp lại từ đầu.',
    'Một bill gửi quá muộn làm báo cáo trễ hạn và mình phải giải thích lại với đơn vị chủ quản.',
    'Lúc cao điểm có quá nhiều ảnh bill trong group, tin nhắn mới đẩy chứng từ cũ trôi rất nhanh nên tìm lại cực kỳ mệt.',
  ];
  shuffle(eligible).slice(0, TARGET.q17).forEach((r, i) => r.q17 = quotes[i]);

  const q18Values = shuffle(expanded(O.q18, TARGET.q18));
  eligible.forEach((r, i) => r.q18 = q18Values[i]);
  const q18Others = ['Phân quyền phê duyệt khoản chi rõ ràng', 'Tạo mã hồ sơ và lịch sử chỉnh sửa cho từng chứng từ', 'Bàn giao dữ liệu tài chính dễ dàng giữa các nhiệm kỳ'];
  eligible.filter(r => r.q18 === '__other_option__').forEach((r, i) => r.q18Other = q18Others[i]);
  const q19Values = shuffle(expanded(O.q19, TARGET.q19));
  eligible.forEach((r, i) => r.q19 = q19Values[i]);

  return [...eligible, ...ineligible];
}

function countValues(rows, key, options) {
  return options.map(option => rows.filter(r => Array.isArray(r[key]) ? r[key].includes(option) : r[key] === option).length);
}
function assertEqual(label, actual, expected) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${label}: got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)}`);
  }
}

function validate(rows) {
  const eligible = rows.filter(r => r.eligible);
  assertEqual('row totals', [rows.length, eligible.length], [68, 64]);
  for (const key of ['q1']) assertEqual(key, countValues(rows, key, O[key]), TARGET[key]);
  for (const key of ['q2','q3','q4','q5','q6','q7','q8','q9','q10','q11','q12','q13','q14','q15','q18','q19']) {
    assertEqual(key, countValues(eligible, key, O[key]), TARGET[key]);
  }
  assertEqual('q13 other', eligible.filter(r => r.q13Other).length, TARGET.q13Other);
  assertEqual('q15 other', eligible.filter(r => r.q15Other).length, TARGET.q15Other);
  assertEqual('q16', countValues(eligible, 'q16', ['1','2','3','4','5']), TARGET.q16);
  assertEqual('q17', eligible.filter(r => r.q17).length, TARGET.q17);
  if (eligible.some(r => !r.q9.length || !r.q13.length && !r.q13Other || !r.q15.length && !r.q15Other)) throw new Error('Required multi-select answer missing');
  if (eligible.some(r => r.q10.length < 1 || r.q10.length > 2)) throw new Error('Q10 violates 1–2 selection limit');
  const avg = eligible.reduce((s, r) => s + Number(r.q16), 0) / 64;
  const primary = eligible.filter(r => r.q1 === O.q1[0]);
  const primaryAvg = primary.reduce((s, r) => s + Number(r.q16), 0) / primary.length;
  if (avg !== 3.90625 || primaryAvg !== 4.4) throw new Error(`Q16 averages invalid: ${avg}, ${primaryAvg}`);
  return { total: 68, eligible: 64, ineligible: 4, q16Average: avg, primaryCount: primary.length, primaryQ16Average: primaryAvg };
}

function appendAnswer(params, key, value, other) {
  const id = E[key];
  if (Array.isArray(value)) value.forEach(v => params.append(`entry.${id}`, v));
  else params.append(`entry.${id}`, value);
  if (other) {
    if (value !== '__other_option__' && !Array.isArray(value)) params.set(`entry.${id}`, '__other_option__');
    if (Array.isArray(value)) params.append(`entry.${id}`, '__other_option__');
    params.append(`entry.${id}.other_option_response`, other);
  }
}

function toParams(row, fbzx) {
  const p = new URLSearchParams();
  appendAnswer(p, 'q1', row.q1);
  if (row.eligible) {
    for (const key of ['q2','q3','q4','q5','q6','q7','q8','q9','q10','q11','q12','q13','q14','q15','q16']) appendAnswer(p, key, row[key], row[`${key}Other`]);
    if (row.q17) appendAnswer(p, 'q17', row.q17);
    appendAnswer(p, 'q18', row.q18, row.q18Other);
    appendAnswer(p, 'q19', row.q19);
    p.set('pageHistory', '0,1,2,3,4');
  } else {
    p.set('pageHistory', '0,5');
  }
  p.set('fvv', '1');
  p.set('draftResponse', '[]');
  if (fbzx) p.set('fbzx', fbzx);
  p.set('submissionTimestamp', '-1');
  return p;
}

async function fetchFbzx() {
  const response = await fetch(VIEW_URL);
  if (!response.ok) throw new Error(`Cannot load form: HTTP ${response.status}`);
  const html = await response.text();
  const match = html.match(/name="fbzx" value="([^"]+)"/);
  if (!match) throw new Error('Cannot find fbzx token');
  return match[1];
}

async function submit(row, fbzx) {
  const response = await fetch(SUBMIT_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded', 'user-agent': 'Mozilla/5.0 TestDataSeeder/1.0' },
    body: toParams(row, fbzx),
    redirect: 'follow',
  });
  const html = await response.text();
  const confirmed = response.ok && /(?:Đã ghi nhận câu trả lời của bạn|Câu trả lời của bạn đã được ghi lại|Your response has been recorded|form_confirm)/i.test(html);
  if (!confirmed) throw new Error(`Row ${row.id}: submission not confirmed (HTTP ${response.status}, URL ${response.url})`);
  return { id: row.id, status: response.status, confirmed: true };
}

const args = new Set(process.argv.slice(2));
const rows = buildRows();
const summary = validate(rows);
await fs.writeFile(AUDIT_PATH, JSON.stringify({ generatedAt: new Date().toISOString(), synthetic: true, summary, targets: TARGET, rows }, null, 2));
console.log(JSON.stringify({ mode: args.has('--submit') ? 'submit' : 'dry-run', auditPath: AUDIT_PATH.pathname, ...summary }, null, 2));

if (args.has('--submit')) {
  const fbzx = await fetchFbzx();
  const onlyArg = process.argv.find(a => a.startsWith('--only='));
  const fromArg = process.argv.find(a => a.startsWith('--from='));
  const toArg = process.argv.find(a => a.startsWith('--to='));
  const selected = onlyArg
    ? rows.filter(r => r.id === Number(onlyArg.split('=')[1]))
    : (fromArg || toArg)
      ? rows.filter(r =>
          (!fromArg || r.id >= Number(fromArg.split('=')[1])) &&
          (!toArg || r.id <= Number(toArg.split('=')[1])))
      : rows;
  let success = 0;
  for (const row of selected) {
    await submit(row, fbzx);
    success++;
    console.log(`submitted ${success}/${selected.length}: synthetic row ${row.id}`);
    if (selected.length > 1) await new Promise(resolve => setTimeout(resolve, 350));
  }
  console.log(JSON.stringify({ submitted: success, failed: 0 }));
}
