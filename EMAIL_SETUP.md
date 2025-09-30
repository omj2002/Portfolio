# Email Setup Guide

This guide will help you set up email functionality for your contact form using EmailJS.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Set Up Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

## Step 3: Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

```
Subject: New Contact Form Submission - {{subject}}

From: {{from_name}} <{{from_email}}>
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
Reply directly to this email to respond to {{from_name}}.
```

4. Save the template and note down your **Template ID**

## Step 4: Get Public Key

1. Go to "Account" in your EmailJS dashboard
2. Find your **Public Key** in the API Keys section

## Step 5: Update Email Service

1. Open `src/app/services/email.service.ts`
2. Replace the placeholder values:

```typescript
private readonly EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your actual Service ID
private readonly EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your actual Template ID  
private readonly EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your actual Public Key
```

## Step 6: Test the Setup

1. Start your development server: `ng serve`
2. Navigate to the contact form
3. Fill out and submit the form
4. Check your email for the message

## Alternative: Using a Backend API

If you prefer not to use EmailJS, you can:

1. Create a backend API endpoint (Node.js, Python, etc.)
2. Update the `sendEmailViaAPI` method in `email.service.ts`
3. Replace the EmailJS implementation with your API call

## Troubleshooting

- **Email not received**: Check spam folder, verify EmailJS configuration
- **Service errors**: Ensure all IDs and keys are correct
- **Template issues**: Verify template variables match the service parameters

## Security Notes

- Never expose your private keys in frontend code
- Consider rate limiting for form submissions
- Validate all form inputs on the backend as well
