// Tasks list default
const tasks = [
    {
      _id: '5d2ca9e2e03d40b326596aa7',
      completed: false,
      body:
        'You see this task because you have entered this page for the first time from this device. To add a new task, fill in the form above and click the "Add task" button. The new task will appear at the very top of the list. When you have read this, click "Change task" and the task will be considered completed (crossed out).\r\n',
      title: 'Task 1 - get to know the new application',
    },
    {
      _id: '5d2ca9e29c8a94095c1288e0',
      completed: false,
      body:
        'If you do not like the colors in this theme, then you can choose a different one using the drop-down match in the upper right corner. The "All Tasks" button sorts the tasks: completed at the bottom, recent at the top. The "Unfinished Tasks" button sorts the tasks: there are no completed ones, the last ones are at the top.\r\n',
      title:
        'Task 2 - Change the theme and sort tasks',
    },
    {
      _id: '5d2ca9e2e03d40b3232496aa7',
      completed: true,
      body:
        'If the task is crossed out, then it is completed, but not removed from the match. If you clicked on "Change task" accidentally, you can click on this button again, and the task will not be completed.\r\n',
      title: 'Task 3 - this task is completed',
    },
    {
      _id: '5d2ca9e29c8a94095564788e0',
      completed: false,
      body:
        'You created a task and decided that you will not complete it. Then delete it, click "Delete task" and "Ok".\r\n',
      title:
        'Task  4 - I want to delete this',
    },
  ];


