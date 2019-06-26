'use strict'

//read existing trips from local storage
const getSavedTrips = () => {
    const tripsJSON = localStorage.getItem('myTrips')

    if (tripsJSON !== null) {
        return JSON.parse(tripsJSON)
    } else {
        return []
    }
}

//save trips to local storage
const saveTrips = (trips) => {
    localStorage.setItem('myTrips', JSON.stringify(trips))
}

//remove a trip
const removeTrip = (id) => {
    const tripIndex = trips.findIndex((trip) => {
        return trip.id === id
    })
    if (tripIndex > -1) {
        trips.splice(tripIndex, 1)
    }
}
//generate DOM structure for a trip
const generateTripDOM = (trip) => {
    const tripEl = document.createElement('div')
    const textEl = document.createElement('a')
    const button = document.createElement('button')
    const link = document.createElement('a')

    //setup remove button
    button.textContent = 'x'
    tripEl.appendChild(button)
    button.addEventListener('click', () => {
        removeTrip(trip.id)
        saveTrips(trips)
        renderDOM(trips, filters)
    })

    //setup trip title
    if (trip.title.length > 0) {
        textEl.textContent = trip.title
    } else {
        textEl.textContent = 'Unnamed trip'
    }
    textEl.setAttribute('href', `/edit.html#${trip.id}`)
    tripEl.appendChild(textEl)



    return tripEl
}

//sort trips
const sortTrips = (trips, sortBy) => {
    if (sortBy === 'byEdited') {
        return trips.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return trips.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'alphabetical') {
        return trips.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return trips
    }
}

//render DOM elements
const renderDOM = (trips, filters) => {
    trips = sortTrips(trips, filters.sortBy)
    const filteredTrips = trips.filter((trip) => {
        const searchTextMatch = trip.title.toLowerCase().includes(filters.searchText.toLowerCase())
        const hidePastMatch = filters.hidePastTrips || !trip.status
        return searchTextMatch && hidePastMatch
    })

    document.querySelector('#trips').innerHTML = ''

    filteredTrips.forEach((trip) => {
        const tripEl = generateTripDOM(trip)
        document.querySelector('#trips').appendChild(tripEl)
    })
}