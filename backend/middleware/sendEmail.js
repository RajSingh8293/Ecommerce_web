import nodemailer from "nodemailer";

export const sendEmail = async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      // host: "smtp.gmail.com",
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      // secure: true,
      service: process.env.SMPT_SERVICE,
      auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASS,
      },
    });

    const mailOptions = {
      from: process.env.USER,
      to: data.email,
      subject: data.subject,
      text: data.message,
    };

    await transporter.sendMail(mailOptions);

    // await transporter.sendMail({
    //   from: process.env.USER,
    //   to: email,
    //   subject: subject,
    //   text: text,
    // });

    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};
