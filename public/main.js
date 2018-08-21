var _db = firebase.database();
fetchTasks();
function addTask() {
  let form = document.querySelector("form");
  let formData = new FormData(form);

  // creating new node in Firebase Database
  // .push() create unique KEY for sent data
  let tasksRef = _db.ref("All Tasks").push();
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
    taskState: false
  });
  console.log("Task pushed");

  form.reset();
  return false;
}

function fetchTasks() {
  var table = document.querySelector("tbody");
  // getting tasks Reference (node) for showing them
  let tasksRef = _db.ref("All Tasks");
  tasksRef.on("child_added", data => {
    // console.log(data.val(), data.key);
    var row = generateRow(data.val(), data.key);
    console.log(row);
  });
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

// function deleteTask(taskID) {
//   var database = firebase.database()
//   var deleteTask = database.ref(`All Tasks/${taskID}`);
//   deleteTask.remove().then(function () {

//     console.log("deleting", taskID);
//     console.log("fetching newest data");

//   })

// }
