# 🧮 PAYE Calculator

A professional, real-time salary calculator for Kenyan tax calculations with multi-country support and enquiry management system.

![SkillMind Software](public/skillmind-software.png)

## ✨ Features

### 🧮 **Tax Calculations**
- **Gross to Net Calculator** - Calculate take-home salary from gross pay
- **Net to Gross Calculator** - Calculate required gross salary for desired net pay
- **Real-time calculations** with instant results
- **Accurate Kenyan tax rates** for 2024 and beyond

### 🌍 **Multi-Country Support**
- **Automatic country detection** based on user's timezone
- **Support for 8 African countries** (Kenya, Uganda, Tanzania, Rwanda, Ethiopia, Ghana, Nigeria, South Africa)
- **Extensible architecture** for adding more countries

### 📊 **Tax Components Included**
- **PAYE** - Progressive tax rates (10%, 25%, 30%, 32.5%, 35%)
- **NHIF** - 2.75% of gross pay (Social Health Insurance Fund)
- **NSSF** - 6% of gross pay (Tier I & II)
- **Housing Levy** - 1.5% of gross pay
- **Personal Relief** - KES 2,400 per month

### 📧 **Enquiry Management**
- **Professional enquiry form** for user inquiries
- **SMTP email integration** for notifications
- **Team notifications** when enquiries are received
- **User confirmation emails** with enquiry details
- **Unique enquiry IDs** for tracking

### 🎨 **Modern UI/UX**
- **Responsive design** for all devices
- **Professional styling** with SkillMind Software branding
- **Number formatting** with commas for better readability
- **Tabular number alignment** for financial data
- **Interactive elements** with hover effects

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ 
- npm or pnpm
- SMTP email service (Gmail, Office 365, or custom domain)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your SMTP credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## ⚙️ **Configuration**

### **Environment Variables**

Create a `.env.local` file with the following variables:

```bash
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
TEAM_EMAIL=dev1@skillmindsoftware.com
```

### **SMTP Providers**

#### **Gmail (Recommended for testing)**
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password  # Use App Password, not regular password
```

#### **Office 365**
```bash
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-password
```

#### **Custom Domain**
```bash
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-password
```

### **Gmail App Password Setup**
1. Enable 2-Factor Authentication in your Google Account
2. Go to Security → App Passwords
3. Generate a new app password for "Mail"
4. Use the 16-character password in `SMTP_PASS`

## 🏗️ **Project Structure**

```
Calculator/
├── app/                          # Next.js app directory
│   ├── api/                     # API routes
│   │   └── enquiry/            # Enquiry submission endpoint
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/                  # React components
│   ├── ui/                     # UI component library
│   ├── gross-to-net-calculator.tsx
│   ├── net-to-gross-calculator.tsx
│   ├── paye-calculator.tsx
│   └── enquiry-form.tsx
├── lib/                        # Utility libraries
│   ├── tax-calculations.ts     # Tax calculation logic
│   ├── email-service.ts        # SMTP email service
│   └── utils.ts                # Helper functions
├── public/                     # Static assets
└── styles/                     # Additional styles
```

## 📱 **Usage**

### **Calculating Net Salary**
1. Select the **"Gross to Net"** tab
2. Enter your gross monthly salary
3. View detailed breakdown of all deductions
4. See your final net salary

### **Calculating Gross Salary**
1. Select the **"Net to Gross"** tab
2. Enter your desired net monthly salary
3. View the required gross salary
4. See all tax components that will be deducted

### **Submitting an Enquiry**
1. Click the **"Enquiry"** tab
2. Fill in your name, mobile number, and email
3. Submit the form
4. Receive confirmation email
5. Team gets notified of your enquiry

## 🧮 **Tax Calculation Method**

The calculator follows the correct Kenyan tax calculation method:

1. **Calculate statutory deductions** (NSSF, NHIF, Housing Levy) from gross salary
2. **Calculate taxable income** by subtracting all statutory deductions from gross salary
3. **Apply progressive tax rates** to the taxable income to get PAYE before relief
4. **Apply personal relief** to get PAYE after relief
5. **Calculate net salary** by subtracting all deductions from gross salary

## 🛠️ **Development**

### **Available Scripts**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### **Adding New Countries**
1. Update the country detection logic in calculator components
2. Add country-specific tax rates in `lib/tax-calculations.ts`
3. Update the country dropdown options
4. Test with country-specific calculations

### **Customizing Email Templates**
Edit the HTML templates in `lib/email-service.ts` to match your brand:
- Team notification emails
- User confirmation emails
- Email styling and branding

## 🧪 **Testing**

### **Manual Testing**
1. Test both calculator modes with various salary amounts
2. Verify tax calculations match expected results
3. Test enquiry form submission
4. Check email delivery to team and users
5. Test responsive design on different devices

### **Validation**
- Input validation for salary amounts
- Email format validation
- Required field validation
- Error handling for failed email delivery

## 🚀 **Deployment**

### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### **Other Platforms**
- **Netlify** - Similar to Vercel setup
- **AWS Amplify** - For AWS ecosystem
- **Custom server** - Export static files or run Node.js server

### **Environment Variables in Production**
Ensure all SMTP credentials are set in your deployment platform's environment variables.

## 📄 **License**

© 2025 SkillMind Software. All rights reserved.

## 🤝 **Support**

For support and questions:
- Submit an enquiry through the calculator
- Contact the development team
- Check the documentation for common issues

## 🔄 **Updates**

### **Tax Rate Updates**
- Tax rates are updated annually
- Check official Kenyan tax authority for latest rates
- Update `lib/tax-calculations.ts` with new rates

### **Feature Updates**
- Regular updates for new countries
- Enhanced calculation methods
- Improved UI/UX components
- Additional tax components as needed

---

**Built with ❤️ by SkillMind Software**
