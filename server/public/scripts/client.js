console.log('js');

$(document).ready(function () {
  console.log('jQuery');
  // Establish Click Listeners
  setupClickListeners();
  // load existing task on page load
  getTask();
}); // end doc ready

function setupClickListeners() {
  $('#js-addButton').on('click', function () {
    console.log('in addButton on click');
    // using a test object
    let newTask = {
      nameIn: $('#js-nameIn').val(),
      taskIn: $('#js-taskIn').val(),
      taskCompletionIn:
        $('#js-taskCompletionIn').val().toUpperCase() === 'N' ? false : true,
      descriptionIn: $('#js-descriptionIn').val(),
    };
    // call saveTask with the new object
    saveTask(newTask);
  });

  // event listener for ready
  $('#js-viewTask').on('click', '.js-btn-ready', handleClickReady);
  // event listener for delete
  $('#js-viewTask').on('click', '.js-btn-delete', handleClickDelete);
}

function handleClickDelete() {
  const taskId = $(this).data('id');

  deleteTask(taskId);
}

function handleClickReady() {
  const id = $(this).data('id');

  updateTaskReadyTransfer(id);
}

//
// API / SERVER CALLS
// ------------------------------

function getTask() {
  console.log('in getTask');
  // ajax call to server to get task
  $.ajax({
    method: 'GET',
    url: '/todo',
  })
    .then(function (response) {
      // render to the DOM
      console.log(response);
      render(response);
    }) // successful response
    .catch(function (err) {
      console.log(err);
      alert('Something went wrong retrieving task.');
    }); // failure from server
} // end getTask

function saveTask(newTask) {
  console.log('in saveTask', newTask);
  // ajax call to server to get task
  $.ajax({
    method: 'POST',
    url: '/todo',
    data: newTask,
  })
    .then(function (response) {
      clearFormFields();
      // get new list of task
      getTask();
    }) // successful response
    .catch(function (err) {
      console.log(err);
      alert('Something went wrong save your Task.');
    });
}

function updateTaskReadyTransfer(taskId) {
  console.log(`UPDATE Task ${taskId} - to ready`);
  // AJAX PUT
  $.ajax({
    method: 'PUT',
    url: `/todo/${taskId}`,
    // data: {}
  })
    .then((response) => {
      getTask();
    })
    .catch(function (err) {
      console.log(err);
      alert('Something went wrong readying task for Completion.');
    });
}

function deleteTask(id) {
  console.log('DELETE: ', id);
  $.ajax({
    method: 'DELETE',
    url: '/todo/' + id,
  })
    .then((response) => {
      getTask();
    })
    .catch(function (err) {
      console.log(err);
      alert('Something went wrong removing task.');
    });
}

//
// DOM INTERACTION
// ------------------------------

function clearFormFields() {
  $('#js-nameIn').val('');
  $('#js-taskIn').val('');
  $('#js-taskCompletionIn').val('');
  $('#js-descriptionIn').val('');
}

function render(listOfTask) {
  console.log(listOfTask);
  $('#js-viewTask').empty();
  for (let task of listOfTask) {
    // check boolean and make Y or N
    let readyYN = task.taskCompletionIn;
    let taskCompletionBtn = '';

    // check transfer status for button
    if (task.taskCompletionIn === false) {
      taskCompletionBtn = `<button class="js-btn-ready btn btn-success btn-sm" data-id="${task.id}">
        Task Is Complete
      </button>`;
    }

    if (readyYN) {
      readyYN = 'Y';
    } else {
      readyYN = 'N';
    }

    $('#js-viewTask').append(`
      <tr>
        <td>${task.name}</td>
        <td>${task.task}</td>
        <td>${task.task_completion}</td>
        <td>${task.task_description}</td>
        <td>
          <button
            class="js-btn-delete btn btn-danger"
            data-id="${task.id}"
          >
            Delete
          </button>
        </td>
      </tr>
    `);
  }
}
