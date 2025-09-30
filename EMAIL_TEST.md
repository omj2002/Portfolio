# Email Functionality Test Guide

## Quick Test (Without EmailJS Setup)

1. **Start the development server:**
   ```bash
   ng serve
   ```

2. **Navigate to the contact form**
   - Go to `http://localhost:4200`
   - Scroll to the contact section

3. **Fill out the form:**
   - Name: Test User
   - Email: test@example.com
   - Subject: Test Message
   - Message: This is a test message

4. **Submit the form**
   - Click "Send Message"
   - Check the browser console for the form data
   - You should see a success message

## With EmailJS Setup

1. **Follow the EMAIL_SETUP.md guide**
2. **Update email.service.ts with your credentials**
3. **Test the form submission**
4. **Check your email inbox**

## Expected Behavior

### ✅ Success Case
- Form validates all fields
- Loading spinner appears
- Success message shows
- Form resets
- Email is sent to your inbox

### ❌ Error Case
- Validation errors show for invalid fields
- Error message appears if email fails
- Form remains filled for retry

## Console Logs

When testing, check the browser console for:
- `Contact form submission:` - Form data logged
- `Email sent successfully:` - EmailJS success
- `Error sending email:` - Any errors

## Troubleshooting

### Email not received?
1. Check spam folder
2. Verify EmailJS configuration
3. Check console for errors
4. Ensure email service is active

### Form not submitting?
1. Check all fields are valid
2. Check console for JavaScript errors
3. Verify EmailJS credentials

### Validation not working?
1. Check form validation rules
2. Test each field individually
3. Check browser console for errors

## Development Mode

In development mode (when EmailJS is not configured):
- Form data is logged to console
- Success message shows with note
- No actual email is sent

This allows you to test the form functionality without setting up EmailJS first.
