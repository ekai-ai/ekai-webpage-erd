import { useState, useRef, useEffect } from 'react';
import './request-access-popup.less';

interface RequestAccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CountryCode {
  code: string;
  flag: string;
  dialCode: string;
  name: string;
}

const countryCodes: CountryCode[] = [
  { code: 'US', flag: '🇺🇸', dialCode: '+1', name: 'United States' },
  { code: 'GB', flag: '🇬🇧', dialCode: '+44', name: 'United Kingdom' },
  { code: 'CA', flag: '🇨🇦', dialCode: '+1', name: 'Canada' },
  { code: 'AU', flag: '🇦🇺', dialCode: '+61', name: 'Australia' },
  { code: 'DE', flag: '🇩🇪', dialCode: '+49', name: 'Germany' },
  { code: 'FR', flag: '🇫🇷', dialCode: '+33', name: 'France' },
  { code: 'IN', flag: '🇮🇳', dialCode: '+91', name: 'India' },
  { code: 'JP', flag: '🇯🇵', dialCode: '+81', name: 'Japan' },
  { code: 'SG', flag: '🇸🇬', dialCode: '+65', name: 'Singapore' },
  { code: 'PK', flag: '🇵🇰', dialCode: '+92', name: 'Pakistan' },
  { code: 'AE', flag: '🇦🇪', dialCode: '+971', name: 'United Arab Emirates' },
  { code: 'SA', flag: '🇸🇦', dialCode: '+966', name: 'Saudi Arabia' },
  { code: 'EG', flag: '🇪🇬', dialCode: '+20', name: 'Egypt' },
  { code: 'ZA', flag: '🇿🇦', dialCode: '+27', name: 'South Africa' },
  { code: 'BR', flag: '🇧🇷', dialCode: '+55', name: 'Brazil' },
  { code: 'MX', flag: '🇲🇽', dialCode: '+52', name: 'Mexico' },
  { code: 'ES', flag: '🇪🇸', dialCode: '+34', name: 'Spain' },
  { code: 'IT', flag: '🇮🇹', dialCode: '+39', name: 'Italy' },
  { code: 'NL', flag: '🇳🇱', dialCode: '+31', name: 'Netherlands' },
  { code: 'SE', flag: '🇸🇪', dialCode: '+46', name: 'Sweden' },
];

export const RequestAccessPopup = ({ isOpen, onClose }: RequestAccessPopupProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    jobTitle: '',
    phone: '',
    companyInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(countryCodes[0]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // For phone input, only allow numbers, spaces, hyphens, and parentheses
    if (name === 'phone') {
      const phoneValue = value.replace(/[^0-9\s\-\(\)]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: phoneValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCountrySelect = (country: CountryCode) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
    setSearchTerm('');
  };

  const filteredCountries = countryCodes.filter(country => 
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.dialCode.includes(searchTerm)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.company.trim() || !formData.jobTitle.trim()) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare the payload to match the expected API format
      const payload = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phone ? `${selectedCountry.dialCode} ${formData.phone}` : '',
        companyName: formData.company,
        jobTitle: formData.jobTitle,
        message: formData.companyInfo || '', // Rename to match backend
      };

      // For local development, use localhost endpoint if in dev mode
      const API_ENDPOINT = import.meta.env.DEV
        ? 'https://ivn7l6cm2cvuqrxygyjcphylwq0qpnzh.lambda-url.us-east-2.on.aws/send-email-v2'
        : import.meta.env.VITE_CONTACT_API_URL;

      // In development mode, log the endpoint and payload for debugging
      if (import.meta.env.DEV) {
        console.log('Sending to:', API_ENDPOINT);
        console.log('Payload:', payload);
      }

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.status === 200) {
        console.log('Email sent successfully');
        setSubmitStatus('success');
      } else {
        // Handle server errors
        console.log(API_ENDPOINT, payload, window.location.origin);
        console.error('Failed to send email', response.statusText);
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 3000);
      }
    } catch (error: any) {
      // Get detailed error information for debugging
      const errorDetails = error.response?.data 
        ? JSON.stringify(error.response.data, null, 2) 
        : error.message;
      
      // Log detailed error information to help diagnose issues
      console.error('An error occurred:', error);
      console.error('Error details:', errorDetails);
      console.error('Status code:', error.response?.status);
      
      // Reset button state
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      
      // Add specific error status info to the console for better debugging
      if (error.response?.status === 500) {
        console.error('Server error: This might be due to SendGrid configuration issues');
      } else if (error.response?.status === 403) {
        console.error('Access forbidden: This might be due to CORS or authentication issues');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>
          ×
        </button>
        
        <div className="popup-header">
          <h2 className="popup-title">Request Full Access</h2>
        </div>

        {submitStatus === 'success' ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Request Sent Successfully!</h3>
            <p>We'll get back to you shortly.</p>
          </div>
        ) : (
          <form className="popup-form" onSubmit={handleSubmit}   onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="form-input"
                required
              />
            </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Work Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="company" className="form-label">
              Company Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Where do you work?"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="jobTitle" className="form-label">
              Job title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              placeholder="What is your job title?"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <div className="phone-input-container" ref={dropdownRef}>
              <div 
                className="country-selector"
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
              >
                <span className="country-flag">{selectedCountry.flag}</span>
                <span className="country-arrow">▼</span>
                
                {isCountryDropdownOpen && (
                  <div className="country-dropdown" onClick={(e) => e.stopPropagation()}>
                    <div className="search-container">
                      <input
                        type="text"
                        placeholder="Search country..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="country-search"
                        autoFocus
                      />
                    </div>
                    {filteredCountries.map((country) => (
                      <div
                        key={country.code}
                        className={`country-option ${selectedCountry.code === country.code ? 'selected' : ''}`}
                        onClick={() => handleCountrySelect(country)}
                      >
                        <span className="country-flag">{country.flag}</span>
                        <span className="country-name">{country.name}</span>
                        <span className="country-dial">{country.dialCode}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="phone-input-wrapper">
                <span className="phone-prefix">{selectedCountry.dialCode}</span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  className="form-input phone-input"
                  pattern="[0-9\s\-\(\)]*"
                  inputMode="tel"
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="companyInfo" className="form-label">
              Anything we should know about your company?
            </label>
            <textarea
              id="companyInfo"
              name="companyInfo"
              value={formData.companyInfo}
              onChange={handleInputChange}
              placeholder="Have a question, or any specific challenges or requirements?"
              className="form-textarea"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className={`submit-button ${submitStatus === 'error' ? 'error' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : submitStatus === 'error' ? 'Somehthing went wrong. Please try again later.' : 'Request Access'}
          </button>
        </form>
        )}
      </div>
    </div>
  );
}; 