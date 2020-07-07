const url = window.location.pathname
const urlArr = url.split('/')
const month = urlArr[1]
const id = urlArr[3]
const colors = [
    "#ff9cd1",
    "#ffb86b",
    "#fffb91",
    "#d1ff91",
    "#9aff91",
    "#91ffe5",
    "#91d1ff",
    "#818bfc",
    "#b481fc",
    "#f681fc",
    "#fc6fb6",
    "#ff9cd1",
    "#ffb86b",
    "#fffb91",
    "#d1ff91",
    "#91ffe5"
]

$('#budget-submit').on('click', () => {
    if ($('#category').val() === 'Income') {
        const newIncome = {
            amount: $('#amount').val(),
            category: $('#category').val(),
            notes: $('#notes').val(),
            month: id
        }
        $.post(`/api/income/month/${id}`, newIncome)
    } else {
        const newItem = {
            amount: $('#amount').val(),
            category: $('#category').val(),
            notes: $('#notes').val(),
            month: id
        }
        $.post(`/api/budget/month/${id}`, newItem)
    }
})

$.get(`/api/budget/${month}`)
    .then(data => {
        const looseBudget = budgetItems(data[0].items)
        const looseIncome = budgetItems(data[0].income)
        const tightB = tightBudget(looseBudget)
        const tightI = tightBudget(looseIncome)

        const allTotal = incomeVsExpenseCalc(tightI[0], tightB)
        const remainingMon = allTotal[0] - allTotal[1]
        console.log('remainingMon', remainingMon)
        // console.log('tight budget', tightB)

        const listEl = $('#budget-list')
        const incomeEl = $('#income-list')
        const totalEl = $('.foot')

        for (let res of data[0].items) {
            listEl.append(`
            <ul id=${res._id}>
                <li>Amount: $${res.amount}</li>
                <li>Category: ${res.category}</li>
                <li>Notes: ${res.notes}</li>
            </ul>
            `)
        }

        for (let res of data[0].income) {
            incomeEl.append(`
            <ul id=${res._id}>
                <li>Amount: $${res.amount}</li>
                <li>Notes: ${res.notes}</li>
            </ul>
            `)
        }

        totalEl.append(`
            <h2>Remaing: $${remainingMon}
        `)        

        if (!data[0].items.length) {
            console.log('welcome to the if')
            const canvas = $('#expense-chart')
            const ctx = canvas[0].getContext('2d')
            ctx.font = '10.5pt Arial'
            ctx.fillText("Nuthin' yet!", 5, 50)
            return
        }
        // console.log('tight budget', tightBudget())
        const pie = $('#expense-chart')
        const donut = $('#income-chart')

        // const expCanvas = expenseChart[0].getContext('d2')
        // const incCanvas = incomeChart[0].getContext('d2')

        const myBudget = new Chart(pie, {
            type: 'pie',
            data: {
                labels: getCats(data),
                datasets: [{
                    data: tightB,
                    backgroundColor: colors,
                    label: "Monthly Budget"
                }],
            },
            options: {
                
            }
        })

        const myIncome = new Chart(donut, {
            type: 'doughnut',
            data: {
                labels: ['Total Income', 'Total Expenses'],
                datasets: [{
                    data: allTotal,
                    backgroundColor: ['#91ffe5', '#b481fc'],
                    label: 'Income vs. Expenses'
                }]
            },
            options: {
                // cutoutPercentage: 75,
                legend: {
                    position: 'bottom'
                }
            }
        })
    })

const getCats = data => {
    let items = []
    data.map(budget => {
        for (let res of budget.items) {
            items.push(res.category)
        }
    })
    items = Array.from(new Set(items))
    // console.log('items array.from', items)
    return items
}

const budgetItems = data => {
    let items = []
    data.map(budget => {
        items.push({ amount: budget.amount, category: budget.category })
    })
    return items
}

const tightBudget = data => {
    const budgetSums = data.reduce((object, item) => {
        const category = item.category
        const amount = parseFloat(item.amount)
        if (!object.hasOwnProperty(category)) {
            object[category] = 0
        }

        object[category] += amount
        return object
    }, {})

    const sums = Object.keys(budgetSums).map(key => budgetSums[key]);
    return sums
}

const incomeVsExpenseCalc = (income, expenses) => {
    const totalExpenses = expenses.reduce((a, b) => a + b, 0) 
    const incVsExp = [income, totalExpenses]
    return incVsExp
}
