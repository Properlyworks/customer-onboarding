import { createTransport } from "nodemailer";
const Excel = require("exceljs");

export const run = async () => {
  const filename = "Debtors.xlsx";
  let workbook = new Excel.Workbook();
  let worksheet = workbook.addWorksheet("Debtors");
  worksheet.columns = [
    { header: "First Name", key: "firstName" },
    { header: "Last Name", key: "lastName" },
    { header: "Purchase Price", key: "purchasePrice" },
    { header: "Payments Made", key: "paymentsMade" },
  ];
  let data = [
    {
      firstName: "John",
      lastName: "Bailey",
      purchasePrice: 1000,
      paymentsMade: 100,
    },
    {
      firstName: "Leonard",
      lastName: "Clark",
      purchasePrice: 1000,
      paymentsMade: 150,
    },
  ];
  data.forEach((e) => {
    worksheet.addRow(e);
  });
  const buffer = await workbook.xlsx.writeBuffer();
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: "properlyworksdelta@gmail.com",
      pass: "pcnkllqofvayxswl",
    },
  });
  const mailOptions = {
    from: "properlyworksdelta@gmail.com",
    to: ["sreeharshakonduru@gmail.com"],
    subject: "Test",
    html: "Thanks for reaching out to properly works",
    attachments: [
      {
        filename,
        content: buffer,
        contentType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ],
  };
  await transporter.sendMail(mailOptions);
};
