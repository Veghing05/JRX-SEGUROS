import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { nome, email, mensagem } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${nome}" <${email}>`,
      to: process.env.DEST_EMAIL,
      subject: 'Nova mensagem do site JRX Seguros',
      text: `Nome: ${nome}\nEmail: ${email}\nMensagem:\n${mensagem}`,
    });

    return res.status(200).json({ message: 'Email enviado com sucesso!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao enviar o email' });
  }
}
