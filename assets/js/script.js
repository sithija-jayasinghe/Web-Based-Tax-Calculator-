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

    // Personal relief: Rs. 1,800,000 per year = Rs. 150,000 per month (effective April 1, 2025)
    const monthlyRelief = 150000;

    // Calculate taxable income after relief
    const taxableIncome = Math.max(0, salary - monthlyRelief);

    // New tax brackets (2025): After relief, progressive rates apply
    // Annual: 1M @ 6%, 500K @ 18%, 500K @ 24%, 500K @ 30%, balance @ 36%
    // Monthly equivalents:
    const brackets = [
        { limit: 83333.33, rate: 0.06 },   // Rs. 1,000,000 / 12
        { limit: 41666.67, rate: 0.18 },   // Rs. 500,000 / 12
        { limit: 41666.67, rate: 0.24 },   // Rs. 500,000 / 12
        { limit: 41666.67, rate: 0.30 },   // Rs. 500,000 / 12
        { limit: Infinity, rate: 0.36 }    // Balance
    ];

    let tax = 0;
    let remaining = taxableIncome;
    let breakdown = [];
    let cumulativeTaxable = 0;

    for (let i = 0; i < brackets.length; i++) {
        if (remaining <= 0) break;

        const taxableInBracket = Math.min(remaining, brackets[i].limit);
        const taxInBracket = taxableInBracket * brackets[i].rate;

        if (taxableInBracket > 0) {
            const rangeStart = cumulativeTaxable;
            const rangeEnd = cumulativeTaxable + brackets[i].limit;

            breakdown.push({
                range: `Rs. ${rangeStart.toLocaleString()} - Rs. ${brackets[i].limit === Infinity ? 'Above' : rangeEnd.toLocaleString()}`,
                rate: (brackets[i].rate * 100).toFixed(0) + '%',
                taxable: formatCurrency(taxableInBracket),
                tax: formatCurrency(taxInBracket)
            });
            tax += taxInBracket;
            cumulativeTaxable += brackets[i].limit;
        }

        remaining -= taxableInBracket;
    }

    const netSalary = salary - tax;

    let tableHTML = `
        <table class="breakdown-table">
            <thead>
                <tr>
                    <th>Taxable Income Range</th>
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
            <h3 style="margin-bottom: 20px; color: #2d3748;">Tax Breakdown (Effective April 1, 2025)</h3>
            <div class="result-row">
                <span class="result-label">Monthly Salary</span>
                <span class="result-value">${formatCurrency(salary)}</span>
            </div>
            <div class="result-row">
                <span class="result-label">Less: Personal Relief</span>
                <span class="result-value" style="color: #48bb78;">- ${formatCurrency(monthlyRelief)}</span>
            </div>
            <div class="result-row" style="border-top: 2px solid #e2e8f0; padding-top: 10px;">
                <span class="result-label">Taxable Income</span>
                <span class="result-value">${formatCurrency(taxableIncome)}</span>
            </div>
            ${taxableIncome > 0 ? `
            <div style="margin-top: 20px;">
                <h4 style="color: #2d3748; margin-bottom: 10px;">Progressive Tax Calculation:</h4>
                ${tableHTML}
            </div>
            ` : '<p style="margin-top: 15px; color: #48bb78; font-weight: 600;">No tax applicable - salary is below the tax-free threshold.</p>'}
            <div style="margin-top: 25px; padding-top: 15px; border-top: 2px solid #e2e8f0;">
                <div class="result-row">
                    <span class="result-label" style="font-weight: 700;">Total Monthly Tax</span>
                    <span class="result-value" style="font-weight: 700; color: #e53e3e;">${formatCurrency(tax)}</span>
                </div>
                <div class="result-row">
                    <span class="result-label" style="font-weight: 700;">Net Monthly Salary</span>
                    <span class="result-value" style="font-weight: 700; color: #48bb78;">${formatCurrency(netSalary)}</span>
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

    // Personal relief: Rs. 1,800,000 per year (effective April 1, 2025)
    const annualRelief = 1800000;

    // Calculate taxable income after relief
    const taxableIncome = Math.max(0, income - annualRelief);

    // New tax brackets (2025): After relief, progressive rates apply
    // 1M @ 6%, 500K @ 18%, 500K @ 24%, 500K @ 30%, balance @ 36%
    const brackets = [
        { limit: 1000000, rate: 0.06 },
        { limit: 500000, rate: 0.18 },
        { limit: 500000, rate: 0.24 },
        { limit: 500000, rate: 0.30 },
        { limit: Infinity, rate: 0.36 }
    ];

    let tax = 0;
    let remaining = taxableIncome;
    let breakdown = [];
    let cumulativeTaxable = 0;

    for (let i = 0; i < brackets.length; i++) {
        if (remaining <= 0) break;

        const taxableInBracket = Math.min(remaining, brackets[i].limit);
        const taxInBracket = taxableInBracket * brackets[i].rate;

        if (taxableInBracket > 0) {
            const rangeStart = cumulativeTaxable;
            const rangeEnd = cumulativeTaxable + brackets[i].limit;

            breakdown.push({
                range: `Rs. ${rangeStart.toLocaleString()} - Rs. ${brackets[i].limit === Infinity ? 'Above' : rangeEnd.toLocaleString()}`,
                rate: (brackets[i].rate * 100).toFixed(0) + '%',
                taxable: formatCurrency(taxableInBracket),
                tax: formatCurrency(taxInBracket)
            });
            tax += taxInBracket;
            cumulativeTaxable += brackets[i].limit;
        }

        remaining -= taxableInBracket;
    }

    const netIncome = income - tax;

    let tableHTML = `
        <table class="breakdown-table">
            <thead>
                <tr>
                    <th>Taxable Income Range</th>
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
            <h3 style="margin-bottom: 20px; color: #2d3748;">Tax Breakdown (Effective April 1, 2025)</h3>
            <div class="result-row">
                <span class="result-label">Annual Income</span>
                <span class="result-value">${formatCurrency(income)}</span>
            </div>
            <div class="result-row">
                <span class="result-label">Less: Personal Relief</span>
                <span class="result-value" style="color: #48bb78;">- ${formatCurrency(annualRelief)}</span>
            </div>
            <div class="result-row" style="border-top: 2px solid #e2e8f0; padding-top: 10px;">
                <span class="result-label">Taxable Income</span>
                <span class="result-value">${formatCurrency(taxableIncome)}</span>
            </div>
            ${taxableIncome > 0 ? `
            <div style="margin-top: 20px;">
                <h4 style="color: #2d3748; margin-bottom: 10px;">Progressive Tax Calculation:</h4>
                ${tableHTML}
            </div>
            ` : '<p style="margin-top: 15px; color: #48bb78; font-weight: 600;">No tax applicable - income is below the tax-free threshold.</p>'}
            <div style="margin-top: 25px; padding-top: 15px; border-top: 2px solid #e2e8f0;">
                <div class="result-row">
                    <span class="result-label" style="font-weight: 700;">Total Annual Tax</span>
                    <span class="result-value" style="font-weight: 700; color: #e53e3e;">${formatCurrency(tax)}</span>
                </div>
                <div class="result-row">
                    <span class="result-label" style="font-weight: 700;">Net Annual Income</span>
                    <span class="result-value" style="font-weight: 700; color: #48bb78;">${formatCurrency(netIncome)}</span>
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

