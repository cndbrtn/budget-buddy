$("#month-submit").on('click', () => {
        const month = $("#month").val()
        console.log('month value', month)
        $.get(`/api/budget/${month}`)
            .then((res) => {
                console.log(res[0]._id)
                window.location.assign(`/${month}/budget/${res[0]._id}`)
            })
})
