const firebaseConfig = {
    apiKey: "AIzaSyDQLVAIOFBvZTTk_TdwrIfbubGDeDYXeUU",
    authDomain: "technaura-contact.firebaseapp.com",
    databaseURL: "https://technaura-contact-default-rtdb.firebaseio.com",
    projectId: "technaura-contact",
    storageBucket: "technaura-contact.appspot.com",
    messagingSenderId: "951215708702",
    appId: "1:951215708702:web:8b464288bb4d3945d0ec0f",
    measurementId: "G-MHXHNY4PK7"
  };
firebase.initializeApp(firebaseConfig);

//reference database
var contactFormDB = firebase.database().ref('contactForm')

document.getElementById('frmContact').addEventListener('submit',submitForm);

function submitForm(e){
    e.preventDefault();
    var name = getElementVal('contact-name');
    var email = getElementVal('contact-email');
    var subject = getElementVal('contact-subject');
    var message = getElementVal('contact-message');

    //console.log(name + ' ' + email + ' ' + subject + ' ' + message);
    saveData(name, email, subject, message);
    document.querySelector('.popup').style.display = 'block';
    setTimeout(()=>{
        document.querySelector('.popup').style.display = 'none';
    },3000);
    
}


const saveData = (name, email, subject, message) => {
    document.getElementById('frmContact').reset();
    var newContactForm = contactFormDB.push();
    newContactForm.set({
        name: name,
        email: email,
        subject: subject,
        message: message
    });

    

}

const getElementVal = (id) =>{
    return document.getElementById(id).value;
}

