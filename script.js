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
    const element = e.target
    if (!isRatingNumberElement) return
    if (isRatingAlreadySelected(element)) {
        undoUserRating(element)
        return
    }
    updateRatingElements(element)
})
const isRatingAlreadySelected = (element) => {
    return element.classList.contains('selected')
}
const undoUserRating = (element) => {
    element.classList.remove('selected')
    resetRatings()
    render()
}
const isRatingNumberElement = (element) => {
    return element.matches('.card__number')
}
const updateRatingElements = (element) => {
    let selectedRatingNumber = parseInt(element.innerText)
    resetRatings()
    ratings = setRatings(selectedRatingNumber)
    render()
}
const resetRatings = () => {
    return ratings = ratings.map(rating => ({ ...rating, selected: false }))
}
const setRatings = (selectedRating) => {
    return ratings.map((rating) => {
        return selectedRating >= rating.number ?
            { ...rating, selected: !rating.selected } : { ...rating }
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
    if (isUserRatingAvailabe()) submitRating()
})

const isUserRatingAvailabe = () => {
    return ratings.some((rating) => (rating.selected))
}
const submitRating = () => {
    setElementsVisiblity(surveyElement, thankYouElement)
    totalRatingElement.innerText = ratings.length
    userRatingElement.innerText = getUserRating()
}
const setElementsVisiblity = (elementToHide, elementToShow) => {
    elementToHide.style.display = 'none'
    elementToShow.style.display = 'flex'
}
const getUserRating = () => {
    return ratings.filter((rating) => rating.selected).length
}

render()