$(document).ready(() => {
  setUp();
  toggleSignIn();

  $(".changeSignIn").click(e => {
    e.preventDefault();
    toggleSignIn();
  });
  $(".changeSignUp").click(e => {
    e.preventDefault();
    toggleSignUp();
  });
  $("#signup-form").submit(e => {
    e.preventDefault();
    const email = $("#signUpEmail").val();
    const password = $("#signUpPassword").val();
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/register",
      data: { email, password }
    })
      .done(() => {
        $("#signUpEmail").val("");
        $("#signUpPassword").val("");
        toggleSignIn();
      })
      .fail(response => {
        $(".alert-signup").text(response.responseJSON.message);
      });
  });
  $("#signin-form").submit(e => {
    e.preventDefault();
    const email = $("#loginEmail").val();
    const password = $("#loginPassword").val();
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/login",
      data: { email, password }
    })
      .done(data => {
        localStorage.setItem("access_token", data.access_token);
        $(".signout-project-menu").show();
        toggleYourListTodo();
        getTodos();
        getProjects();
      })
      .fail(response => {
        $(".alert-signin").text(response.responseJSON.message);
      });
  });
  $(".todo-add").submit(e => {
    e.preventDefault();

    const token = localStorage.getItem("access_token");
    const imageUrl = uploadImg();
    const title = $("#todo-name").val();
    const description = $("#todo-description").val();
    const due_date = $("#todo-due_date").val();
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/todos",
      dataType: "json",
      data: {
        title: title,
        description: description,
        due_date: due_date,
        imageurl: imageUrl,
        status: false
      },
      headers: {
        access_token: token
      }
    })
      .done(data => {
        const date = data.due_date
          .substring(0, 10)
          .split("-")
          .reverse()
          .join("/");
        const todo = `
          <div class="card m-3 todo-datas" style="width: 16rem;" data-id="${
            data.id
          }">
              <img class="card-img-top" src="${
                data.imageurl
              }" alt="Card image cap">
              <div class="card-body">
                  <h5 class="card-title"><span class="title-data-get">${
                    data.title
                  }</span> ${
          data.status ? "&#10004" : ""
        } <button type="button" class="btn btn-primary-outline" onclick="getEditData(${
          data.id
        })"> &#x2699; </button> </h5>
                  <p class="card-text description">${data.description}</p>
                  <p class="card-text due-date date-data-get">Due date : ${date}</p>
                  <div class="row">
                      <div class="col"><button class="btn btn-success update-todo" type="button" onclick="updateTodo(${
                        data.id
                      }, ${data.status}, '${data.title}')">Update</button></div>
                      <div class="col"><button class="btn btn-danger delete-todo" type="button" onclick="deleteTodo(${
                        data.id
                      })" data-id="${data.id}">Remove</button></div>
                  </div>
              </div>
          </div>`;
        $("#todo-name").val("");
        $("#todo-description").val("");
        $("#todo-due_date").val("");
        $(".alert-edit").text("");
        $(".alert-add").text("");
        $("#column-todo").append(todo);
      })
      .fail(response => {
        $(".alert-add").text(response.responseJSON.message);
        $(".alert-add").show();
      });
  });
  $(".todo-edit").submit(e => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    const title = $("#todo-name-edit").val();
    const description = $("#todo-description-edit").val();
    const due_date = $("#todo-due_date-edit").val();
    const date = due_date
      .substring(0, 10)
      .split("-")
      .reverse()
      .join("/");
    const id = $("#todo-id-edit").val();
    $.ajax({
      type: "PUT",
      url: "http://localhost:3000/todos/" + id,
      dataType: "json",
      data: {
        title: title,
        description: description,
        due_date: due_date
      },
      headers: {
        access_token: token
      }
    })
      .done(() => {
        $("#todo-name-edit").val("");
        $("#todo-description-edit").val("");
        $("#todo-due_date-edit").val("");
        toggleAddTodo();
        $(".alert-edit").text("");
        $(".alert-add").text("");
        $(".todo-datas[data-id=" + id + "]")
          .find(".title-data-get")
          .text(title);
        $(".todo-datas[data-id=" + id + "]")
          .find("p.description")
          .html(description);
        $(".todo-datas[data-id=" + id + "]")
          .find("p.due-date")
          .html(`Due date : ${date}`);
      })
      .fail(response => {
        $(".alert-edit").text(response.responseJSON.message);
      });
  });
  $("#addProject").submit(e => {
    e.preventDefault();
    const name = $("#addProjectName").val();
    const due_date = $("#addProjectDate").val();
    console.log();
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/projects",
      data: { name, due_date },
      headers: {
        access_token: localStorage.getItem("access_token")
      }
    })
      .done(data => {
        const date = data.due_date
          .substring(0, 10)
          .split("-")
          .reverse()
          .join("/");
        const addedProject = `<tr> 
              <td><a onclick="seeDetailProject(${data.id})">${data.name}</a></td>
              <td>${date}</td>
          </tr>`;
        $(".alert-project").text("");
        $("#addProjectName").val("");
        $("#addProjectDate").val("");
        $("#projectBodyData").append(addedProject);
      })
      .fail(response => {
        $(".alert-project").text(response.responseJSON.message);
        $(".alert-project").show();
      });
  });
  $("#addTodoProject").submit(e => {
    e.preventDefault();
    const title = $("#todoTitleProject").val();
    const id = $("#todoProjectId").val();
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/projects/" + id,
      data: { title },
      headers: {
        access_token: localStorage.getItem("access_token")
      }
    })
      .done(data => {
        const addedTodoProject = `<li class="list-group-item" data-id="${data.id}"> ${data.title}</li>`;
        $("#todoTitleProject").val("");
        $(".alert-todoproject").text("");
        $("#todoProjectBody").append(addedTodoProject);
      })
      .fail(response => {
        $(".alert-todoproject").text(response.responseJSON.message);
      });
  });
  $("#addNewMember").submit(e => {
    e.preventDefault();
    const email = $("#inviteEmailMember").val();
    const id = $("#todoProjectId").val();
    $.ajax({
      method: "POST",
      url: `http://localhost:3000/projects/${id}/invite`,
      data: { email },
      headers: {
        access_token: localStorage.getItem("access_token")
      }
    })
      .done(() => {
        $(".alert-member-no").text("");
        $("#inviteEmailMember").val("");
        $(".alert-member-ok").text("Success added new member");
      })
      .fail(response => {
        $(".alert-member-ok").text("");
        $(".alert-member-no").text(response.responseJSON.message);
      });
  });
});

