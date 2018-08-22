var _db = firebase.database();
fetchTasks();
function addTask() {
  let form = document.querySelector("form");
  let formData = new FormData(form);
  let key = Math.floor(100444000 + Math.random() * 90012000);
  let bodyId = Math.floor(1004443000 + Math.random() * 940012000);

  // creating new node in Firebase Database
  // .push() create unique KEY for sent data
  let tasksRef = _db.ref(`All Tasks/${key}`);
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
  let tasksRef = _db.ref("All Tasks");
  tasksRef.on("child_added", function(snapshot) {
    // console.log(snapshot.key);

    // var row = generateRow(snapshot.val(), snapshot.key);
    // console.log(a);
    var a = document.getElementById("tasks");
    a.innerHTML += `
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
    }')" class="myButton btn btn-sm btn-warning float-right">
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
    var deleteTask = _db.ref(`All Tasks/${key}`);
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
  let getText = prompt("Enter your new task..");
  var postData = {
    description: getText
  };

  // var tasksRef = _db.ref();

  // tasksRef.update(postData);
  console.log("posting");
  let tasksRef = _db.ref(`All Tasks/${key}`);
  tasksRef.update(postData);
  let desc = document.getElementById(bodyId);
  console.log(bodyId);
  desc.innerText = "Body : " + postData.description;
  console.log("posted");
}

// function fetchTask() {
//   var taskDiv = document.getElementById("tasks");
//   var database = firebase.database();
//   var tasksRef = database.ref(`All Tasks`);
//   tasksRef.on("child_added", function(snapshot) {
//     var getTask = gettingData(snapshot.val(), snapshot.key);
//     taskDiv.innerHTML += getTask;
//   });

//   function gettingData(snapshot, key) {
//     const rr = `
//     <li class="list-group mb-1">
//         <ul class="list-group-item">Title : ${snapshot.Title}</ul>
//         <ul class="list-group-item">Body : ${snapshot.Description}</ul>
//         <ul class="list-group-item">Time : ${snapshot.date}</ul>
//          <ul class="list-group-item"><button onClick="deleteTask(${
//            snapshot.taskID
//          })" class="myButton btn btn-sm btn-danger float-right">
//                                Delete
//                                </button>
//                                <button onClick="editTask(${snapshot.taskID},'${
//       snapshot.Title
//     }')" class="myButton btn btn-sm btn-warning float-right">
//                                Edit
//                                </button></ul>

//     </li>
//     `;
//     return rr;
//   }
// }
