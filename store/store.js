import { observable, reaction } from 'mobx'
import 'mobx-react-lite/batchingForReactDom'

const store = observable({
    // Derivation - getters/computed
    get numberOfIncrements() {
        return store.value - 1
    },

    get filteredEvents(){
        return store.events
        // return store.events.filter(event => event.location === 'Stockholm' && event.event === 'Badminton')
    },

    // Action - ändra värde i store (mutation)
    increment() {
        store.value++
    },

    setInloggedUser(value){
        store.inloggedUser.name = value
    },

    setInloggedUserPW(value){
        store.inloggedUser.password = value
    },

    setUserData(user){
        store.user = user
    },

    setAsLoggedIn(){
        store.loggedIn = true
    },

    // State 
    value: 1,
    inloggedUser: {
        name: null,
        password: null
    },
    loggedIn: false,
    user: null,
    eventTypes: [
        'Walking', 'Running', 'Padel', 'Football', 'Swimming', 'Discgolf', 'Tennis', 'Other'
    ],
    events: [
        {
            "id": "2",
            "event": "Padel",
            "date": "7 jun",
            "created": "-",
            "duration": "60 min",
            "description": null,
            "location": "Göteborg",
            "time": "12.30",
            "attendees": "",
            "limit": 1,
            "hostId": null,
            "hostName": "Kalle",
            "longitude": 11.968996301293377,
            "latitude": 57.70653001068574
        },
        {
            "id": "3",
            "event": "Löpning",
            "date": "8 jun",
            "created": "-",
            "duration": "45 min",
            "description": null,
            "location": "Göteborg",
            "time": "18.00",
            "attendees": null,
            "limit": 5,
            "hostId": null,
            "hostName": "Pelle",
            "longitude": 11.988048367202282,
            "latitude": 57.703100532987094
        },
        {
            "id": "4",
            "event": "Promenad",
            "date": "10 jun",
            "created": "-",
            "duration": "60 min",
            "description": null,
            "location": "Stockholm",
            "time": "16.30",
            "attendees": null,
            "limit": 2,
            "hostId": null,
            "hostName": "Anna\t",
            "longitude": 11.965938583016394,
            "latitude": 57.69534400453568
        },
        {
            "id": "5",
            "event": "Klättring",
            "date": "11 jun",
            "created": "-",
            "duration": "120 min",
            "description": null,
            "location": "Malmö",
            "time": "09.45",
            "attendees": null,
            "limit": 1,
            "hostId": null,
            "hostName": "Klara",
            "longitude": 11.955756917595863,
            "latitude": 57.69825231506756
        },
        {
            "id": "6",
            "event": "Löpning",
            "date": "13 jun",
            "created": "-",
            "duration": "90 min",
            "description": null,
            "location": "Göteborg",
            "time": "19.00",
            "attendees": null,
            "limit": 2,
            "hostId": null,
            "hostName": "Johan",
            "longitude": 11.982437521219254,
            "latitude": 57.693817191384795
        },
        {
            "id": "7",
            "event": "Fotboll",
            "date": "16 jun",
            "created": "-",
            "duration": "90 min",
            "description": null,
            "location": "Malmö",
            "time": "20.00",
            "attendees": null,
            "limit": 6,
            "hostId": null,
            "hostName": "Nisse",
            "longitude": 11.962880529463291,
            "latitude": 57.71830455634495
        },
        {
            "id": "8",
            "event": "Badminton",
            "date": "20 jun",
            "created": "-",
            "duration": "60 min",
            "description": null,
            "location": "Stockholm",
            "time": "18.15",
            "attendees": null,
            "limit": 1,
            "hostId": null,
            "hostName": "Barbro",
            "longitude": 11.9832381606102,
            "latitude": 57.72938000381312
        },
    ]

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