(function(arrOfTasks) {

  const lastTasks = localStorage.getItem('app_tasks');

  let objOfTasks = {};

  if(lastTasks === null && typeof lastTasks === "object") {
    objOfTasks = arrOfTasks.reduce((acc, task) => {
      acc[task._id] = task;
      return acc;
    }, {});

    updateLocalStorage();
  } else {
    objOfTasks = JSON.parse(lastTasks);
  }

  // style for themes
  const themes = {
    default: {
      '--base-text-color': '#212529',
      '--header-bg': '#007bff',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#007bff',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#0069d9',
      '--default-btn-border-color': '#0069d9',
      '--danger-btn-bg': '#dc3545',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#bd2130',
      '--danger-btn-border-color': '#dc3545',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#80bdff',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
    },
    dark: {
      '--base-text-color': '#212529',
      '--header-bg': '#343a40',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#58616b',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#292d31',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#b52d3a',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#88222c',
      '--danger-btn-border-color': '#88222c',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
    light: {
      '--base-text-color': '#212529',
      '--header-bg': '#fff',
      '--header-text-color': '#212529',
      '--default-btn-bg': '#fff',
      '--default-btn-text-color': '#212529',
      '--default-btn-hover-bg': '#e8e7e7',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#f1b5bb',
      '--danger-btn-text-color': '#212529',
      '--danger-btn-hover-bg': '#ef808a',
      '--danger-btn-border-color': '#e2818a',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
  };


  let lastSelectedTheme = localStorage.getItem('app_theme') || 'default';


  // Elements UI
  const listContainer = document.querySelector('.tasks-list-section .list-group-my');
  const tasksNot = document.querySelector('.tasks-not');
  const allTasks = document.querySelector('.all-tasks');
  const unfinishTasks = document.querySelector('.unfinish-tasks');
  const form = document.forms['addTask'];
  const inputTitle = form.elements['title'];
  const inputBody = form.elements['body'];
  const themeSelect = document.getElementById('themeSelect');


  // Events
  setTheme(lastSelectedTheme);
  renderAllTasks(objOfTasks);
  form.addEventListener('submit', onFormSubmitHandler);
  listContainer.addEventListener('click', onDeleteHandler);
  listContainer.addEventListener('click', onChackOk);
  allTasks.addEventListener('click',showAllTasks);
  unfinishTasks.addEventListener('click', showUnfinishTasks);
  themeSelect.addEventListener('change', onThemeSelectHandler);



  function updateLocalStorage () {
    localStorage.setItem('app_tasks', JSON.stringify(objOfTasks));
  }


  function renderAllTasks (tasksList) {
    if (Object.keys(tasksList).length === 0) {
      console.error('Submit task list');
      tasksNot.textContent = "No tasks.";
      tasksNot.classList.add('alert', 'alert-danger');
      return;
    }

    const fragment = document.createDocumentFragment();

    Object.values(tasksList).forEach(task => {
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    });
    listContainer.appendChild(fragment);
   
  }


  function listItemTemplate({ _id, title, body, completed } = {}) {
    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'align-items-center',
      'flex-wrap',
      'mt-4',
      );
    if(completed) {
      li.classList.add('checkOk');
    }
    li.setAttribute('data-task-id', _id);


    const div = document.createElement('div');
    div.classList.add('btn-group', 'ml-auto', 'mb-2');

    const checkBtn = document.createElement('button');
    checkBtn.textContent = 'Check task';
    checkBtn.classList.add('btn', 'check-btn');
    if(completed) {
      checkBtn.classList.add('btn-success');
    } else {
      checkBtn.classList.add('btn-warning');
    }
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete task';
    deleteBtn.classList.add('btn', 'btn-danger', 'delete-btn');

    const h4 = document.createElement('h4');
    h4.classList.add('w-100');
    h4.textContent = title;
    h4.style.fontWeigth = 'bold';

    const article = document.createElement('p');
    article.textContent = body;
    article.classList.add('mt-2', 'w-100');

    li.appendChild(div);
    div.appendChild(checkBtn);
    div.appendChild(deleteBtn);
    li.appendChild(h4);
    li.appendChild(article);

    return li;
  }
  

  function onFormSubmitHandler(e) {
    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;

    if(!titleValue || !bodyValue) {
      alert('Please, enter title and body');
      return;
    }

    tasksNot.textContent = '';

    const task = createNewTask(titleValue, bodyValue);
    const listItem = listItemTemplate(task);
    listContainer.insertAdjacentElement('afterbegin', listItem);
    form.reset();
  }


  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`
    };

    objOfTasks[newTask._id] = newTask;
    updateLocalStorage();
    tasksNot.classList.remove('alert', 'alert-danger');

    return {...newTask};

  }


  function deleteTask(id) {
    const { title } = objOfTasks[id];
    const isConfirm = confirm(`Are you sure you want to delete the task: ${title}`);
    if(!isConfirm) return isConfirm;
    delete objOfTasks[id];
    return isConfirm;
  }


  function deleteTaskFromHtml(confirmed, el) {
    if (!confirmed) return;
    el.remove();
    updateLocalStorage();
  }


  function onDeleteHandler({ target }) {
    if(target.classList.contains('delete-btn')) {
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      const confirmed = deleteTask(id);
      deleteTaskFromHtml(confirmed, parent);
      if (Object.keys(objOfTasks).length === 0) {
        tasksNot.textContent = "No tasks.";
        tasksNot.classList.add('alert', 'alert-danger');
        return;
      }
    }
  }


  function onChackOk(e) {
    target = e.target;
    if(target.classList.contains('check-btn')) {
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      parent.classList.toggle('checkOk');

      if(target.classList.contains('btn-warning')) {
        target.classList.remove('btn-warning');
        target.classList.add('btn-success');
      } else {
        target.classList.remove('btn-success');
        target.classList.add('btn-warning');
      }
      
      objOfTasks[id].completed = !objOfTasks[id].completed;
      updateLocalStorage();
    }
  }


  function showAllTasks(e) {
    const arrAllTasks = Object.entries(objOfTasks).slice().sort( (x, y) => { 
      return (x[1].completed === y[1].completed) ? 0 : x[1].completed ? -1 : 1; 
    }).reverse();
    const objAllTasks = Object.fromEntries(arrAllTasks);
    tasksNot.textContent = '';
    tasksNot.classList.remove('alert', 'alert-danger');
    listContainer.textContent = '';
    renderAllTasks(objAllTasks);
  }


  function showUnfinishTasks(e) {
    const arrOfNoOkTasks = Object.entries(objOfTasks).filter( (task) => !task[1].completed).reverse();
    const objOfNoOkTasks = Object.fromEntries(arrOfNoOkTasks);
    tasksNot.textContent = '';
    tasksNot.classList.remove('alert', 'alert-danger');
    listContainer.textContent = '';
    renderAllTasks(objOfNoOkTasks);
  }


  function onThemeSelectHandler(e) {
    const selrctedTheme = themeSelect.value;
    const isConfirmed = confirm(`
        Are you sure you want to change the subject: ${selrctedTheme}
        `);
      if (!isConfirmed) {
        themeSelect.value = lastSelectedTheme;
        return;
      };
      setTheme(selrctedTheme);
      lastSelectedTheme = selrctedTheme;
      localStorage.setItem('app_theme', selrctedTheme);
  }


  function setTheme(name) {
    const selectedThemeObj = themes[name];
    Object.entries(selectedThemeObj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });

  }


})(tasks);
