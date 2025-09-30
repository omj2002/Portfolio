#!/usr/bin/env node

/**
 * Email Setup Helper Script
 * This script helps you configure EmailJS for your contact form
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🚀 Email Setup Helper for Portfolio Contact Form\n');
console.log('This script will help you configure EmailJS to send emails from your contact form.\n');

const questions = [
  {
    key: 'serviceId',
    question: 'Enter your EmailJS Service ID: ',
    description: 'Get this from your EmailJS dashboard > Email Services'
  },
  {
    key: 'templateId', 
    question: 'Enter your EmailJS Template ID: ',
    description: 'Get this from your EmailJS dashboard > Email Templates'
  },
  {
    key: 'publicKey',
    question: 'Enter your EmailJS Public Key: ',
    description: 'Get this from your EmailJS dashboard > Account > API Keys'
  },
  {
    key: 'recipientEmail',
    question: 'Enter your email address (where messages will be sent): ',
    description: 'This is where contact form messages will be delivered'
  }
];

let answers = {};
let currentQuestion = 0;

function askQuestion() {
  if (currentQuestion >= questions.length) {
    generateConfig();
    return;
  }

  const q = questions[currentQuestion];
  console.log(`\n${q.description}`);
  rl.question(q.question, (answer) => {
    if (answer.trim()) {
      answers[q.key] = answer.trim();
    }
    currentQuestion++;
    askQuestion();
  });
}

function generateConfig() {
  console.log('\n📧 Generating EmailJS Configuration...\n');
  
  const config = `// EmailJS Configuration
export const EMAILJS_CONFIG = {
  SERVICE_ID: '${answers.serviceId || 'YOUR_SERVICE_ID'}',
  TEMPLATE_ID: '${answers.templateId || 'YOUR_TEMPLATE_ID'}',
  PUBLIC_KEY: '${answers.publicKey || 'YOUR_PUBLIC_KEY'}',
  RECIPIENT_EMAIL: '${answers.recipientEmail || 'om.jadhav.dev@gmail.com'}'
};`;

  console.log('Copy this configuration to your email.service.ts file:\n');
  console.log('─'.repeat(60));
  console.log(config);
  console.log('─'.repeat(60));
  
  console.log('\n📝 Next Steps:');
  console.log('1. Copy the configuration above');
  console.log('2. Open src/app/services/email.service.ts');
  console.log('3. Replace the placeholder values with your actual EmailJS credentials');
  console.log('4. Test your contact form');
  
  console.log('\n🔗 Need help? Check the EMAIL_SETUP.md file for detailed instructions.');
  
  rl.close();
}

// Start the questionnaire
askQuestion();