function calculateVAT() {
    const amount = parseFloat(document.getElementById('vatAmount').value);
    const vatType = document.querySelector('input[name="vatType"]:checked').value;
    const errorDiv = document.getElementById('vatError');

    errorDiv.textContent = '';

    if (!amount || amount <= 0) {
        errorDiv.textContent = 'Please enter a valid amount greater than 0';
        return;
    }

    const vatRate = 0.18; // 18% VAT in Sri Lanka (effective Jan 1, 2024)
    let vatAmount, priceExclusive, priceInclusive;
    let calculationType;

    if (vatType === 'add') {
        // Add VAT to price (Exclusive → Inclusive)
        priceExclusive = amount;
        vatAmount = amount * vatRate;
        priceInclusive = amount + vatAmount;
        calculationType = 'Adding VAT to Price';
    } else {
        // Extract VAT from price (Inclusive → Exclusive)
        priceInclusive = amount;
        priceExclusive = amount / (1 + vatRate);
        vatAmount = amount - priceExclusive;
        calculationType = 'Extracting VAT from Price';
    }

    document.getElementById('vatResults').innerHTML = `
        <div class="results">
            <h3 style="margin-bottom: 20px; color: #2d3748;">${calculationType}</h3>
            <div class="result-row">
                <span class="result-label">VAT Rate</span>
                <span class="result-value">18%</span>
            </div>
            <div class="result-row" style="border-top: 2px solid #e2e8f0; padding-top: 10px;">
                <span class="result-label">Price (VAT Exclusive)</span>
                <span class="result-value">${formatCurrency(priceExclusive)}</span>
            </div>
            <div class="result-row">
                <span class="result-label">VAT Amount (18%)</span>
                <span class="result-value" style="color: #e53e3e;">${formatCurrency(vatAmount)}</span>
            </div>
            <div class="result-row" style="border-top: 2px solid #e2e8f0; padding-top: 10px;">
                <span class="result-label" style="font-weight: 700;">Price (VAT Inclusive)</span>
                <span class="result-value" style="font-weight: 700; color: #2d3748;">${formatCurrency(priceInclusive)}</span>
            </div>
            <p style="margin-top: 15px; color: #718096; font-style: italic;">
                ${vatType === 'add'
            ? `If you sell an item for ${formatCurrency(priceExclusive)}, you need to charge ${formatCurrency(priceInclusive)} including VAT.`
            : `The price ${formatCurrency(priceInclusive)} includes ${formatCurrency(vatAmount)} VAT. The base price is ${formatCurrency(priceExclusive)}.`
        }
            </p>
        </div>
    `;
}

