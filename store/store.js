import { observable, reaction } from 'mobx'
import 'mobx-react-lite/batchingForReactDom'

const store = observable({
    // Derivation
    get numberOfIncrements() {
        return store.value - 1
    },

    get filteredEvents() {
        if (store.cityFilter) {
            return store.events.filter(event => event.location === store.cityFilter).slice().sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1)
        }
        else {      
            return store.events.slice().sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1)
        }
    },

    get filteredEventTypes(){
        return store.eventTypes.filter(type => type.checked === true)
    },

    get markedEventInfo() {
        return store.events.filter(event => event.postId == store.markedEvent.postId)[0]
    },

    // Actions
    increment() {
        store.value++
    },

    setCityFilter(city) {
        store.cityFilter = city
    },

    setEvents(events) {
        store.events = events
    },

    setFilteredEvents(events) {
        store.filteredEvents = events
    },

    setInloggedUser(value) {
        store.inloggedUser.name = value
    },

    setInloggedUserPW(value) {
        store.inloggedUser.password = value
    },

    setMarkedEvent(id) {
        store.markedEvent = store.events.filter(event => event.postId == id)[0]
    },

    setUserData(user) {
        store.user = user
    },

    setAsLoggedIn() {
        store.loggedIn = true
    },

    setAsLoggedOut() {
        store.loggedIn = false
    },

    updateCheckbox(id) {
        let objIndex = store.eventTypes.findIndex((obj => obj.id == id))
        store.eventTypes[objIndex].checked = !store.eventTypes[objIndex].checked
    },

    // State 
    value: 1,
    cityFilter: null,
    inloggedUser: {
        name: null,
        password: null
    },
    loggedIn: false,
    markedEventId: null,
    markedEvent: null,
    user: { username: '' },
    eventTypes: [
        { id: '1', type: 'Bandy', checked: true },
        { id: '2', type: 'Cykling', checked: true },
        { id: '3', type: 'Fotboll', checked: true },
        { id: '4', type: 'Gym', checked: true },
        { id: '5', type: 'Klättring', checked: true },
        { id: '6', type: 'Löpning', checked: true },
        { id: '7', type: 'Simning', checked: true },
        { id: '8', type: 'Tennis', checked: true },
        { id: '9', type: 'Övrigt', checked: true },

    ],
    events: [],
})

export default store