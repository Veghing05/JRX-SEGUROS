import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método não permitido' });
  }

  const { nome, email, mensagem } = req.body;

  // Crie o transportador do nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${nome}" <${email}>`,
    to: process.env.DEST_EMAIL,
    subject: 'Nova mensagem do site JRX Seguros',
    text: `Nome: ${nome}\nEmail: ${email}\nMensagem:\n${mensagem}`,
  };

  try {
    // Envia o e-mail
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Email enviado com sucesso.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Erro ao enviar e-mail.' });
  }
}
