function updateCalculations() {
    const entryPrice = parseFloat(document.getElementById('entryPrice').value) || 0;
    const numShares = parseFloat(document.getElementById('numShares').value) || 1;
    const toggleInput = document.querySelector('.toggle-button.active').id;
    const usdToAed = 3.6639;
    const aedToUsd = 3.6823;

    let exitPrice = 0;
    let percentageIncrease = 0;

    if (toggleInput === 'percentageButton') {
        percentageIncrease = parseFloat(document.getElementById('percentageIncrease').value) / 100 || 0;
        exitPrice = entryPrice * (1 + percentageIncrease);
        document.getElementById('exitPriceLabel').textContent = exitPrice.toFixed(2);
        
        lastCalculatedPercentage = percentageIncrease;
        lastCalculatedExitPrice = exitPrice;
    } else {
        exitPrice = parseFloat(document.getElementById('exitPrice').value) || 0;
        if (entryPrice > 0) {
            percentageIncrease = (exitPrice / entryPrice - 1);
            document.getElementById('percentageIncreaseLabel').textContent = (percentageIncrease * 100).toFixed(2) + '%';
        } else {
            percentageIncrease = 0;
            document.getElementById('percentageIncreaseLabel').textContent = 'N/A';
        }
        
        lastCalculatedPercentage = percentageIncrease;
        lastCalculatedExitPrice = exitPrice;
    }

    const entryValueUsd = entryPrice * numShares;
    const exitValueUsd = exitPrice * numShares;
    const entryFeeUsd = Math.max(1, entryValueUsd * 0.0025);
    const exitFeeUsd = Math.max(1, exitValueUsd * 0.0025);

    const aedRequiredForPurchase = (entryValueUsd + entryFeeUsd) * aedToUsd;
    const aedAfterSelling = (exitValueUsd - exitFeeUsd) * usdToAed;

    const profitAed = aedAfterSelling - aedRequiredForPurchase;
    const roi = entryValueUsd > 0 ? (profitAed / aedRequiredForPurchase) * 100 : 0;

    // Format and display the results using currency formatters
    document.getElementById('entryValueUsd').textContent = usdFormatter.format(entryValueUsd);
    
    const profitElement = document.getElementById('profitAed');
    const roiElement = document.getElementById('roi');
    
    profitElement.textContent = aedFormatter.format(profitAed);
    roiElement.textContent = roi.toFixed(2) + '%';
    
    if (profitAed >= 0) {
        profitElement.className = 'value profit';
        roiElement.className = 'value profit';
    } else {
        profitElement.className = 'value loss';
        roiElement.className = 'value loss';
    }
}
