
let circulationLogs = [
  {
    logId: "L001",
    studentCode: "SV01",
    bookIsbn: "ISBN001",
    status: "BORROWING",
    fineAmount: 0,
    overdueDays: 0,
    borrowDate: "2026-10-01",
    paid: false
  },
  {
    logId: "L002",
    studentCode: "SV02",
    bookIsbn: "ISBN002",
    status: "RETURNED",
    fineAmount: 10000,
    overdueDays: 2,
    borrowDate: "2026-09-25",
    paid: true
  },
  {
    logId: "L003",
    studentCode: "SV03",
    bookIsbn: "ISBN003",
    status: "BORROWING",
    fineAmount: 0,
    overdueDays: 0,
    borrowDate: "2026-10-03",
    paid: false
  }
];

let validStudents = ["SV01", "SV02", "SV03", "SV04"];

let studentCode = "SV04";
let bookIsbn = "ISBN004";
let logId = "L004";

let studentValid = false;

for (let i = 0; i < validStudents.length; i++) {
  if (validStudents[i] === studentCode) {
    studentValid = true;
    break;
  }
}

if (studentValid) {
  circulationLogs.push({
    logId: logId,
    studentCode: studentCode,
    bookIsbn: bookIsbn,
    status: "BORROWING",
    fineAmount: 0,
    overdueDays: 0,
    borrowDate: "2026-10-09",
    paid: false
  });

  console.log("Muon sach thanh cong.");
} else {
  console.log("Ma sinh vien khong hop le.");
}

let returnLogId = "L001";
let returnStatus = "RETURNED";
let overdueDays = 3;

for (let i = 0; i < circulationLogs.length; i++) {
  if (circulationLogs[i].logId === returnLogId &&
      circulationLogs[i].status === "BORROWING") {

    circulationLogs[i].status = returnStatus;
    circulationLogs[i].overdueDays = overdueDays;

    if (returnStatus === "LOST") {
      circulationLogs[i].fineAmount = 200000;
    } else {
      circulationLogs[i].fineAmount = overdueDays * 5000;
    }

    console.log("Da cap nhat giao dich " + returnLogId);
    break;
  }
}

let currentDate = new Date("2026-10-09");

for (let i = circulationLogs.length - 1; i >= 0; i--) {
  let borrowDate = new Date(circulationLogs[i].borrowDate);
  let daysPassed = (currentDate - borrowDate) / (1000 * 60 * 60 * 24);

  if (circulationLogs[i].status === "RETURNED" &&
      circulationLogs[i].paid === true &&
      daysPassed > 30) {
    circulationLogs.splice(i, 1);
  }
}

let borrowingCount = 0;
let totalFineCollected = 0;

console.log("\n========== BAO CAO MUON TRA SACH ==========");
console.log("Ma GD | Ma SV | ISBN | Trang thai | Tien phat");

for (let i = 0; i < circulationLogs.length; i++) {
  let log = circulationLogs[i];

  console.log(
    log.logId + " | " +
    log.studentCode + " | " +
    log.bookIsbn + " | " +
    log.status + " | " +
    log.fineAmount + " VND"
  );

  if (log.status === "BORROWING") {
    borrowingCount++;
  }

  if (log.paid === true) {
    totalFineCollected += log.fineAmount;
  }
}

console.log("--------------------------------------------");
console.log("So giao dich dang muon: " + borrowingCount);
console.log("Tong tien phat da thu: " + totalFineCollected + " VND");
console.log("============================================");