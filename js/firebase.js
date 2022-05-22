/*
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDQLVAIOFBvZTTk_TdwrIfbubGDeDYXeUU",
    authDomain: "technaura-contact.firebaseapp.com",
    projectId: "technaura-contact",
    databaseURL:"https://technaura-contact-default-rtdb.firebaseio.com",
    storageBucket: "technaura-contact.appspot.com",
    messagingSenderId: "951215708702",
    appId: "1:951215708702:web:8b464288bb4d3945d0ec0f",
    measurementId: "G-MHXHNY4PK7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Get reference of database
const db = getDatabase(app);

document.getElementById("frmContact").addEventListener('submit',function(e) {
    e.preventDefault();
    console.log("123");
    set(ref(db,'users/'+Math.random().toString(36).slice(2,7)),{
        name : document.getElementById('contact-name').value,
        email :  document.getElementById('contact-email').value,
        subject : document.getElementById('contact-subject').value,
        message : document.getElementById('contact-message').value

    });
    alert("Succesfully Submitted..!")
    document.getElementById('frmContact').reset()
});
*/
const firebaseConfig = {
    apiKey: "AIzaSyDQLVAIOFBvZTTk_TdwrIfbubGDeDYXeUU",
    authDomain: "technaura-contact.firebaseapp.com",
    projectId: "technaura-contact",
    databaseURL:"https://technaura-contact-default-rtdb.firebaseio.com",
    storageBucket: "technaura-contact.appspot.com",
    messagingSenderId: "951215708702",
    appId: "1:951215708702:web:8b464288bb4d3945d0ec0f",
    measurementId: "G-MHXHNY4PK7"
};
firebase.initializeApp(firebaseConfig);
//Ref initialization
var msgRef = firebase.database().ref('messages');

document.getElementById('frmContact').addEventListener('submit',submitForm);

function submitForm(e){
    e.preventDefault();

    var name = document.getElementById('contact-name').value
    var email = document.getElementById('contact-email').value
    var subject = document.getElementById('contact-subject').value
    var message = document.getElementById('contact-message').value

    console.log(name,email,subject,message)
    saveData(name,email,subject,message)
}
//Save data
function saveData(name, email, subject, message) {
    var newMsgRef = msgRef.push()
    newMsgRef.set({
        name: name,
        email: email,
        subject: subject,
        message: message
    });
}