#!/usr/bin/env node

/**
 * Gmail Email Checker
 * Checks for unread emails and provides summary
 * Usage: node check-email.js [--summary] [--unread]
 */

require('dotenv').config({ path: '/Users/antho/clawd/.env' });
const Imap = require('imap');

const config = {
  user: process.env.GMAIL_USER || 'anthoalanlogan@gmail.com',
  password: process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_PASSWORD,
  host: 'imap.gmail.com',
  port: 993,
  tls: true
};

const mode = process.argv[2] || '--unread';

function checkEmail() {
  return new Promise((resolve, reject) => {
    const imap = new Imap(config);

    imap.once('ready', () => {
      imap.openBox('INBOX', false, (err, box) => {
        if (err) return reject(err);

        // Search for unread emails
        imap.search(['UNSEEN'], (err, results) => {
          if (err) return reject(err);

          const unreadCount = results ? results.length : 0;

          if (mode === '--unread') {
            console.log(unreadCount);
            imap.end();
            resolve(unreadCount);
            return;
          }

          if (mode === '--summary') {
            if (unreadCount > 0) {
              console.log(`📧 You have ${unreadCount} unread email(s)\n`);

              // Fetch recent 5 unread emails
              const fetch = imap.fetch(results.slice(-5), {
                bodies: 'HEADER.FIELDS (FROM SUBJECT DATE)',
                struct: true
              });

              let emails = [];

              fetch.on('message', (msg) => {
                msg.on('body', (stream, info) => {
                  let buffer = '';
                  stream.on('data', (chunk) => {
                    buffer += chunk.toString('utf8');
                  });

                  stream.once('end', () => {
                    const header = Imap.parseHeader(buffer);
                    emails.push({
                      from: header.from ? header.from[0] : 'Unknown',
                      subject: header.subject ? header.subject[0] : 'No subject',
                      date: header.date ? header.date[0] : 'Unknown'
                    });
                  });
                });
              });

              fetch.once('error', reject);

              fetch.once('end', () => {
                console.log('Recent messages:');
                emails.reverse().forEach((email, i) => {
                  console.log(`${i + 1}. From: ${email.from}`);
                  console.log(`   Subject: ${email.subject}`);
                  console.log(`   Date: ${email.date}`);
                  console.log('');
                });
                imap.end();
                resolve(unreadCount);
              });
            } else {
              console.log('📧 No unread emails');
              imap.end();
              resolve(0);
            }
          }
        });
      });
    });

    imap.once('error', reject);

    imap.once('end', () => {
      // Connection closed
    });

    imap.connect();
  });
}

if (require.main === module) {
  checkEmail()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Error:', err.message);
      process.exit(1);
    });
}

module.exports = checkEmail;
