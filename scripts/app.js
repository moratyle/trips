'use strict'

let trips = getSavedTrips()

const filters = {
    searchText: '',
    hidePastTrips: false,
    sortBy: 'byEdited'
}

renderDOM(trips, filters)

//create trip button
document.querySelector('#create-trip').addEventListener('click', (e) => {
    const id = uuidv4()
    const timestamp = moment().valueOf()
    trips.push({
        id: id,
        title: '',
        body: '',
        visited: false,
        createdAt: timestamp,
        updatedAt: timestamp
    })
    saveTrips(trips)
    location.assign(`/edit.html#${id}`)
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
    filters.sortBy = e.target.value
    renderDOM(trips, filters)
})

//update changes across tabs/windows
window.addEventListener('storage', (e) => {
    if (e.key == 'myTrips') {
        trips = JSON.parse(e.newValue)
        renderDOM(trips, filters)
    }
})