function setUp() {
  $("#signup-form").hide();
  $("#signin-form").hide();
  $("#yourListTodo").hide();
  $(".todo-edit").hide();
  $(".signout-project-menu").hide();
  $("#projectSection").hide();
  $("#todoProjectSection").hide();
}

function toggleSignIn() {
  $("#signup-form").hide();
  $("#signin-form").show();
  $(".alert-signin").text("");
}

function toggleSignUp() {
  $("#signup-form").show();
  $("#signin-form").hide();
  $(".alert-signup").text("");
}

function toggleYourListTodo() {
  $("#yourListTodo").show();
  $("#signin-form").hide();
  $("#signup-form").hide();
}

function toggleAddTodo() {
  $(".todo-edit").hide();
  $(".todo-add").show();
}

function toggleEditTodo() {
  $(".todo-edit").show();
  $(".todo-add").hide();
}

function clearToggleEdit() {
  $("#todo-name-edit").val("");
  $("#todo-description-edit").val("");
  $("#todo-due_date-edit").val("");
  toggleAddTodo();
}

function getTodos() {
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/todos",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  }).done(data => {
    let todos = ``;
    for (let i = 0; i < data.length; i++) {
      const date = data[i].due_date
        .substring(0, 10)
        .split("-")
        .reverse()
        .join("/");
      let color;
      data[i].status ? (color = "aquamarine") : (color = "white");
      todos += `
          <div class="card m-3 todo-datas" style="width: 16rem; background-color: ${color};" data-id="${
        data[i].id
      }">
              <img class="card-img-top" src="${
                data[i].imageurl
              }" alt="Card image cap">
              <div class="card-body">
                  <h5 class="card-title"><span class="title-data-get">${
                    data[i].title
                  }</span> ${
        data[i].status ? "&#10004" : ""
      } <button type="button" class="btn btn-primary-outline" onclick="getEditData(${
        data[i].id
      })"> &#x2699; </button> </h5>
                  <p class="card-text description">${data[i].description}</p>
                  <p class="card-text due-date date-data-get">Due date : ${date}</p>
                  <div class="row">
                      <div class="col"><button class="btn btn-success update-todo" type="button" onclick="updateTodo(${
                        data[i].id
                      }, ${data[i].status}, '${
        data[i].title
      }')">Update</button></div>
                      <div class="col"><button class="btn btn-danger delete-todo" type="button" onclick="deleteTodo(${
                        data[i].id
                      })" data-id="${data[i].id}")">Remove</button></div>
                  </div>
              </div>
          </div>`;
    }
    $("#column-todo").html(todos);
  });
}

function getProjects() {
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/projects",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  }).done(data => {
    let projects = ``;
    for (let i = 0; i < data.length; i++) {
      const date = data[i].due_date
        .substring(0, 10)
        .split("-")
        .reverse()
        .join("/");
      projects += `<tr> 
              <td><a onclick="seeDetailProject(${data[i].id})">${data[i].name}</a></td>
              <td>${date}</td>
          </tr>`;
    }
    $("#projectBodyData").html(projects);
  });
}

