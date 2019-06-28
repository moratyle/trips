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
    const tripEl = document.createElement('a')
    const textEl = document.createElement('p')


    // Setup the note title text
    if (trip.title.length > 0) {
        textEl.textContent = trip.title
    } else {
        textEl.textContent = 'Unnamed note'
    }
    textEl.classList.add('list-item__title')
    tripEl.appendChild(textEl)

    //setup link
    tripEl.setAttribute('href', `/edit.html#${trip.id}`)
    tripEl.classList.add('list-item')

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
        const hidePastMatch = filters.hidePastTrips || !trip.visited
        return searchTextMatch && hidePastMatch
    })

    document.querySelector('#trips').innerHTML = ''

    //add trips to DOM
    if (filteredTrips.length > 0) {
        filteredTrips.forEach((trip) => document.querySelector('#trips').appendChild(generateTripDOM(trip)))
        //write message if no user trips
    } else {
        const msgEl = document.createElement('p')
        msgEl.classList.add('empty-message')
        msgEl.textContent = 'You have no upcomming trips'
        document.querySelector('#trips').appendChild(msgEl)
    }
}