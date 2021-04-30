// import { postEmail } from '@lib/api';
import type { NextApiRequest, NextApiResponse } from 'next'
import * as nodemailer from 'nodemailer'
// import Mail from "nodemailer/lib/mailer";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
//   token: string;
}

export default async (req: NextApiRequest, res: NextApiResponse<FormData>) => {
    const formData: FormData = req.body;
    console.log('formData')

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
        logger: true
    })

    try {
        const email = await transporter.sendMail({
            from: formData.email,
            to: 'kjheartbreaker@gmail.com',
            subject: `Contact Form Submission from ${formData.name}`,
            html: `<p>You have a new contact form submission</p><br>
        <p><strong>Name: </strong>${formData.name}</p><br>
        <p><strong>Email: </strong>${formData.email}<p><br>
        <p><strong>Phone: </strong>${formData.phone}</p><br>
        <p><strong>Message: </strong>${formData.message}</p><br>`
        })

        console.log('Message Sent', email.messageId)
    } catch (error) {
        console.log('error:', error)
    }

    res.status(200).json(req.body)
}
