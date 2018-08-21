// Get a reference to the database service

function addTask() {
  var database = firebase.database();
  let title = document.getElementById("title").value;
  let body = document.getElementById("body").value;
  let taskID = Math.floor(100444000 + Math.random() * 90012000);

  let allTasks = database.ref(`All Tasks/${taskID}`);
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
  let taskDiv = document.getElementById("task");
  var database = firebase.database();
  let tasksRef = database.ref(`All Tasks`);
  tasksRef.on("child_added", task => {
    console.log(task.val());
  });
}
