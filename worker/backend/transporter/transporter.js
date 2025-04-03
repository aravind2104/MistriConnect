import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "chrisscharls9@gmail.com",
        pass: "tylp wjsn jmge jlmo",
    },
});