function resetVAT() {
    document.getElementById('vatAmount').value = '';
    document.getElementById('vatError').textContent = '';
    document.getElementById('vatResults').innerHTML = '';
}

function calculateEPF() {
    const salary = parseFloat(document.getElementById('epfSalary').value);
    const errorDiv = document.getElementById('epfError');

    errorDiv.textContent = '';

    if (!salary || salary <= 0) {
        errorDiv.textContent = 'Please enter a valid salary greater than 0';
        return;
    }

    // EPF Rates
    const employeeEpfRate = 0.08; // 8% deducted from employee
    const employerEpfRate = 0.12; // 12% contribution by employer
    const employerEtfRate = 0.03; // 3% contribution by employer (ETF)

    // Calculations
    const employeeEpf = salary * employeeEpfRate;
    const employerEpf = salary * employerEpfRate;
    const employerEtf = salary * employerEtfRate;

    // Totals
    const totalEmployerContribution = employerEpf + employerEtf;
    const totalEpfBalance = employeeEpf + employerEpf; // Total going into EPF account monthly

    document.getElementById('epfResults').innerHTML = `
        <div class="results">
            <h3 style="margin-bottom: 20px; color: #2d3748;">Contribution Breakdown</h3>
            
            <h4 style="color: #2d3748; margin-top: 15px; margin-bottom: 10px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">Employee Share (Deducted)</h4>
            <div class="result-row">
                <span class="result-label">EPF (8%)</span>
                <span class="result-value" style="color: #e53e3e;">- ${formatCurrency(employeeEpf)}</span>
            </div>
            <div class="result-row">
                <span class="result-label" style="font-weight: 600;">Net Balance from Basic</span>
                <span class="result-value" style="font-weight: 600;">${formatCurrency(salary - employeeEpf)}</span>
            </div>

            <h4 style="color: #2d3748; margin-top: 20px; margin-bottom: 10px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">Employer Share (Benefits)</h4>
            <div class="result-row">
                <span class="result-label">EPF Contribution (12%)</span>
                <span class="result-value" style="color: #48bb78;">${formatCurrency(employerEpf)}</span>
            </div>
            <div class="result-row">
                <span class="result-label">ETF Contribution (3%)</span>
                <span class="result-value" style="color: #48bb78;">${formatCurrency(employerEtf)}</span>
            </div>
             <div class="result-row" style="padding-top: 5px;">
                <span class="result-label" style="font-weight: 600;">Total Employer Cost</span>
                <span class="result-value" style="font-weight: 600; color: #e53e3e;">${formatCurrency(salary + totalEmployerContribution)}</span>
            </div>

            <div style="margin-top: 25px; padding-top: 15px; border-top: 2px solid #e2e8f0; background-color: #f7fafc; padding: 15px; border-radius: 8px;">
                <div class="result-row">
                    <span class="result-label" style="font-weight: 700; color: #2d3748;">Total Monthly EPF Savings</span>
                    <span class="result-value" style="font-weight: 700; color: #2b6cb0;">${formatCurrency(totalEpfBalance)}</span>
                </div>
                 <p style="text-align: right; font-size: 0.8em; color: #718096; margin-top: 5px;">(8% Employee + 12% Employer)</p>
            </div>
        </div>
    `;
}

function resetEPF() {
    document.getElementById('epfSalary').value = '';
    document.getElementById('epfError').textContent = '';
    document.getElementById('epfResults').innerHTML = '';
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