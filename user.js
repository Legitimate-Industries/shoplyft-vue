var config = {
    apiKey: "AIzaSyCeTq_ap8UmD0CtXkEG_mvd9ip3bCRTq_k",
    authDomain: "legindus-hacktx-2018.firebaseapp.com",
    databaseURL: "https://legindus-hacktx-2018.firebaseio.com",
    projectId: "legindus-hacktx-2018",
    storageBucket: "legindus-hacktx-2018.appspot.com",
    messagingSenderId: "776737994650"
};
var firebaseApp = firebase.initializeApp(config);

var db = firebase.database();
var data = {
    query: '',
    hasTicket: false,
    ticketId: null,
    category: null,
    status: 0,
    chat: [],
    stat: function(it) {
        if(it == 0) {
            return "waiting for employee";
        }
        if(it == 1) {
            return "employee is assisting";
        }
        if(it == 2) {
            return "assistance complete";
        }
    }
};

// var firebase = function () {
//     return { tickets: db.ref('/queries/') }
// };



var app = new Vue({
    // element to mount to
    el: '#app',
    // initial data
    data: data,
    // firebase binding
    // https://github.com/vuejs/vuefire
    // firebase: firebase,
    // methods
    methods: {
        getHelp: function (query) {
            var token = "secretlol";

            var xhr = new XMLHttpRequest();
            xhr.open("POST", 'https://shoplyft.kirbyquerby.me/createQuery', true);

            //Send the proper header information along with the request
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            xhr.onreadystatechange = function () {//Call a function when the state changes.
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    console.log(xhr.responseText);
                    data.hasTicket = true;
                    data.ticketId = xhr.responseText;
                    // console.log(firebase.tickets);
                    // console.log(firebase.tickets.child(data.ticketId).);
                    var qRef = firebase.database().ref('/queries/').child(data.ticketId);

                    qRef.child('category').on('value', function(snapshot) {
                        data.category = snapshot.val();
                    });

                    qRef.child('status').on('value', function(snapshot) {
                        data.status = snapshot.val();
                    });

                    qRef.child('chat').on('value', function(snapshot) {
                        data.chat = snapshot.val();
                    });

                }
            }
            xhr.send("description=" + query + "&token=" + token);
        }
    }
});