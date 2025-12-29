function showCalculator(id) {
    const cards = document.querySelectorAll('.calculator-card');
    const menuItems = document.querySelectorAll('.menu-item');

    cards.forEach(card => card.classList.remove('active'));
    menuItems.forEach(item => item.classList.remove('active'));

    document.getElementById(id).classList.add('active');
    event.target.closest('.menu-item').classList.add('active');
}



function formatCurrency(amount) {
    return 'Rs. ' + amount.toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function calculateWithholding() {
    const amount = parseFloat(document.getElementById('whtAmount').value);
    const taxType = document.querySelector('input[name="taxType"]:checked').value;
    const errorDiv = document.getElementById('whtError');

    errorDiv.textContent = '';

    if (!amount || amount <= 0) {
        errorDiv.textContent = 'Please enter a valid amount greater than 0';
        return;
    }

    let tax = 0;
    let taxRate = 0;
    let message = '';

    if (taxType === 'rent') {
        if (amount > 100000) {
            tax = amount * 0.10;
            taxRate = 10;
            message = 'Rent tax applies at 10% for amounts above Rs. 100,000';
        } else {
            message = 'No tax applicable. Amount is below Rs. 100,000';
        }
    } else if (taxType === 'interest') {
        tax = amount * 0.10;
        taxRate = 10;
        message = 'Bank interest tax applies at 10% (effective April 1, 2025)';
    } else if (taxType === 'dividend') {
        tax = amount * 0.15;
        taxRate = 15;
        message = 'Dividend tax applies at 15% (final tax, effective from Jan 1, 2023)';
    }

    const netAmount = amount - tax;

    document.getElementById('whtResults').innerHTML = `
        <div class="results">
            <div class="result-row">
                <span class="result-label">Tax Type</span>
                <span class="result-value">${taxType.charAt(0).toUpperCase() + taxType.slice(1)}</span>
            </div>
            <div class="result-row">
                <span class="result-label">Gross Amount</span>
                <span class="result-value">${formatCurrency(amount)}</span>
            </div>
            <div class="result-row">
                <span class="result-label">Tax Rate</span>
                <span class="result-value">${taxRate}%</span>
            </div>
            <div class="result-row">
                <span class="result-label">Tax Amount</span>
                <span class="result-value">${formatCurrency(tax)}</span>
            </div>
            <div class="result-row">
                <span class="result-label">Net Amount</span>
                <span class="result-value">${formatCurrency(netAmount)}</span>
            </div>
            <p style="margin-top: 15px; color: #718096; font-style: italic;">${message}</p>
        </div>
    `;
}

function resetWithholding() {
    document.getElementById('whtAmount').value = '';
    document.getElementById('whtError').textContent = '';
    document.getElementById('whtResults').innerHTML = '';
}

function calculatePayable() {
    const salary = parseFloat(document.getElementById('monthlySalary').value);
    const errorDiv = document.getElementById('payableError');

    errorDiv.textContent = '';

    if (!salary || salary <= 0) {
        errorDiv.textContent = 'Please enter a valid salary greater than 0';
        return;
    }

    const brackets = [
        { limit: 100000, rate: 0 },
        { limit: 141667, rate: 0.06 },
        { limit: 183333, rate: 0.12 },
        { limit: 225000, rate: 0.18 },
        { limit: 266667, rate: 0.24 },
        { limit: 308333, rate: 0.30 },
        { limit: Infinity, rate: 0.36 }
    ];

    let tax = 0;
    let remaining = salary;
    let breakdown = [];
    let prevLimit = 0;

    for (let i = 0; i < brackets.length; i++) {
        if (remaining <= 0) break;

        const bracketSize = brackets[i].limit - prevLimit;
        const taxableInBracket = Math.min(remaining, bracketSize);
        const taxInBracket = taxableInBracket * brackets[i].rate;

        if (taxableInBracket > 0) {
            breakdown.push({
                range: `Rs. ${prevLimit.toLocaleString()} - Rs. ${brackets[i].limit === Infinity ? 'Above' : brackets[i].limit.toLocaleString()}`,
                rate: (brackets[i].rate * 100).toFixed(0) + '%',
                taxable: formatCurrency(taxableInBracket),
                tax: formatCurrency(taxInBracket)
            });
            tax += taxInBracket;
        }

        remaining -= taxableInBracket;
        prevLimit = brackets[i].limit;
    }

    const netSalary = salary - tax;

    let tableHTML = `
        <table class="breakdown-table">
            <thead>
                <tr>
                    <th>Salary Range</th>
                    <th>Rate</th>
                    <th>Taxable Amount</th>
                    <th>Tax</th>
                </tr>
            </thead>
            <tbody>
    `;

    breakdown.forEach(row => {
        tableHTML += `
            <tr>
                <td>${row.range}</td>
                <td>${row.rate}</td>
                <td>${row.taxable}</td>
                <td>${row.tax}</td>
            </tr>
        `;
    });

    tableHTML += '</tbody></table>';

    document.getElementById('payableResults').innerHTML = `
        <div class="results">
            <h3 style="margin-bottom: 20px; color: #2d3748;">Tax Breakdown</h3>
            ${tableHTML}
            <div style="margin-top: 25px;">
                <div class="result-row">
                    <span class="result-label">Monthly Salary</span>
                    <span class="result-value">${formatCurrency(salary)}</span>
                </div>
                <div class="result-row">
                    <span class="result-label">Total Monthly Tax</span>
                    <span class="result-value">${formatCurrency(tax)}</span>
                </div>
                <div class="result-row">
                    <span class="result-label">Net Monthly Salary</span>
                    <span class="result-value">${formatCurrency(netSalary)}</span>
                </div>
            </div>
        </div>
    `;
}

function resetPayable() {
    document.getElementById('monthlySalary').value = '';
    document.getElementById('payableError').textContent = '';
    document.getElementById('payableResults').innerHTML = '';
}

function calculateIncome() {
    const income = parseFloat(document.getElementById('annualIncome').value);
    const errorDiv = document.getElementById('incomeError');

    errorDiv.textContent = '';

    if (!income || income <= 0) {
        errorDiv.textContent = 'Please enter a valid income greater than 0';
        return;
    }

    const brackets = [
        { limit: 1200000, rate: 0 },
        { limit: 1700000, rate: 0.06 },
        { limit: 2200000, rate: 0.12 },
        { limit: 2700000, rate: 0.18 },
        { limit: 3200000, rate: 0.24 },
        { limit: 3700000, rate: 0.30 },
        { limit: Infinity, rate: 0.36 }
    ];

    let tax = 0;
    let remaining = income;
    let breakdown = [];
    let prevLimit = 0;

    for (let i = 0; i < brackets.length; i++) {
        if (remaining <= 0) break;

        const bracketSize = brackets[i].limit - prevLimit;
        const taxableInBracket = Math.min(remaining, bracketSize);
        const taxInBracket = taxableInBracket * brackets[i].rate;

        if (taxableInBracket > 0) {
            breakdown.push({
                range: `Rs. ${prevLimit.toLocaleString()} - Rs. ${brackets[i].limit === Infinity ? 'Above' : brackets[i].limit.toLocaleString()}`,
                rate: (brackets[i].rate * 100).toFixed(0) + '%',
                taxable: formatCurrency(taxableInBracket),
                tax: formatCurrency(taxInBracket)
            });
            tax += taxInBracket;
        }

        remaining -= taxableInBracket;
        prevLimit = brackets[i].limit;
    }

    const netIncome = income - tax;

    let tableHTML = `
        <table class="breakdown-table">
            <thead>
                <tr>
                    <th>Income Range</th>
                    <th>Rate</th>
                    <th>Taxable Amount</th>
                    <th>Tax</th>
                </tr>
            </thead>
            <tbody>
    `;

    breakdown.forEach(row => {
        tableHTML += `
            <tr>
                <td>${row.range}</td>
                <td>${row.rate}</td>
                <td>${row.taxable}</td>
                <td>${row.tax}</td>
            </tr>
        `;
    });

    tableHTML += '</tbody></table>';

    document.getElementById('incomeResults').innerHTML = `
        <div class="results">
            <h3 style="margin-bottom: 20px; color: #2d3748;">Tax Breakdown</h3>
            ${tableHTML}
            <div style="margin-top: 25px;">
                <div class="result-row">
                    <span class="result-label">Annual Income</span>
                    <span class="result-value">${formatCurrency(income)}</span>
                </div>
                <div class="result-row">
                    <span class="result-label">Total Annual Tax</span>
                    <span class="result-value">${formatCurrency(tax)}</span>
                </div>
                <div class="result-row">
                    <span class="result-label">Net Annual Income</span>
                    <span class="result-value">${formatCurrency(netIncome)}</span>
                </div>
            </div>
        </div>
    `;
}

function resetIncome() {
    document.getElementById('annualIncome').value = '';
    document.getElementById('incomeError').textContent = '';
    document.getElementById('incomeResults').innerHTML = '';
}

function calculateSSCL() {
    const value = parseFloat(document.getElementById('ssclValue').value);
    const errorDiv = document.getElementById('ssclError');

    errorDiv.textContent = '';

    if (!value || value <= 0) {
        errorDiv.textContent = 'Please enter a valid value greater than 0';
        return;
    }

    const saleTax = value * 0.025;
    const afterSaleTax = value + saleTax;
    const vat = afterSaleTax * 0.15;
    const totalSSCL = saleTax + vat;
    const finalAmount = value + totalSSCL;

    document.getElementById('ssclResults').innerHTML = `
        <div class="results">
            <h3 style="margin-bottom: 20px; color: #2d3748;">SSCL Calculation Breakdown</h3>
            <div class="result-row">
                <span class="result-label">Original Value</span>
                <span class="result-value">${formatCurrency(value)}</span>
            </div>
            <div class="result-row">
                <span class="result-label">Sale Tax (2.5%)</span>
                <span class="result-value">${formatCurrency(saleTax)}</span>
            </div>
            <div class="result-row">
                <span class="result-label">Value After Sale Tax</span>
                <span class="result-value">${formatCurrency(afterSaleTax)}</span>
            </div>
            <div class="result-row">
                <span class="result-label">VAT (15% on ${formatCurrency(afterSaleTax)})</span>
                <span class="result-value">${formatCurrency(vat)}</span>
            </div>
            <div class="result-row">
                <span class="result-label">Total SSCL (Sale Tax + VAT)</span>
                <span class="result-value">${formatCurrency(totalSSCL)}</span>
            </div>
            <div class="result-row">
                <span class="result-label">Final Amount Payable</span>
                <span class="result-value">${formatCurrency(finalAmount)}</span>
            </div>
        </div>
    `;
}

function resetSSCL() {
    document.getElementById('ssclValue').value = '';
    document.getElementById('ssclError').textContent = '';
    document.getElementById('ssclResults').innerHTML = '';
}

function calculateEMI(principal, annualRate, years) {
    const monthlyRate = annualRate / 100 / 12;
    const months = years * 12;

    if (monthlyRate === 0) {
        return principal / months;
    }

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    return emi;
}

function calculateLeasing() {
    const amount = parseFloat(document.getElementById('loanAmount').value);
    const rate = parseFloat(document.getElementById('interestRate').value);
    const years = parseInt(document.getElementById('loanYears').value);
    const errorDiv = document.getElementById('leasingError');

    errorDiv.textContent = '';

    if (!amount || amount <= 0) {
        errorDiv.textContent = 'Please enter a valid loan amount greater than 0';
        return;
    }

    if (!rate || rate <= 0) {
        errorDiv.textContent = 'Please enter a valid interest rate greater than 0';
        return;
    }

    if (years > 5) {
        errorDiv.textContent = 'Loan period cannot exceed 5 years';
        return;
    }

    const emi = calculateEMI(amount, rate, years);
    const totalPayment = emi * years * 12;
    const totalInterest = totalPayment - amount;

    document.getElementById('leasingResults').innerHTML = `
        <div class="results">
            <h3 style="margin-bottom: 20px; color: #2d3748;">Leasing Calculation Results</h3>
            <div class="result-row">
                <span class="result-label">Loan Amount</span>
                <span class="result-value">${formatCurrency(amount)}</span>
            </div>
            <div class="result-row">
                <span class="result-label">Interest Rate</span>
                <span class="result-value">${rate}% per annum</span>
            </div>
            <div class="result-row">
                <span class="result-label">Loan Period</span>
                <span class="result-value">${years} years (${years * 12} months)</span>
            </div>
            <div class="result-row">
                <span class="result-label">Monthly Installment (EMI)</span>
                <span class="result-value">${formatCurrency(emi)}</span>
            </div>
            <div class="result-row">
                <span class="result-label">Total Payment</span>
                <span class="result-value">${formatCurrency(totalPayment)}</span>
            </div>
            <div class="result-row">
                <span class="result-label">Total Interest</span>
                <span class="result-value">${formatCurrency(totalInterest)}</span>
            </div>
        </div>
    `;
}

function showComparison() {
    const amount = parseFloat(document.getElementById('loanAmount').value);
    const rate = parseFloat(document.getElementById('interestRate').value);
    const errorDiv = document.getElementById('leasingError');

    errorDiv.textContent = '';

    if (!amount || amount <= 0) {
        errorDiv.textContent = 'Please enter a valid loan amount greater than 0';
        return;
    }

    if (!rate || rate <= 0) {
        errorDiv.textContent = 'Please enter a valid interest rate greater than 0';
        return;
    }

    const emi3 = calculateEMI(amount, rate, 3);
    const emi4 = calculateEMI(amount, rate, 4);
    const emi5 = calculateEMI(amount, rate, 5);

    const total3 = emi3 * 36;
    const total4 = emi4 * 48;
    const total5 = emi5 * 60;

    const interest3 = total3 - amount;
    const interest4 = total4 - amount;
    const interest5 = total5 - amount;

    document.getElementById('leasingResults').innerHTML = `
        <div class="results">
            <h3 style="margin-bottom: 20px; color: #2d3748;">Leasing Plan Comparison</h3>
            <p style="margin-bottom: 20px; color: #718096;">Compare monthly installments and total costs across different loan periods</p>
            
            <div class="comparison-grid">
                <div class="comparison-card">
                    <h3>3 Year Plan</h3>
                    <p style="color: #718096; margin: 10px 0;">36 Months</p>
                    <div class="amount">${formatCurrency(emi3)}</div>
                    <p style="color: #4a5568; margin-top: 10px; font-size: 14px;">per month</p>
                    <hr style="margin: 15px 0; border: none; border-top: 1px solid #e2e8f0;">
                    <div style="text-align: left; padding: 0 10px;">
                        <div style="display: flex; justify-content: space-between; margin: 8px 0;">
                            <span style="color: #718096;">Total Payment:</span>
                            <span style="font-weight: 600;">${formatCurrency(total3)}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin: 8px 0;">
                            <span style="color: #718096;">Total Interest:</span>
                            <span style="font-weight: 600; color: #e53e3e;">${formatCurrency(interest3)}</span>
                        </div>
                    </div>
                </div>

                <div class="comparison-card" style="border-color: #ff6b35; background: #fff5f2;">
                    <h3>4 Year Plan</h3>
                    <p style="color: #718096; margin: 10px 0;">48 Months</p>
                    <div class="amount">${formatCurrency(emi4)}</div>
                    <p style="color: #4a5568; margin-top: 10px; font-size: 14px;">per month</p>
                    <hr style="margin: 15px 0; border: none; border-top: 1px solid #e2e8f0;">
                    <div style="text-align: left; padding: 0 10px;">
                        <div style="display: flex; justify-content: space-between; margin: 8px 0;">
                            <span style="color: #718096;">Total Payment:</span>
                            <span style="font-weight: 600;">${formatCurrency(total4)}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin: 8px 0;">
                            <span style="color: #718096;">Total Interest:</span>
                            <span style="font-weight: 600; color: #e53e3e;">${formatCurrency(interest4)}</span>
                        </div>
                    </div>
                </div>

                <div class="comparison-card">
                    <h3>5 Year Plan</h3>
                    <p style="color: #718096; margin: 10px 0;">60 Months</p>
                    <div class="amount">${formatCurrency(emi5)}</div>
                    <p style="color: #4a5568; margin-top: 10px; font-size: 14px;">per month</p>
                    <hr style="margin: 15px 0; border: none; border-top: 1px solid #e2e8f0;">
                    <div style="text-align: left; padding: 0 10px;">
                        <div style="display: flex; justify-content: space-between; margin: 8px 0;">
                            <span style="color: #718096;">Total Payment:</span>
                            <span style="font-weight: 600;">${formatCurrency(total5)}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin: 8px 0;">
                            <span style="color: #718096;">Total Interest:</span>
                            <span style="font-weight: 600; color: #e53e3e;">${formatCurrency(interest5)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div style="margin-top: 30px; padding: 20px; background: white; border-radius: 8px; border: 2px solid #e2e8f0;">
                <h4 style="color: #2d3748; margin-bottom: 15px;"><i class="fas fa-lightbulb"></i> Comparison Insights</h4>
                <ul style="color: #4a5568; line-height: 1.8; padding-left: 20px;">
                    <li>Shorter loan periods have higher monthly payments but lower total interest</li>
                    <li>3-year plan saves you ${formatCurrency(interest5 - interest3)} compared to 5-year plan</li>
                    <li>Monthly difference between 3-year and 5-year: ${formatCurrency(emi3 - emi5)}</li>
                </ul>
            </div>
        </div>
    `;
}

function resetLeasing() {
    document.getElementById('loanAmount').value = '';
    document.getElementById('interestRate').value = '';
    document.getElementById('loanYears').value = '3';
    document.getElementById('leasingError').textContent = '';
    document.getElementById('leasingResults').innerHTML = '';
}