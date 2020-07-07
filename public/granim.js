var granimInstance = new Granim({
    element: "#granim-canvas",
    direction: "left-right",
    isPausedWhenNotInView: true,
    image: {
        source: '/bg.jpg',
        blendingMode: 'color',
    },
    states: {
        "default-state": {
            gradients: [
                ["#ff9cd1", "#ffb86b"],
                ["#fffb91", "#d1ff91"],
                ["#9aff91", "#91ffe5"],
                ["#91d1ff", "#818bfc"],
                ["#b481fc", "#f681fc"]
            ],
            transitionSpeed: 10000
        }
    }
});