import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ContactService, SocialLink, ContactInfo } from '../../services/contact.service';
import { ProfileService, PersonalInfo } from '../../services/profile.service';
import { LanguageService, TranslationData } from '../../services/language.service';
import { EmailService, ContactFormData } from '../../services/email.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements OnInit {
  personalInfo: PersonalInfo | null = null;
  socialLinks: SocialLink[] = [];
  contactInfo: ContactInfo | null = null;
  translations: TranslationData | null = null;
  
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

  constructor(
    public emailService: EmailService,
    private contactService: ContactService,
    private profileService: ProfileService,
    private languageService: LanguageService,
    private formBuilder: FormBuilder
  ) {
    this.contactForm = this.createForm();
  }

  ngOnInit(): void {
    // Load data synchronously to avoid loading behavior
    this.profileService.getPersonalInfo().subscribe(info => this.personalInfo = info);
    this.contactService.getSocialLinks().subscribe(links => this.socialLinks = links);
    this.contactService.getContactInfo().subscribe(info => this.contactInfo = info);
    this.languageService.translations$.subscribe(translations => this.translations = translations);
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]]
    });
  }

  // Get form control for template access
  getFormControl(controlName: string): AbstractControl | null {
    return this.contactForm.get(controlName);
  }

  // Check if field has been touched and has errors
  hasFieldError(fieldName: string): boolean {
    const control = this.getFormControl(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  // Get error message for field
  getFieldError(fieldName: string): string {
    const control = this.getFormControl(fieldName);
    if (!control || !control.errors) return '';

    const errors = control.errors;
    if (errors['required']) return 'This field is required';
    if (errors['email']) return 'Please enter a valid email address';
    if (errors['minlength']) return `Minimum ${errors['minlength'].requiredLength} characters required`;
    if (errors['maxlength']) return `Maximum ${errors['maxlength'].requiredLength} characters allowed`;
    
    return 'Invalid input';
  }

  // Check if field is valid
  isFieldValid(fieldName: string): boolean {
    const control = this.getFormControl(fieldName);
    return !!(control && control.valid && (control.dirty || control.touched));
  }

  // Handle field blur event
  onFieldBlur(fieldName: string): void {
    const control = this.getFormControl(fieldName);
    if (control) {
      control.markAsTouched();
    }
  }

  // Handle form submission
  async onSubmit(): Promise<void> {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitSuccess = false;
      this.submitError = '';

      try {
        // Prepare form data
        const formData: ContactFormData = {
          name: this.contactForm.get('name')?.value,
          email: this.contactForm.get('email')?.value,
          subject: this.contactForm.get('subject')?.value,
          message: this.contactForm.get('message')?.value
        };

        // Send email using EmailJS
        const result = await this.emailService.sendContactEmail(formData);
        
        this.isSubmitting = false;
        
        if (result.success) {
          this.submitSuccess = true;
          this.contactForm.reset();
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            this.submitSuccess = false;
          }, 5000);
        } else {
          this.submitError = result.message;
        }

      } catch (error) {
        console.error('Error submitting form:', error);
        this.isSubmitting = false;
        this.submitError = 'Sorry, there was an error sending your message. Please try again later.';
      }
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  // Reset form
  resetForm(): void {
    this.contactForm.reset();
    this.submitSuccess = false;
    this.submitError = '';
  }
}
