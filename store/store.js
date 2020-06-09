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

    // get markedEvent(){
    //     return store.events.filter(event => event.id == store.markedEventId)
    // },

    // Action - ändra värde i store (mutation)
    increment() {
        store.value++
    },

    setEvents(events){
        store.events = events
    },

    setInloggedUser(value){
        store.inloggedUser.name = value
    },

    setInloggedUserPW(value){
        store.inloggedUser.password = value
    },

    setMarkedEvent(id){
        store.markedEvent = store.events.filter(event => event.id == id)[0]
    },

    setUserData(user){
        store.user = user
    },

    setAsLoggedIn(){
        store.loggedIn = true
    },

    setAsLoggedOut(){
        store.loggedIn = false
    },

    // State 
    value: 1,
    inloggedUser: {
        name: null,
        password: null
    },
    loggedIn: true,
    markedEventId: null,
    markedEvent: null,
    // user: null,
    user: {username: 'melker'},
    eventTypes: [
        'Walking', 'Running', 'Padel', 'Football', 'Swimming', 'Discgolf', 'Tennis', 'Other'
    ],
     events: null
    //  [
    //     {
    //         "id": "2",
    //         "event": "Padel",
    //         "date": "7 jun",
    //         "created": "-",
    //         "duration": "60 min",
    //         "description": 'Tänkte mig en go Padel-match med någon som är van Padelspelare. ',
    //         "location": "Göteborg",
    //         "time": "12.30",
    //         "attendees": '[{"id": "5", "name": "Barbro"}, {"id": "2", "name": "Nisse"}, {"id": "3", "name": "Josef"}]',
    //         "limit": 3,
    //         "hostId": null,
    //         "hostName": "Kalle",
    //         "longitude": 11.968996301293377,
    //         "latitude": 57.70653001068574
    //     },
    //     {
    //         "id": "3",
    //         "event": "Löpning",
    //         "date": "8 jun",
    //         "created": "-",
    //         "duration": "45 min",
    //         "description": 'Intervallöpning är det som gäller. Rusa 30 sek, vila 10. Så håller det på. Intervallöpning är det som gäller. Rusa 30 sek, vila 10. Så håller det på. Intervallöpning är det som gäller. Rusa 30 sek, vila 10. Så håller det på. Intervallöpning är det som gäller. Rusa 30 sek, vila 10. Så håller det på. Intervallöpning är det som gäller. Rusa 30 sek, vila 10. Så håller det på. Intervallöpning är det som gäller. Rusa 30 sek, vila 10. Så håller det på. Intervallöpning är det som gäller. Rusa 30 sek, vila 10. Så håller det på.  ',
    //         "location": "Göteborg",
    //         "time": "18.00",
    //         "attendees": "{}",
    //         "limit": 5,
    //         "hostId": null,
    //         "hostName": "Pelle",
    //         "longitude": 11.988048367202282,
    //         "latitude": 57.703100532987094
    //     },
    //     {
    //         "id": "4",
    //         "event": "Promenad",
    //         "date": "10 jun",
    //         "created": "-",
    //         "duration": "60 min",
    //         "description": 'Powerwalk med mig och min hund.',
    //         "location": "Stockholm",
    //         "time": "16.30",
    //         "attendees": "{}",
    //         "limit": 2,
    //         "hostId": null,
    //         "hostName": "Anna\t",
    //         "longitude": 11.965938583016394,
    //         "latitude": 57.69534400453568
    //     },
    //     {
    //         "id": "5",
    //         "event": "Klättring",
    //         "date": "11 jun",
    //         "created": "-",
    //         "duration": "120 min",
    //         "description": 'Vi kör på 10-meters väggen utan lina.',
    //         "location": "Malmö",
    //         "time": "09.45",
    //         "attendees": "{}",
    //         "limit": 1,
    //         "hostId": null,
    //         "hostName": "Klara",
    //         "longitude": 11.955756917595863,
    //         "latitude": 57.69825231506756
    //     },
    //     {
    //         "id": "6",
    //         "event": "Löpning",
    //         "date": "13 jun",
    //         "created": "-",
    //         "duration": "90 min",
    //         "description": 'Vill ha någon att träna med inför Göteborgsvarvet.',
    //         "location": "Göteborg",
    //         "time": "19.00",
    //         "attendees": "{}",
    //         "limit": 2,
    //         "hostId": null,
    //         "hostName": "Johan",
    //         "longitude": 11.982437521219254,
    //         "latitude": 57.693817191384795
    //     },
    //     {
    //         "id": "7",
    //         "event": "Fotboll",
    //         "date": "16 jun",
    //         "created": "-",
    //         "duration": "90 min",
    //         "description": 'Fotbollsmatch, korpnivå typ. Vi behöver några spelare till.',
    //         "location": "Malmö",
    //         "time": "20.00",
    //         "attendees": '[{"id": "5", "name": "Barbro"}, {"id": "2", "name": "Nisse"}]',
    //         "limit": 6,
    //         "hostId": null,
    //         "hostName": "Nisse",
    //         "longitude": 11.962880529463291,
    //         "latitude": 57.71830455634495
    //     },
    //     {
    //         "id": "8",
    //         "event": "Badminton",
    //         "date": "20 jun",
    //         "created": "-",
    //         "duration": "60 min",
    //         "description": 'Medelduktig motspelare sökes',
    //         "location": "Stockholm",
    //         "time": "18.15",
    //         "attendees": "{}",
    //         "limit": 1,
    //         "hostId": null,
    //         "hostName": "Barbro",
    //         "longitude": 11.9832381606102,
    //         "latitude": 57.72938000381312
    //     },
    // ]

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