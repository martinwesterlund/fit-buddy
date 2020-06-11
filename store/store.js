import { observable, reaction } from 'mobx'
import 'mobx-react-lite/batchingForReactDom'

const store = observable({
    // Derivation - getters/computed
    get numberOfIncrements() {
        return store.value - 1
    },

    // get eventTypesData(){
    //     return store.eventTypes
    // },

    get filteredEvents() {
        if (store.cityFilter) {
            return store.events.filter(event => event.location === store.cityFilter).slice().sort((a, b) => (a.completeDate > b.completeDate) ? 1 : -1)
        }
        else {
            
            return store.events.slice().sort((a, b) => (a.completeDate > b.completeDate) ? 1 : -1)
        }

    },

    get filteredEventTypes(){
        return store.eventTypes.filter(type => type.checked === true)
    },

    get markedEventInfo() {

        return store.events.filter(event => event.id == store.markedEvent.id)[0]
    },

    // get markedEventData(){
    //     return store.events.filter(event => event.id == store.markedEvent.id)
    // },

    // get markedEvent(){
    //     return store.events.filter(event => event.id == store.markedEventId)
    // },

    // Action - ändra värde i store (mutation)
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
        store.markedEvent = store.events.filter(event => event.id == id)[0]
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
        console.log('Ändrar checkbox värde')
        let objIndex = store.eventTypes.findIndex((obj => obj.id == id))
        console.log('Innan ändring: ' + store.eventTypes[objIndex].checked)
        store.eventTypes[objIndex].checked = !store.eventTypes[objIndex].checked
        console.log('Efter: ' + store.eventTypes[objIndex].checked)
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
    // user: null,
    user: { username: '' },
    eventTypes: [
        { id: '1', type: 'Löpning', checked: true },
        { id: '2', type: 'Promenad', checked: true },
        { id: '3', type: 'Padel', checked: true },
        { id: '4', type: 'Fotboll', checked: true },
        { id: '5', type: 'Simning', checked: true },
        { id: '6', type: 'Frisbeegolf', checked: true },
        { id: '7', type: 'Övrigt', checked: true }

    ],
    events: [],


})

// Reaction - Uppgifter som utgörs (till exempel fetch) när vissa saker händer. Motsvarar watch i Vuex (och i Vue.js).
reaction(
    // Vilket värde är vi intresserade av?
    () => {
        return store.value
    },
    // Vad ska vi göra när det ändras?
    () => {
        console.log('Kör varje gång value ändras')
    }
)

export default store