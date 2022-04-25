const submitButton = document.querySelector('[data-submit-button]')
const numberButtonsContainer = document.querySelector('[data-number-buttons-container]')
const surveyElement = document.querySelector('[data-survey]')
const thankYouElement = document.querySelector('[data-thank-you]')
const userRatingElement = document.querySelector('[data-user-rating]')
const totalRatingElement = document.querySelector('[data-total-rating]')

let ratings = [
    { number: 1, selected: false },
    { number: 2, selected: false },
    { number: 3, selected: false },
    { number: 4, selected: false },
    { number: 5, selected: false },
]

numberButtonsContainer.addEventListener('click', (e) => {
    if (e.target.matches('.card__number')) {
        if (e.target.classList.contains('selected')) {
            e.target.classList.remove('selected')
            resetRatings()
            render()
            return
        }
        let selectedRating = parseInt(e.target.innerText)
        resetRatings()
        ratings = setRatings(selectedRating)
        render()
    }
})
const resetRatings = () => {
    return ratings = ratings.map(rating => ({ ...rating, selected: false }))
}
const setRatings = (selectedRating) => {
    return ratings.map((rating) => {
        if (selectedRating >= rating.number) {
            return { ...rating, selected: !rating.selected }
        } else {
            return { ...rating }
        }
    })
}

const render = () => {
    clearElement(numberButtonsContainer)
    ratings.forEach(rating => {
        const numberElement = document.createElement('button')
        numberElement.classList.add('card__number')
        if (rating.selected) {
            numberElement.classList.add('selected')
        }
        numberElement.innerText = rating.number
        numberButtonsContainer.append(numberElement)
    })
}
const clearElement = (element) => {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

submitButton.addEventListener('click', () => {
    if (isRatingAvailabe()) submitRating()
})

const isRatingAvailabe = () => {
    return ratings.some((rating) => (rating.selected))
}
const submitRating = () => {
    surveyElement.style.display = 'none'
    thankYouElement.style.display = 'flex'
    totalRatingElement.innerText = ratings.length
    userRatingElement.innerText = ratings.filter((rating) => rating.selected).length
}

render()