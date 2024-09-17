const exchangeTable = document.getElementById('exchange-table');

// Function to fetch data from the API and display it in the table
async function fetchExchangeData() {
    try {
        const response = await fetch('http://localhost:3000/api/tickers',
        {
            method: 'GET', // Explicitly specifying the GET method
            headers: {
                'Content-Type': 'application/json', // Optional, if you need specific headers
            }
        });// Fetch data from the API
        const data = await response.json();
        
        // Extract relevant data and create table rows
        const topExchanges = Object.entries(data).slice(0, 10); // Get top 10 exchanges
        console.log(topExchanges)

        // Create table rows from the extracted data
        topExchanges.forEach(([symbol, exchangeData], index) => {
            const change=(exchangeData.sell-exchangeData.buy);
            let change_percent;
            if(exchangeData.buy!=0){
                change_percent=(change/exchangeData.buy)*100;
            }else{
                change_percent=0;
            }
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${symbol}</td>
                <td>₹ ${exchangeData.last}</td>
                <td>₹ ${exchangeData.buy} / ₹ ${exchangeData.sell}</td>
                <td>${(change_percent * 100).toFixed(2)}%</td>
                <td><span class="${change_percent > 0 ? 'positive' : 'negative'}">
                ${change_percent > 0 ? '▲' : '▼'} ₹ ${Math.abs(change).toFixed(2)}</span>
                </td>
            `;
            exchangeTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the fetchExchangeData function on page load
fetchExchangeData();

// Add style for positive and negative changes
const positive = document.createElement('style');
positive.innerHTML = `
.positive {
    color: green;
}
.negative {
    color: red;
}
`;
document.head.appendChild(positive);
