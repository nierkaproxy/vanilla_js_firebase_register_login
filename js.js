// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, set, update, ref } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from
    "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyChgm_r_Uoav6I1IkkhvXfKNPhQqnEMg5Y",
    authDomain: "skelbimailogin.firebaseapp.com",
    databaseURL: "https://skelbimailogin-default-rtdb.firebaseio.com",
    projectId: "skelbimailogin",
    storageBucket: "skelbimailogin.appspot.com",
    messagingSenderId: "327927736671",
    appId: "1:327927736671:web:ea8813682302515834aeea"
  };

// Initialize Firebase, database, authentication
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

//new user registration
const registerNewUser = () => {
    const register_username = document.getElementById('register_username').value;
    const register_email = document.getElementById('register_email').value;
    const register_password = document.getElementById('register_password').value;

    createUserWithEmailAndPassword(auth, register_email, register_password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            set(ref(database, 'users/' + user.uid), {
                user_email: register_email,
                user_username: register_username
            });
            console.log('New User created!')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
}
document.getElementById('signUp').addEventListener('click', registerNewUser);

//Login existing User
const loginUser = () => {
    const login_email = document.getElementById('login_email').value;
    const login_password = document.getElementById('login_password').value;

    signInWithEmailAndPassword(auth, login_email, login_password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const loginTime = new Date()
            update(ref(database, 'users/' + user.uid), {
                last_login: loginTime

            });
            console.log(user, "Login successful!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
}
document.getElementById('signIn').addEventListener('click', loginUser);

//geting signed-in user
const user = auth.currentUser;
const login = document.querySelectorAll('.left, .right > h1 ,#login_email, #login_password, #signIn, .or')
const loginBox = document.querySelector('#login-box');
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        //write your code what user can do 
        //or what kind of functionalities can see when he is login
        const uid = user.uid;
       
        login.forEach(element => {
            element.style.display = 'none';
          });
          const signOut = document.getElementById('signOut')
          signOut.style.display = 'block';
          loginBox.style.height = '150px';
    } else {
        // User is signed out
        login.forEach(element => {
            element.style.display = 'block';
          });
        const signOut = document.getElementById('signOut')
        signOut.style.display = 'none';
        loginBox.style.height = '400px';
        console.log('logged out')
    }
});

//sign-out
document.getElementById('signOut').addEventListener('click', () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        alert('Sign-out successful!')
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
    });
})

