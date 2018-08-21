
function addTask() {
  var database = firebase.database()
  var title = document.getElementById("title").value;
  var body = document.getElementById("body").value;
  var taskID = Math.floor(100444000 + Math.random() * 90012000);

  var allTasks = database.ref(`All Tasks/${taskID}`);
  allTasks.set({
    Title: title,
    Description: body,
    taskID: taskID,
    date: new Date().toDateString()
  });
  console.log("Task Posted");
  document.querySelector("form").reset();

  return false;
}

function fetchTask() {
  var taskDiv = document.getElementById("tasks");
  var database = firebase.database()
  var tasksRef = database.ref(`All Tasks`);
  tasksRef.on('child_added', function(snapshot) {
    var getTask = gettingData(snapshot.val(), snapshot.key);
    taskDiv.innerHTML += getTask;
  });

  function gettingData(snapshot, key) {
    const rr = `
    <li class="list-group mb-1">
        <ul class="list-group-item">Title : ${
          snapshot.Title
        }</ul>
        <ul class="list-group-item">Body : ${snapshot.Description}</ul>
        <ul class="list-group-item">Time : ${snapshot.date}</ul>
         <ul class="list-group-item"><button onClick="deleteTask(${snapshot.taskID})" class="myButton btn btn-sm btn-danger float-right">
                               Delete
                               </button>
                               <button onClick="editTask(${
                                 snapshot.taskID
                               },'${
snapshot.Title
}')" class="myButton btn btn-sm btn-warning float-right">
                               Edit 
                               </button></ul>
       
    </li>
    `;
    return rr;
}
}

function deleteTask(taskID) {
  var database = firebase.database()
  var deleteTask = database.ref(`All Tasks/${taskID}`);
  deleteTask.remove().then(function () {
    
    console.log("deleting", taskID);
    console.log("fetching newest data");
    

  })
 
}