function seeDetailProject(id) {
  $("#todoProjectId").val(id);
  $("#todoTitleProject").val("");
  $(".alert-todoproject").text("");
  const token = localStorage.getItem("access_token");
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/projects/" + id,
    headers: {
      access_token: token
    }
  }).done(projects => {
    let addTodoProjects = ``;
    for (let i = 0; i < projects.TodoProjects.length; i++) {
      addTodoProjects += `<li class="list-group-item" data-id="${projects.TodoProjects[i].id}"> ${projects.TodoProjects[i].title}</li>`;
    }
    $(".alert-member-ok").text("");
    $(".alert-member-no").text("");
    $("#todoProjectName").text(projects.name);
    $("#todoProjectBody").html(addTodoProjects);
    $("#projectSection").hide();
    $("#todoProjectSection").show();
  });
}

function uploadImg() {
  let imageUrl;
  var $files = $("input[type=file]").get(0).files;

  if ($files.length) {
    // Reject big files
    if ($files[0].size > $(this).data("max-size") * 1024) {
      console.log("Please select a smaller file");
      return false;
    }

    // Begin file upload
    console.log("Uploading file to Imgur..");

    // Replace ctrlq with your own API key
    var apiUrl = "https://api.imgur.com/3/image";
    var apiKey = "546c25a59c58ad7";

    var settings = {
      async: false,
      crossDomain: true,
      processData: false,
      contentType: false,
      type: "POST",
      url: apiUrl,
      headers: {
        Authorization: "Client-ID " + apiKey,
        Accept: "application/json"
      },
      mimeType: "multipart/form-data"
    };

    var formData = new FormData();
    formData.append("image", $files[0]);
    settings.data = formData;

    // Response contains stringified JSON
    // Image URL available at response.data.link
    $.ajax(settings).done(function(response) {
      imageUrl = JSON.parse(response).data.link;
    });
  }
  $("input[type=file]").val("");
  return imageUrl;
}

function deleteTodo(id) {
  if (confirm("Are you sure?")) {
    const token = localStorage.getItem("access_token");
    $.ajax({
      type: "DELETE",
      url: "http://localhost:3000/todos/" + id,
      headers: {
        access_token: token
      }
    })
      .done(() => {
        $(".todo-datas[data-id=" + id + "]").remove();
        getTodos();
      })
      .fail(response => {
        $(".alert-access").text(response.responseJSON.message);
        $(".alert-access").show();
      });
  }
  return false;
}

function getEditData(id) {
  let text = $(".todo-datas[data-id=" + id + "]")
    .find(".title-data-get")
    .text();
  let date = $(".todo-datas[data-id=" + id + "]")
    .find(".date-data-get")
    .text()
    .split(" : ")[1]
    .split("/")
    .reverse()
    .join("-");
  $("#todo-due_date-edit").val(date);
  $("#todo-name-edit").val(text);
  $("#todo-id-edit").val(id);

  toggleEditTodo();
}

function updateTodo(id, status, title) {
  const token = localStorage.getItem("access_token");
  $.ajax({
    type: "PUT",
    url: "http://localhost:3000/todos/" + id,
    headers: {
      access_token: token
    },
    data: {
      status: !status
    }
  })
    .done(() => {
      $(".todo-datas[data-id=" + id + "]").css(
        "background-color",
        `${!status ? "aquamarine" : "white"}`
      );
      $(".todo-datas[data-id=" + id + "]")
        .find("button.update-todo")
        .attr("onclick", `updateTodo(${id}, ${!status}, '${title}')`);
      $(".todo-datas[data-id=" + id + "]")
        .find("h5.card-title")
        .html(
          `<span class="title-data-get">${$(".todo-datas[data-id=" + id + "]")
            .find(".title-data-get")
            .text()}</span> ${
            !status ? "&#10004" : ""
          } <button type="button" class="btn btn-primary-outline" onclick="getEditData(${id})"> &#x2699; </button>`
        );
    })
    .fail(response => {
      $(".alert-access").text(response.responseJSON.message);
      $(".alert-access").show();
    });
}

function goToTodo() {
  setUp();
  $(".alert-todoproject").text("");
  $(".signout-project-menu").show();
  toggleYourListTodo();
}

function goToProject() {
  $("#projectSection").show();
  $("#signup-form").hide();
  $("#signin-form").hide();
  $("#yourListTodo").hide();
  $(".todo-edit").hide();
  $("#todoProjectSection").hide();
}

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/google-sign",
    data: { id_token: id_token }
  }).done(data => {
    localStorage.setItem("access_token", data.access_token);
    toggleYourListTodo();
    $(".signout-project-menu").show();
    getTodos();
    getProjects();
  });
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function() {
    console.log("User signed out.");
  });
  localStorage.removeItem("access_token");
  setUp();
  toggleSignIn();
}
