#!/usr/bin/env node

/**
 * Email Sender using Nodemailer
 * Usage: node send-email.js <to> <subject> <message_file>
 */

require('dotenv').config({ path: '/Users/antho/clawd/.env' });
const nodemailer = require('nodemailer');
const fs = require('fs');

const config = {
  from: process.env.GMAIL_USER || 'anthoalanlogan@gmail.com',
  to: process.argv[2] || 'anthonylogan1995@gmail.com',
  subject: process.argv[3] || 'Morning Update',
  smtp: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER || 'anthoalanlogan@gmail.com',
      pass: process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_PASSWORD
    }
  }
};

async function sendEmail() {
  // Get message from file or stdin
  let body = '';
  if (process.argv[4] && fs.existsSync(process.argv[4])) {
    body = fs.readFileSync(process.argv[4], 'utf8');
  } else {
    // Read from stdin
    for await (const chunk of process.stdin) {
      body += chunk;
    }
  }

  // Create transporter
  const transporter = nodemailer.createTransport(config.smtp);

  // Send email
  const info = await transporter.sendMail({
    from: `"Henkie 🍓" <${config.from}>`,
    to: config.to,
    subject: config.subject,
    text: body,
    html: body.replace(/\n/g, '<br>')
  });

  console.log('✅ Email sent:', info.messageId);
  console.log(`📧 To: ${config.to}`);
  console.log(`📌 Subject: ${config.subject}`);
}

if (require.main === module) {
  sendEmail()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Error:', err.message);
      process.exit(1);
    });
}

module.exports = sendEmail;
