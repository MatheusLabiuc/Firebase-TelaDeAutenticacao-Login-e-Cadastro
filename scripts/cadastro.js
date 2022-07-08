const firebaseConfig = {
    apiKey: "AIzaSyBWtDt6A182FL26tawcFOOCkbcQF7O8D-I",
    authDomain: "crud-7b705.firebaseapp.com",
    projectId: "crud-7b705",
    storageBucket: "crud-7b705.appspot.com",
    messagingSenderId: "448659360668",
    appId: "1:448659360668:web:1e7c97603b3e0438aed659",
    measurementId: "G-P0YE40VB5Y"
  };
firebase.initializeApp(firebaseConfig)

var db = firebase.firestore();
var database = firebase.database();
var auth = firebase.auth();


//---------------------------- referencias ------------------//
    const nameInput = document.getElementById("nameInput");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const btnRegister = document.getElementById("register");
    const userName = document.getElementById("username");
    const btnLogin = document.getElementById("login");    
    

//---------------------------- validação do campo nome  ------------------//

function validationName(){
    let nameregex = /^[a-zA-Z\s]+$/;

    if(!nameregex.test(nameInput.value)){
        swal.fire({
            title: "Ops! Algo deu errado",
            text: "O nome precisa ter um formato válido. Use apenas letras!",
            icon: "error"

        }); 
        return false;
    }

    return true;
}

function registerUser(){

  if(!validationName()){
    return;
  }; 


    const newEmail = email.value;
    const newPassword = password.value;
    const USER = nameInput.value;

    auth.createUserWithEmailAndPassword(newEmail, newPassword)
    .then(data => {

 const uid = data.user.uid;

 const users = firebase.firestore().collection('users');
 users.doc(uid).set({
     email : newEmail, newPassword, USER
 })
        swal.fire({
            title: "Cadastrado!",
            text: "Usuário cadastrado com sucesso!",
            icon: "success"

        }); 
      console.log(data);

    })
    .catch(error=> {
        if (error.code == "auth/email-already-in-use") {
        swal.fire({
            title: "Ops! Algo deu errado",
            text: "O email já está em uso",
            icon: "error"
        }); 
        } else if (error.code == "auth/invalid-email") {
        swal.fire({
            title: "Ops! Algo deu errado",
            text: "O email precisa ter um formato válido",
            icon: "error"

        }); 
        } else if (error.code == "auth/weak-password") {
                    swal.fire({
            title: "Ops! Algo deu errado",
            text: "A senha precisa ter ao menos 6 caracteres!",
            icon: "error"

        }); 
        }

        console.log(error);
    });

}



function execute(){
    if(confirmPassword.value === password.value){
        registerUser();
    } else {
        swal.fire({
            title: "Ops! Algo deu errado",
            text: "As senhas não conferem",
            icon: "error"

        }); 
    }
}


function logar(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
    .then((data) => {
      const uid = data.user.uid;
 const users = firebase.firestore().collection('users');
 users.doc(uid).update({
     email : email, password
    })
 swal.fire({
        title: "Logado!",
        text: "Usuário logado com sucesso!",
        icon: "success"
    }).then(function() {
        window.location.replace('main.html');
    })
  console.log(data);
})
.catch(error=> {
    if (error.code == "auth/user-not-found") {
    swal.fire({
        title: "Ops! Algo deu errado",
        text: "Usuário ou senha não encontrados",
        icon: "error"
    }); 
    } else if (error.code == "auth/invalid-email") {
    swal.fire({
        title: "Ops! Algo deu errado",
        text: "O email precisa ter um formato válido",
        icon: "error"

    }); 
    }
    else if (error.code == "auth/wrong-password") {
        swal.fire({
            title: "Ops! Algo deu errado",
            text: "Senha não encontrada",
            icon: "error"
    
        }); 
        }

    console.log(error);
});
}