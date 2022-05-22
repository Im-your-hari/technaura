
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDQLVAIOFBvZTTk_TdwrIfbubGDeDYXeUU",
    authDomain: "technaura-contact.firebaseapp.com",
    projectId: "technaura-contact",
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

//document.getElementById('frmContact')