import { observable, reaction } from 'mobx'
import 'mobx-react-lite/batchingForReactDom'

const store = observable({
    // Derivation - getters/computed
    get numberOfIncrements() {
        return store.value - 1
    },

    get filteredEvents() {
        if(store.cityFilter){
            return store.events.filter(event => event.location === store.cityFilter)
        }
        else{
            return store.events
        }
        // return store.events.filter(event => event.location === 'Stockholm' && event.event === 'Badminton')
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

    setCityFilter(city){
        store.cityFilter = city
    },

    setEvents(events) {
        store.events = events
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

    // State 
    value: 1,
    cityFilter: null,
    inloggedUser: {
        name: null,
        password: null
    },
    loggedIn: true,
    markedEventId: null,
    markedEvent: null,
    // user: null,
    user: { username: 'melker' },
    eventTypes: [
        {id: 1, type: 'Löpning'},
        {id: 2, type: 'Promenad'}
        
    ],
    events: []


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