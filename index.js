const Chart = require('chart.js')

const ctx = $('.my-chart')
const myBudget = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: [
            'Mortgage', 'Groceries', 'Pharmacy',
            'HOA Fees', 'Electricity', 'Internet',
            'Credit Cards', 'Subscriptions'
        ]
    }
})