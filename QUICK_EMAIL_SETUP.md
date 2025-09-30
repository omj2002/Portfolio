# 🚀 Quick Email Setup - Get Emails Working in 5 Minutes!

## Current Status: ❌ Not Working
Your form is in "development mode" - it only logs data to console, no real emails are sent.

## ✅ Solution: Set Up EmailJS (Free & Easy)

### Step 1: Create EmailJS Account (2 minutes)
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" (it's completely free!)
3. Create account with your email
4. Verify your email address

### Step 2: Connect Your Gmail (3 minutes)
1. In EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose **"Gmail"**
4. **For Gmail setup:**
   - Go to your Gmail settings
   - Enable 2-factor authentication
   - Generate an "App Password" (not your regular password!)
   - Use your Gmail address and the App Password in EmailJS
5. **Copy your Service ID** (looks like `service_abc123`)

### Step 3: Create Email Template (1 minute)
1. Go to **"Email Templates"** in EmailJS dashboard
2. Click **"Create New Template"**
3. **Subject:** `New Contact Form Submission - {{subject}}`
4. **Content:**
```
From: {{from_name}} <{{from_email}}>
Subject: {{subject}}

Message:
{{message}}

---
Sent from your portfolio contact form.
Reply directly to this email to respond to {{from_name}}.
```
5. **Save and copy your Template ID** (looks like `template_xyz789`)

### Step 4: Get Your Public Key
1. Go to **"Account"** in EmailJS dashboard
2. Find **"Public Key"** in API Keys section
3. **Copy your Public Key** (looks like `abcdef123456`)

### Step 5: Update Your Code
Open `src/app/services/email.service.ts` and replace these lines:

```typescript
// Replace these with your actual values:
private readonly EMAILJS_SERVICE_ID = 'service_abc123'; // Your Service ID
private readonly EMAILJS_TEMPLATE_ID = 'template_xyz789'; // Your Template ID  
private readonly EMAILJS_PUBLIC_KEY = 'abcdef123456'; // Your Public Key
```

### Step 6: Test It!
1. Save the file
2. Refresh your website
3. Fill out the contact form
4. Submit it
5. **Check your email inbox!** 📧

## 🎉 That's It!

Once you complete these steps, every form submission will send a real email to `om.jadhav.dev@gmail.com` and you'll be able to reply directly to the person who contacted you!

## ❓ Need Help?

- **Gmail App Password:** [How to create Gmail App Password](https://support.google.com/accounts/answer/185833)
- **EmailJS Documentation:** [EmailJS Docs](https://www.emailjs.com/docs/)
- **Still having issues?** Check the browser console for error messages

## 🔧 Alternative: Use a Different Email Provider

If Gmail doesn't work, you can use:
- **Outlook/Hotmail** (same process)
- **Yahoo Mail** (same process)
- **Any SMTP email provider**

The setup process is identical for all providers!
