var config = {
    apiKey: "AIzaSyCeTq_ap8UmD0CtXkEG_mvd9ip3bCRTq_k",
    authDomain: "legindus-hacktx-2018.firebaseapp.com",
    databaseURL: "https://legindus-hacktx-2018.firebaseio.com",
    projectId: "legindus-hacktx-2018",
    storageBucket: "legindus-hacktx-2018.appspot.com",
    messagingSenderId: "776737994650"
};
var firebaseApp = firebase.initializeApp(config);

var dbRef = firebase.database().ref('users');

var app = new Vue({
    // element to mount to
    el: '#app',
    // initial data
    data: {
        query: ''
    },
    // firebase binding
    // https://github.com/vuejs/vuefire
    firebase: {
        db: dbRef
    },
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
                }
            }
            xhr.send("description="+query+"&token="+token);
        }
    }
});