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
    const newItem = {
        amount: $('#amount').val(),
        category: $('#category').val(),
        notes: $('#notes').val(),
        month: id
    }

    $.post(`/api/month/${id}`, newItem)
})

$.get(`/api/budget/${month}`)
    .then(data => {
        const looseBudget = budgetItems(data)
        console.log('get data', data)

        // console.log('getCats', getCats(data))

        const tightBudget = () => {
           const budgetSums = looseBudget.reduce((object, item) => {
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

        if (!data[0].items.length) {
            console.log('welcome to the if')
            const canvas = $('#chart')
            const ctx = canvas[0].getContext('2d')
            ctx.font = '18pt Helvetica'
            ctx.fillText('Add an expense to start your budget', 20, 50)
            return
        }
        // console.log('tight budget', tightBudget())
        const ctx = $('#chart')
        const myBudget = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: getCats(data),
                datasets: [{
                    data: tightBudget(),
                    backgroundColor: colors,
                    label: "Monthly Budget"
                }],
            },
            options: {
                
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
    data[0].items.map(budget => {
        items.push({ amount: budget.amount, category: budget.category })
    })
    return items
}

