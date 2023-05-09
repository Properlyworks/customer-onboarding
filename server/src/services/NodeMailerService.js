const Nodemailer = require("nodemailer");
const Excel = require("exceljs");

const run = async () => {
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
  const transporter = Nodemailer.createTransport({
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

const submit = async (input) => {
  try {
    const { email, name, phone } = input;
    const filename = `${name}-${phone}-data.xlsx`;
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet("Data");
    worksheet.columns = [
      { header: "Question", key: "question" },
      { header: "Answer", key: "answer" },
    ];

    let data = [];
    Object.entries(input).forEach(([question, answer]) => {
      data.push({ question, answer });
    });

    data.forEach((e) => {
      worksheet.addRow(e);
    });

    const mails = ["sreeharshakonduru@gmail.com", email];
    const buffer = await workbook.xlsx.writeBuffer();
    const transporter = Nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "properlyworksdelta@gmail.com",
        pass: "pcnkllqofvayxswl",
      },
    });

    const mailOptionsToUser = {
      from: "Properly works <properlyworksdelta@gmail.com>",
      to: email,
      subject: "Project Quote on your way",
      html: `<h2>Hi ${name}, Thanks for reaching out to Properly Works</h2> <br> 
      <h3>We will get back to you in 24 - 48 hours</h3>`,
    };

    const mailOptionsToTeam = {
      from: "Properly works <properlyworksdelta@gmail.com>",
      to: "sreeharshakonduru@gmail.com",
      subject: "We got a lead",
      html: `Details in the attachment below.`,
      attachments: [
        {
          filename,
          content: buffer,
          contentType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      ],
    };

    email && (await transporter.sendMail(mailOptionsToUser));
    await transporter.sendMail(mailOptionsToTeam);
  } catch (e) {
    console.error(e);
  }
};

module.exports = { run, submit };
