const rootNode = document.getElementById('root');

let todoItems = [];
if (localStorage.length > 0) {
    for (let i in localStorage) {
        if (/todo-\d+/.test(i)) {
            todoItems.push(JSON.parse(localStorage.getItem(i)));
        }
    }
    todoItems.sort((a, b) => a.id - b.id);
}

window.location.hash = '';
showMainPage();
window.alert = function (txt) {
    createCustomAlert(txt)
};

function showMainPage() {
    const main = `
    <div id="mainPage">
      <h2>Simple TODO application</h2>
      <button class="addTaskBtn">Add new task</button>
      <ul class="tasksList">
      </ul>
    </div>
    `;
    rootNode.insertAdjacentHTML('afterbegin', main);
    if (todoItems.length === 0) {
        document.querySelector('.tasksList').insertAdjacentHTML('beforeend', `<li>TODO is empty</li>`);
    } else {
        for (let item of todoItems) {
            let task = `
    <li class="taskItem ${item.isDone ? 'done' : ''}" id="${item.id}">
      <input class="isDone" type="checkbox" ${item.isDone ? 'checked' : ''}>
      <span class="description">${item.description}</span>
        <i class="fas fa-backspace deleteBtn"></i>
    </li>
    `;
            if (item.isDone) {
                document.querySelector('.tasksList').insertAdjacentHTML('beforeend', task);
            } else {
                if (document.querySelector('.done')) {
                    document.querySelector('.done').insertAdjacentHTML('beforebegin', task);
                } else {
                    document.querySelector('.tasksList').insertAdjacentHTML('beforeend', task);
                }
            }
            document.getElementById(item.id).addEventListener('click', e => {
                if (/description/.test(e.target.className)) {
                    window.location.hash = '/modify/:' + item.id;
                } else if (/deleteBtn/.test(e.target.className)) {
                    todoItems = todoItems.filter(task => task.id !== item.id);
                    window.location.hash = 'change';
                } else if (/isDone/.test(e.target.className)) {
                    if (todoItems.filter(task => task.id === item.id)[0].isDone) {
                        todoItems.filter(task => task.id === item.id)[0].isDone = false;
                    } else {
                        todoItems.filter(task => task.id === item.id)[0].isDone = true;
                    }
                    window.location.hash = 'change';
                }
            })
        }
    }
    document.querySelector('.addTaskBtn').addEventListener('click', () => {
        window.location.hash = '/add/';
    });
}

function createCustomAlert(txt) {
    const alert = `
    <div class="alertCont">
        <div class="alert">
          <h2>${txt}</h2>
        </div>
    </div>
    `;
    document.body.style.overflow = 'hidden';
    document.body.insertAdjacentHTML('afterbegin', alert);
    document.querySelector('.alertCont').style.height = document.documentElement.clientHeight + 'px';
    document.querySelector('.alertCont').style.width = document.documentElement.clientWidth + 'px';
    const MINUS_ONE = -1;
    const TWO_THOUSAND = 2000;
    if (!(navigator.userAgent.indexOf('Chrome') > MINUS_ONE)) {
        document.querySelector('.alert').style.cssFloat = 'right';
    }
    setTimeout(() => {
        document.body.removeChild(document.querySelector('.alertCont'));
        document.body.style.overflow = '';
    }, TWO_THOUSAND)

}

function showAddNewItemPage(modify) {
    const addItmPage = `
    <div id="addNewItemPage">
      <h2>${modify ? 'Modify item' : 'Add task'}</h2>
      <input class="descr" type="text">
      <button class="cancel">Cancel</button>
      <button class="saveChanges">Save changes</button>
    </div>
    `;
    rootNode.insertAdjacentHTML('afterbegin', addItmPage);
    document.getElementById('addNewItemPage').addEventListener('click', (e) => {
            if (/cancel/.test(e.target.className)) {
                window.location.hash = '';
            } else if (/saveChanges/.test(e.target.className)) {
                if (todoItems.filter(item => item.description === document.querySelector('.descr').value).length > 0) {
                    alert("Error! You can't add already exist or null item");
                } else if (document.querySelector('.descr').value.length > 0 && !modify) {
                    todoItems.push({
                        isDone: false,
                        id: todoItems.length > 0 ? todoItems[todoItems.length - 1].id + 1 : 0,
                        description: document.querySelector('.descr').value
                    });
                    window.location.hash = '';
                } else if (modify && document.querySelector('.descr').value.length > 0) {
                    let hash = window.location.hash.split(':');
                    let id = parseInt(hash[hash.length - 1]);
                    if (todoItems.filter(item => item.id === id).length > 0) {
                        todoItems.filter(item => item.id === id)[0].description =
                            document.querySelector('.descr').value;
                    }
                    window.location.hash = '';
                }
            }
        }
    )
}


window.addEventListener('hashchange', () => {
    Array.from(rootNode.children).forEach(item => rootNode.removeChild(item));
    localStorage.clear();
    todoItems.forEach(item => localStorage.setItem('todo-' + item.id, JSON.stringify(item)));
    let pageName = window.location.hash.replace('#', '');
    if (/\/add\//.test(pageName)) {
        showAddNewItemPage(false);
    } else if (/\/modify\/:\d+/g.test(pageName)) {
        showAddNewItemPage(true);
    } else {
        showMainPage();
        window.location.hash = '';
    }
});
