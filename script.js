const firebaseConfig = {
  apiKey: "AIzaSyACVV-TFDNi0B6tt4eKriauervwbrj2U9I",
  authDomain: "indigo-edu.firebaseapp.com",
  projectId: "indigo-edu",
  storageBucket: "indigo-edu.firebasestorage.app",
  messagingSenderId: "67616025767",
  appId: "1:67616025767:web:a57654bdb0de3c6b787f82",
  measurementId: "G-F3E4LCMZKL"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const authDiv = document.getElementById("auth");
const dash = document.getElementById("dashboard");
const appsDiv = document.getElementById("apps");
const admin = document.getElementById("admin");

function signup(){
 auth.createUserWithEmailAndPassword(email.value,password.value);
}

function login(){
 auth.signInWithEmailAndPassword(email.value,password.value);
}

function logout(){
 auth.signOut();
}

auth.onAuthStateChanged(user=>{
 if(user){
  authDiv.hidden=true;
  dash.hidden=false;

  db.collection("users").doc(user.uid).get().then(doc=>{
   if(!doc.exists){
    db.collection("users").doc(user.uid).set({
     role:"student"
    });
   }

   if(doc.exists && doc.data().role==="admin")
    admin.hidden=false;
  });

  loadApps();
 }else{
  authDiv.hidden=false;
  dash.hidden=true;
 }
});

function loadApps(){
 db.collection("apps").onSnapshot(snap=>{
  appsDiv.innerHTML="";
  snap.forEach(doc=>{
   const a=doc.data();
   appsDiv.innerHTML+=`
    <div class="card" onclick="window.open('${a.url}')">
     <img src="${a.icon}">
     <p>${a.name}</p>
    </div>
   `;
  });
 });
}

function addApp(){
 db.collection("apps").add({
  name:name.value,
  url:url.value,
  icon:icon.value
 });
}
