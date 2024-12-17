import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/send-feedback', async (req, res) => {
  const { name, email, message } = req.body;

  // Email sender configuration
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, // TLS port
    secure: false, // Use `true` for port 465
    auth: {
      user: 'xdfeverharsh@gmail.com', // Replace with your Gmail address
      pass: 'tkxhtkfinrwhctxe',       // Replace with your App Password
    },
  });

  try {
    // Email options
    await transporter.sendMail({
      from: '"Feedback Form" <xdfeverharsh@gmail.com>',
      to: 'xdfeverharsh@gmail.com',
      subject: 'New Feedback Received',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Feedback</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      h2 {
        color: #333333;
        text-align: center;
      }
      p {
        line-height: 1.5;
        color: #555555;
        margin: 8px 0;
      }
      strong {
        color: #333333;
      }
      .footer {
        margin-top: 20px;
        font-size: 12px;
        text-align: center;
        color: #999999;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>New Feedback</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
      <div class="footer">
        <p>This email was automatically generated. Please do not reply.</p>
      </div>
    </div>
  </body>
</html>
      `,
    });

    res.status(200).send({ success: true, message: 'Feedback sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Failed to send feedback.' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
