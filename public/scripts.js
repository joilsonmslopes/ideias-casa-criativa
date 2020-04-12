function  onOff() {
    document
    .querySelector('#modal')
    .classList
    .toggle('hide')

    document
    .querySelector('body')
    .classList
    .toggle('hideScroll')

    document
    .querySelector('#modal')
    .classList
    .toggle('addScroll')
}

function checkFields(event) {

    const valuesToCheck = [
        "title",
        "image",
        "category",
        "description",
        "link"
    ]

    console.log()

    const isEmpty = valuesToCheck.find(function(value) {
        
        const checkIfIsString = typeof event.target[value].value === "string"
        const checkIsIfEmpty = !event.target[value].value.trim();
        if (checkIfIsString && checkIsIfEmpty) {
            return true
        }
    })

    if (isEmpty) {
        event.preventDefault()
        alert("Por favor, preencha todos os campos!")
    }
}