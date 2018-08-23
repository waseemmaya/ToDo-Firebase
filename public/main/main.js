var _db = firebase.database();


function addTask() {
  let form = document.querySelector("form");
  let formData = new FormData(form);
  let key = Math.floor(100444000 + Math.random() * 90012000);
  let bodyId = Math.floor(1004443000 + Math.random() * 940012000);
  let myID = localStorage.getItem("myID");
  // creating new node in Firebase Database
  // .push() create unique KEY for sent data
  // let tasksRef = _db.ref(`All Tasks/${key}`);
  let tasksRef = _db.ref(`All Tasks/${myID}/${key}`);
  // .push() initialize a key for taskObj   // key ===> LKTXVheZ6JVBniEi8Ti

  console.log(tasksRef.key);
  // now we have Firebase ==> Database ==> All Tasks ==> KEY(Unique Key) for storing our Objects/Arrays

  // make an object after getting values from fields
  // let taskObj = {
  //   title: formData.get("title"),
  //   description: formData.get("description"),
  //   timeStamp: new Date().toDateString(),
  //   taskState: false
  // };

  //set taskObj (object) to taskRef (node) on firebase
  //direct set an object in tasksRef
  tasksRef.set({
    title: formData.get("title"),
    description: formData.get("description"),
    timeStamp: new Date().toDateString(),
    taskState: false,
    bodyId: bodyId
  });

  // console.log(tasksRef);
  // console.log(tasksRefd);

  form.reset();
  return false;
}

function fetchTasks() {
  var table = document.querySelector("tbody");
  // getting tasks Reference (node) for showing them
  // let tasksRef = _db.ref(`All Tasks/${key}`);
  let myID = localStorage.getItem("myID");
  let tasksRef = _db.ref(`All Tasks/${myID}`);
  tasksRef.on("child_added", function(snapshot) {
    // console.log(snapshot.key);
    console.log(snapshot.val(), snapshot.key);
    // var row = generateRow(snapshot.val(), snapshot.key);
    // console.log(a);
    var tasks = document.getElementById("tasks");
    tasks.innerHTML += `
                        <li class="list-group mb-1" id="${snapshot.key}">
                            <ul class="list-group-item">Title : ${
                              snapshot.val().title
                            }</ul>
                            <ul class="list-group-item" id="${
                              snapshot.val().bodyId
                            }">Body : ${snapshot.val().description}</ul>
                            <ul class="list-group-item">Time : ${
                              snapshot.val().timeStamp
                            }</ul>
                             <ul class="list-group-item">
                             <button onClick="deleteTask(${
                               snapshot.key
                             })" class="myButton btn btn-sm btn-danger float-right">
                              Delete
                            </button>
                            <button onClick="editTask('${snapshot.key}','${
      snapshot.val().bodyId
    }')" style="width:57px" class="myButton btn btn-sm mr-1 btn-warning float-right">
                              Edit 
                            </button></ul>
                        </li>
                    `;
  });
  // generateRow(snapshot, key){
  // }
}

function deleteTask(key) {
 
  let state = confirm("Are you sure you want to delete this...?");
  if (state) {
    let listId = document.getElementById(key);
    listId.innerHTML = "";
    console.log(key);
    let myID = localStorage.getItem("myID");
    var deleteTask = _db.ref(`All Tasks/${myID}/${key}`);
    deleteTask.remove().then(function() {
      let listId = document.getElementById(key);
      listId.innerHTML = "";
      console.log("deleting", key);
      console.log("fetching newest data");
    });
  }
  return false;
}

function editTask(key, bodyId) {
  
  var getText = prompt("Enter your new task..");
  if (getText) {
    var postData = {
      description: getText
    };

    let desc = document.getElementById(bodyId);
    desc.innerText = "Body : " + postData.description;
    console.log("posted");
    // var tasksRef = _db.ref();

    // tasksRef.update(postData);
    console.log("posting");
    let myID = localStorage.getItem("myID");
    let tasksRef = _db.ref(`All Tasks/${myID}/${key}`);
    tasksRef.update(postData);
  } else {
    return false;
  }
}

function signin() {
  var form = document.querySelector("form");
  var formData = new FormData(form);

  var email = formData.get("email");
  var password = formData.get("password");

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function(a) {
      let userID = a.user.uid;
      let myID = localStorage.setItem("myID", userID);
      console.log(userID);
      var userRef = firebase.database().ref(`Users/${userID}`);

      userRef.on("value", function(x) {
        let data = x.val();
        let uffName = data.displayName;
        console.log(uffName);
        let userName = localStorage.setItem("myName", uffName);

        location.href = "index.html";
      });
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });

  form.reset();
  return false;
}

function signup() {
  var form = document.querySelector("form");
  var formData = new FormData(form);

  var email = formData.get("email");
  var password = formData.get("password");

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function(data) {
      let userRef = _db.ref(`Users/${data.user.uid}`);
      userRef.set({
        displayName: formData.get("displayName"),
        email: email,
        phone: formData.get("phone"),
        userID: data.user.uid
      });
      userRef.on("value", function(x) {
        let data = x.val();
        let uffName = data.displayName;
        console.log(uffName);
        let userName = localStorage.setItem("myName", uffName);

        location.href = "index.html";
      });
      alert("Sign Up Successfully");
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(error);
      // ...
    });
  form.reset();
  return false;
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    // var nameRef = database.ref(`users`);

    // alert(data.fullname);

    console.log("Signed in...!");
    let nameRef = document.getElementById("name");
    let myName = localStorage.getItem("myName");
    nameRef.innerText = myName;
    document.getElementById("signin").style.display = "none";
    document.getElementById("signup").style.display = "none";
    document.getElementById("signout").style.display = "inline";
  } else {
    document.getElementById("signout").style.display = "none";
    document.getElementById("main").innerHTML = `<div id="message">
   
    <h2 class="display-4">Sign in to add task</h2>
   
    <h3>This is user based task app, that's why you need to sign in first</h3>
    `;
    // No user is signed in.
    console.log("Not Signed in...!");
  
  }
});

function signout() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      
      console.log("Sign Out Successfully...!");
      localStorage.clear();
      alert("Sign out successfully...!");
      window.location.replace("index.html");
      // Sign-out successful.
    })
    .catch(function(error) {
      // An error happened.
    });
}

