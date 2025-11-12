# 💰 TaxCalc LK - Sri Lanka Tax Calculator

A comprehensive web-based tax calculator application for Sri Lanka, featuring multiple tax calculation modules with a modern, user-friendly interface.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tax Calculators](#tax-calculators)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## 🌟 Overview

TaxCalc LK is a modern, responsive web application designed to help individuals and businesses in Sri Lanka calculate various types of taxes accurately. The application features an intuitive interface with dark mode support and smooth animations, making tax calculations simple and efficient.

**Tax rates are effective from 01.04.2025**

## ✨ Features

- 🧮 **5 Comprehensive Tax Calculators**
- 🌓 **Dark Mode Support** with theme persistence
- 📱 **Fully Responsive Design** (Mobile, Tablet, Desktop)
- ✅ **Real-time Input Validation**
- 📊 **Detailed Tax Breakdown Tables**
- 💫 **Smooth Animations and Transitions**
- 🔄 **Easy Reset Functionality**
- 💾 **LocalStorage Theme Preference**
- 🎨 **Modern UI/UX Design**
- ⚡ **Fast and Lightweight**

## 🧮 Tax Calculators

### 1. Withholding Tax Calculator
Calculate withholding tax for:
- **Rent Tax:** 10% for amounts above Rs. 100,000
- **Bank Interest Tax:** 5% on all amounts
- **Dividend Tax:** 14% for amounts above Rs. 100,000

### 2. Payable Tax (Monthly Salary)
Progressive tax calculation for monthly salaries with 7 tax brackets:

| Salary Range (Rs.) | Tax Rate |
|-------------------|----------|
| 0 - 100,000 | 0% |
| 100,001 - 141,667 | 6% |
| 141,668 - 183,333 | 12% |
| 183,334 - 225,000 | 18% |
| 225,001 - 266,667 | 24% |
| 266,668 - 308,333 | 30% |
| 308,334+ | 36% |

**Features:**
- Detailed breakdown by tax bracket
- Net salary calculation
- Applied tax rate display

### 3. Income Tax (Annual)
Annual income tax calculator with progressive slabs:

| Income Range (Rs.) | Tax Rate |
|-------------------|----------|
| Up to 1,200,000 | 0% |
| 1,200,001 - 1,700,000 | 6% |
| 1,700,001 - 2,200,000 | 12% |
| 2,200,001 - 2,700,000 | 18% |
| 2,700,001 - 3,200,000 | 24% |
| 3,200,001 - 3,700,000 | 30% |
| Above 3,700,000 | 36% |

**Features:**
- Comprehensive breakdown table
- Net annual income after tax

### 4. SSCL Tax Calculator
Sales and Service Tax calculation including:
- **Sale Tax:** 2.5% of transaction value
- **VAT:** 15% applied after sale tax

**Formula:**
```
saleTax = value × 2.5%
afterSaleTax = value + saleTax
vat = afterSaleTax × 15%
SSCL = saleTax + vat
```

### 5. Leasing Calculator
Calculate vehicle/equipment leasing with:
- **Monthly EMI Calculation**
- **3-Year, 4-Year, 5-Year Plan Comparison**
- **Total Payment & Interest Display**

**EMI Formula:**
```
EMI = (P × R × (1+R)^N) / ((1+R)^N - 1)

Where:
P = Principal loan amount
R = Monthly interest rate
N = Number of months
```

**Features:**
- Single plan calculation
- Multi-plan comparison with visual cards
- Total interest and payment breakdown
- Savings comparison insights

## 💻 Usage

### Basic Usage

1. **Select a Calculator**
   - Click on any calculator option in the sidebar menu
   - The selected calculator will be highlighted in orange

2. **Enter Values**
   - Fill in the required input fields
   - The application validates inputs in real-time

3. **Calculate**
   - Click the "Calculate" button to see results
   - Results appear below with detailed breakdowns

4. **Reset**
   - Click "Reset" to clear all inputs and results
   - Start fresh with new calculations

5. **Toggle Theme**
   - Click the theme toggle button in the sidebar
   - Switch between light and dark modes
   - Your preference is saved automatically

### Example Calculations

**Monthly Salary Tax:**
```
Input: Rs. 200,000
Output: 
- Tax breakdown by brackets
- Total Tax: Rs. 10,500
- Net Salary: Rs. 189,500
```

**SSCL Tax:**
```
Input: Rs. 100,000
Output:
- Sale Tax: Rs. 2,500
- VAT: Rs. 15,375
- Total SSCL: Rs. 17,875
```

**Leasing (3-Year Plan):**
```
Input: 
- Loan: Rs. 1,000,000
- Interest: 12%
- Period: 3 years

Output:
- Monthly EMI: Rs. 33,214.28
- Total Payment: Rs. 1,195,714.08
- Total Interest: Rs. 195,714.08
```

## 📁 Project Structure

```
taxcalc-lk/
│
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # JavaScript logic and calculations


```

### File Details

**index.html**
- Complete HTML structure
- 5 calculator forms
- Sidebar navigation
- Footer with credits

**styles.css**
- Modern, professional styling
- Dark mode support
- Responsive design
- Smooth animations and transitions
- Custom component styles

**script.js**
- Navigation functionality
- All calculator logic
- Input validation
- Theme toggle with LocalStorage
- Currency formatting
- Progressive tax calculations
- EMI formula implementation

## 🛠️ Technologies Used

- **HTML5** - Structure and semantics
- **CSS3** - Styling and animations
  - CSS Grid
  - Flexbox
  - CSS Transitions
  - CSS Animations
  - Media Queries
- **JavaScript (ES6+)** - Logic and interactivity
  - DOM Manipulation
  - LocalStorage API
  - Event Handling
  - Mathematical Calculations

## 🎨 Color Palette

- Primary: `#ff6b35` (Orange)
- Background: `#f5f7fa` (Light Gray)
- Cards: `#ffffff` (White)
- Text: `#0a1128` (Dark Navy)
- Sidebar: `#0a1128` (Dark Navy)

## 🧪 Testing

### Browser Compatibility
✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ Opera 76+

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Manual Testing Checklist
- [ ] All calculators work correctly
- [ ] Input validation functions properly
- [ ] Responsive design works on all devices
- [ ] Animations are smooth
- [ ] Reset buttons clear all data
- [ ] Navigation works correctly

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Guidelines
- Follow existing code style
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation if needed
```

## 👨‍💻 Author

Harshana Jayasinghe

- 🎓 University of COlombo School of Computing
- 📧 Email: harshanajayasinghe113@gmail.com
- 🐱 GitHub: https://github.com/sithija-jayasinghe
- 💼 LinkedIn: https://www.linkedin.com/in/sithija-harshana-jayasinghe-552822340/

## 🙏 Acknowledgments

- Institute of Computer Engineering Technology for the project requirements
- Sri Lankan tax regulations and guidelines
- Modern web development best practices
- Open source community for inspiration

## 📞 Support

For support, questions, or feedback:
- 📧 Email: your.email@example.com

## 🔮 Future Enhancements

- [ ] Add tax history tracking
- [ ] Export results as PDF
- [ ] Multi-language support (Sinhala, Tamil)
- [ ] Tax saving tips and recommendations
- [ ] Print-friendly reports
- [ ] Email results functionality
- [ ] Advanced calculator options
- [ ] Tax comparison tools
- [ ] Mobile app version

## ⚠️ Disclaimer

This calculator is provided for educational and informational purposes only. Tax calculations are based on the rates effective from 01.04.2025. Always consult with a qualified tax professional or the Inland Revenue Department of Sri Lanka for official tax advice and calculations.

---

<div align="center">

**Made by Harshana Jayasinghe**

⭐ Star this repository if you find it helpful!

</div>
