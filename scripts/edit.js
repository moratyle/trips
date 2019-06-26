'use strict'
let titleEl = document.querySelector('#trip-title')
let bodyEl = document.querySelector('#trip-body')
let removeEl = document.querySelector('#remove-trip')
let visitedEl = document.querySelector('#visited')

const tripId = location.hash.substring(1)
let trips = getSavedTrips()
let trip = trips.find(function (trip) {
    return trip.id === tripId
})

if (trip === undefined) {
    location.assign('/index.html')
}

titleEl.value = trip.title
bodyEl.value = trip.body

//save trip title
titleEl.addEventListener('input', (e) => {
    trip.title = e.target.value
    trip.updatedAt = moment().valueOf()
    saveTrips(trips)
})

//saved trip body 
bodyEl.addEventListener('input', (e) => {
    trip.body = e.target.value
    trip.updatedAt = moment().valueOf()
    saveTrips(trips)
})

//remove button
removeEl.addEventListener('click', (e) => {
    removeTrip(trip.id)
    saveTrips(trips)
    location.assign('/index.html')
})

//mark as visited
visitedEl.addEventListener('change', (e) => {
    trip.visited = e.target.checked
    saveTrips(trips)
})

//update changes across tabs/windows
window.addEventListener('storage', (e) => {
    if (e.key === 'myTrips') {
        trips = JSON.parse(e.newValue)
        trip = trips.find((trip) => {
            return trip.id === tripId
        })

        if (trip === undefined) {
            location.assign('/index.html')
        }

        titleEl.value = trip.title
        bodyEl.value = trip.body
    }
})