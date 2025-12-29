# TaxCalc LK - Sri Lanka Tax Calculator (2025 Edition)

A comprehensive, **2025-compliant** web-based tax calculator for Sri Lanka. This application provides accurate calculations for Withholding Tax, Monthly APIT (PAYE), Annual Income Tax, VAT, and Leasing, reflecting the latest tax regulations effective **April 1, 2025** (and VAT updates from Jan 2024).

![Version](https://img.shields.io/badge/compliance-2025_Ready-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/build-passing-brightgreen)

## Table of Contents
- [Overview](#overview)
- [New in 2025 Update](#new-in-2025-update)
- [Tax Modules](#tax-modules)
  - [1. Withholding Tax (WHT)](#1-withholding-tax-wht)
  - [2. Monthly Salary Tax (APIT/PAYE)](#2-monthly-salary-tax-apitpaye)
  - [3. Annual Income Tax](#3-annual-income-tax)
  - [4. VAT Calculator](#4-vat-calculator)
  - [5. Leasing Calculator](#5-leasing-calculator)
- [Installation](#installation)
- [Technologies](#technologies)
- [Disclaimer](#disclaimer)

## Overview

TaxCalc LK offers a modern, dark-mode supported interface to simplify complex Sri Lankan tax calculations. Whether you are an employee checking your take-home pay, an investor calculating withholding tax, or a consumer checking VAT, this tool provides instant, accurate results.

## New in 2025 Update

This version has been updated to comply with the latest Inland Revenue Department (IRD) regulations:

*   **Verified Tax Rates:** All rates checked against 2024/2025 gazettes.
*   **New Personal Relief:** Updated to **Rs. 1,800,000 per year** (Rs. 150,000 per month).
*   **Revised Tax Brackets:** New 5-bracket progressive system (replacing the old 7-bracket system).
*   **VAT Update:** Replaced outdated SSCL/Consumer tax with strictly **18% VAT** calculator.
*   **WHT Rates:** Updated Interest (10%) and Dividends (15%) to match 2025 rates.

## Tax Modules

### 1. Withholding Tax (WHT)
Updated to reflect the latest rates:
*   **Rent Tax:** 10% on rent > Rs. 100,000/month.
*   **Bank Interest:** **10%** (Increased from 5%, effective April 1, 2025).
*   **Dividends:** **15% Flat Rate** (Increased from 14%, threshold removed).

### 2. Monthly Salary Tax (APIT/PAYE)
Calculates Advance Personal Income Tax (APIT) for employees.
*   **Personal Relief:** Rs. 150,000 per month (Tax-free).
*   **Progressive Brackets (on taxable income):**

| Taxable Income (Monthly) | Rate |
|--------------------------|------|
| First Rs. 83,333 | 6% |
| Next Rs. 41,667 | 18% |
| Next Rs. 41,667 | 24% |
| Next Rs. 41,667 | 30% |
| Balance Amount | 36% |

### 3. Annual Income Tax
Calculates Personal Income Tax (PIT) for the Assessment Year 2025/2026.
*   **Annual Relief:** Rs. 1,800,000 (Tax-free).
*   **Progressive Brackets (on taxable income):**

| Taxable Income (Annual) | Rate |
|-------------------------|------|
| First Rs. 1,000,000 | 6% |
| Next Rs. 500,000 | 18% |
| Next Rs. 500,000 | 24% |
| Next Rs. 500,000 | 30% |
| Balance Amount | 36% |

### 4. VAT Calculator
Replaced the SSCL calculator to reflect the standard **18% Value Added Tax**.
*   **Rate:** 18% (Effective Jan 1, 2024).
*   **Modes:**
    *   **Add VAT:** Calculate final price from base price (Exclusive → Inclusive).
    *   **Extract VAT:** Find base price and VAT amount from final price (Inclusive → Exclusive).

### 5. Leasing Calculator
Standard leasing calculator for vehicle or equipment leases.
*   Calculates Monthly Installment (PMT).
*   Shows Total Payable amount.
*   Shows Total Interest cost.

## Installation

No installation required! This is a static web application.

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/TaxCalc-LK.git
    ```
2.  Open `index.html` in any modern web browser.

## Technologies

*   **HTML5**
*   **CSS3** (Custom variable-based design system)
*   **JavaScript (ES6+)**
*   **Font Awesome** (for icons)

## Disclaimer

This calculator is for **informational purposes only**. While every effort has been made to ensure accuracy based on the regulations effective April 1, 2025, tax laws can change. Always consult with a qualified tax professional or the Department of Inland Revenue Sri Lanka for official advice.
