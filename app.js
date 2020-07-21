
// The form
// Tasks list
const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non. 1',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur reprehenderit ipsum. 2',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non. 3',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum. 4',
  },
];

(function(arrOfTasks) {

  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});


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
  const listContainer = document.querySelector('.tasks-list-section .list-group');
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



  function renderAllTasks (tasksList) {
    if (Object.keys(tasksList).length === 0) {
      console.error('Submit task list');
      tasksNot.textContent = "No tasks.";
      return;
    }


    const fragment = document.createDocumentFragment();

    Object.values(tasksList).forEach(task => {
      const li = listItemTemplate(task);
      if(task.completed) {
        li.classList.add('checkOk');
        const checkBtn = li.querySelector('.check-btn');
        checkBtn.classList.remove('btn-warning');
        checkBtn.classList.add('btn-success');    
      }
      fragment.appendChild(li);
    });
    listContainer.appendChild(fragment);
   
  }


  function listItemTemplate({ _id, title, body } = {}) {
    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'align-items-center',
      'flex-wrap',
      'mt-2'
      );
    li.setAttribute('data-task-id', _id);


    const div = document.createElement('div');
    div.classList.add('btn-group', 'ml-auto', 'mb-2');

    const checkBtn = document.createElement('button');
    checkBtn.textContent = 'Check task';
    checkBtn.classList.add('btn', 'btn-warning', 'check-btn');

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
  }


  function onDeleteHandler({ target }) {
    if(target.classList.contains('delete-btn')) {
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      const confirmed = deleteTask(id);
      deleteTaskFromHtml(confirmed, parent);
      if (Object.keys(objOfTasks).length === 0) {
        tasksNot.textContent = "No tasks.";
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
    }
  }


  function showAllTasks(e) {
    const arrAllTasks = Object.entries(objOfTasks).slice().sort( (x, y) => { 
      return (x[1].completed === y[1].completed) ? 0 : x[1].completed ? -1 : 1; 
    }).reverse();
    const objAllTasks = Object.fromEntries(arrAllTasks);
    tasksNot.textContent = '';
    listContainer.textContent = '';
    renderAllTasks(objAllTasks);
  }


  function showUnfinishTasks(e) {
    const arrOfNoOkTasks = Object.entries(objOfTasks).filter( (task) => !task[1].completed).reverse();
    const objOfNoOkTasks = Object.fromEntries(arrOfNoOkTasks);
    tasksNot.textContent = '';
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
