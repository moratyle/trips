'use strict'

let trips = []

const filters = {
    searchText: '',
    hidePastTrips: false
}

//check for existing saved data
const tripsJSON = localStorage.getItem('myTrips')

if (tripsJSON !== null) {
    trips = JSON.parse(tripsJSON)
}

//render DOM elements
const renderDOM = (trips, filters) => {
    const filteredTrips = trips.filter((trip) => {
        const searchTextMatch = trip.title.toLowerCase().includes(filters.searchText.toLowerCase())
        const hidePastMatch = filters.hidePastTrips || !trip.status

        return searchTextMatch && hidePastMatch
    })

    document.querySelector('#trips').innerHTML = ''

    filteredTrips.forEach((trip) => {
        const tripEl = document.createElement('p')

        if (trip.title.length > 0) {
            tripEl.textContent = trip.title
        } else {
            tripEl.textContent = 'Unnamed note'
        }
        document.querySelector('#trips').appendChild(tripEl)
    })
}

renderDOM(trips, filters)

//create trip button
document.querySelector('#create-trip').addEventListener('click', (e) => {
    trips.push({
        title: '',
        body: ''
    })
    localStorage.setItem('myTrips', JSON.stringify(trips))
    renderDOM(trips, filters)
})

//filter: search text
document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderDOM(trips, filters)
})

//filter: check for past trips
document.querySelector('#past-trips').addEventListener('change', (e) => {
    filters.hidePastTrips = e.target.checked
    renderDOM(trips, filters)
})

//filter: catagories
document.querySelector('#filter-by').addEventListener('change', (e) => {
    console.log(e.target.value)
})