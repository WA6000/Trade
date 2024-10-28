function calculateProfit() {
    // Retrieve input values
    const shares = parseFloat(document.getElementById('shares').value);
    const entryPrice = parseFloat(document.getElementById('entryPrice').value);
    const exitPrice = parseFloat(document.getElementById('exitPrice').value);
    const resultDiv = document.getElementById('result');

    // Validate inputs
    if (isNaN(shares) || isNaN(entryPrice) || isNaN(exitPrice) || shares <= 0 || entryPrice <= 0 || exitPrice <= 0) {
        resultDiv.innerHTML = `<p style="color: red;">Please enter valid numbers greater than zero.</p>`;
        return;
    }

    // Constants for conversion rates and fees
    const conversionRateIn = 3.6823;   // AED to USD when buying
    const conversionRateOut = 3.6639;  // AED to USD when selling
    const feeRate = 0.0025;            // 0.25%
    const minFee = 1.00;               // Minimum fee of $1

    // Calculate total cost in USD when buying
    const totalEntryUSD = shares * entryPrice;
    const calculatedEntryFeeUSD = totalEntryUSD * feeRate;
    const entryFeeUSD = Math.max(calculatedEntryFeeUSD, minFee);
    const totalEntryUSDWithFee = totalEntryUSD + entryFeeUSD;

    // Convert total cost to AED when buying
    const totalEntryAED = totalEntryUSDWithFee * conversionRateIn;

    // Calculate total proceeds in USD when selling
    const totalExitUSD = shares * exitPrice;
    const calculatedExitFeeUSD = totalExitUSD * feeRate;
    const exitFeeUSD = Math.max(calculatedExitFeeUSD, minFee);
    const totalExitUSDWithFee = totalExitUSD - exitFeeUSD;

    // Convert total proceeds to AED when selling
    const totalExitAED = totalExitUSDWithFee * conversionRateOut;

    // Calculate net profit in AED
    const netProfitAED = totalExitAED - totalEntryAED;

    // Format currency
    function formatCurrency(value, currency = 'AED') {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(value);
    }

    // Display results
    resultDiv.innerHTML = `
        <h2>Profit Summary</h2>
        <p><strong>Total Investment (${formatCurrency(0).replace(/\d/g, '').trim()}):</strong> ${formatCurrency(totalEntryAED)}</p>
        <p><strong>Entry Fee (USD):</strong> ${formatCurrency(entryFeeUSD, 'USD')}</p>
        <p><strong>Total Returns (${formatCurrency(0).replace(/\d/g, '').trim()}):</strong> ${formatCurrency(totalExitAED)}</p>
        <p><strong>Exit Fee (USD):</strong> ${formatCurrency(exitFeeUSD, 'USD')}</p>
        <p><strong>Net Profit (${formatCurrency(0).replace(/\d/g, '').trim()}):</strong> ${formatCurrency(netProfitAED)}</p>
    `;
}
