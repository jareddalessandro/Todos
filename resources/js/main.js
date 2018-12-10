
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
    todo: [],
    completed: []
};

// Remove and complete icons in SVG format
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';
var editSVG = '<? xml version = "1.0" ?> <svg height="16px" version="1.1" viewBox="0 0 16 16" width="16px" xmlns="http://www.w3.org/2000/svg" xmlns: sketch="http://www.bohemiancoding.com/sketch/ns" xmlns: xlink="http://www.w3.org/1999/xlink"><title /><defs /><g fill="" id="Group" transform="translate(-384.000000, -192.000000)"><path class = "fill" d="M385,203.950806 L389,208 L385,208 Z M392,196 L396,200 L389.978638,207.044189 L386,203 Z M394.084619,193.781497 C394.709458,193.156658 395.90929,193.343426 396.764518,194.198654 L397.538782,194.972918 C398.394011,195.828147 398.580778,197.027979 397.95594,197.652817 L396.720394,198.888363 L392.849074,195.017043 Z M394.084619,193.781497" id="Triangle 313" /></g></svg>'

renderTodoList();
updateColors();

// User clicked on the add button
// If there is any text inside the item field, add that text to the todo list
document.getElementById('add').addEventListener('click', function () {
    var value = document.getElementById('item').value;
    if (value) {
        addItem(value);
    }
});

// Mode Toggle Switch
document.getElementById('checkbox').addEventListener('change', function () {
    var checkBox = document.getElementById('checkbox');
    if (checkBox.checked) {
        localStorage.setItem('modeSetting', 'dark')
    }
    else {
        localStorage.setItem('modeSetting', 'light');
    }
    updateColors();
});

document.getElementById('item').addEventListener('keydown', function (e) {
    var value = this.value;
    if ((e.code === 'Enter' || e.code === 'NumpadEnter') && value) {
        // Capitilize the first character of the input
        value = value.charAt(0).toUpperCase() + value.slice(1);
        addItem(value);
    }
});

function addItem(value) {
    addItemToDOM(value);
    document.getElementById('item').value = '';
    data.todo.push(value);
    dataObjectUpdated();
    updateColors();
}

function renderTodoList() {
    if (!data.todo.length && !data.completed.length) return;

    for (var i = 0; i < data.todo.length; i++) {
        var value = data.todo[i];
        addItemToDOM(value);
    }

    for (var j = 0; j < data.completed.length; j++) {
        var value = data.completed[j];
        addItemToDOM(value, true);
    }
}

function dataObjectUpdated() {
    localStorage.setItem('todoList', JSON.stringify(data));
}

// Deletes the item but puts it's value into the input
function editItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;

    document.getElementById('item').value = value;

    if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
    }
    dataObjectUpdated();

    parent.removeChild(item);
}

function removeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;

    if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
    }
    dataObjectUpdated();

    parent.removeChild(item);
}

function completeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;

    if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(value), 1);
        data.completed.push(value);
    } else {
        data.completed.splice(data.completed.indexOf(value), 1);
        data.todo.push(value);
    }
    dataObjectUpdated();

    // Check if the item should be added to the completed list or to re-added to the todo list
    // Without this a refresh would be required to see the updates
    var target = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');
    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);
    updateColors();
}

// Adds a new item to the todo list
function addItemToDOM(text, completed) {
    var list = (completed) ? document.getElementById('completed') : document.getElementById('todo');

    var item = document.createElement('li');
    item.innerText = text;

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeSVG;
    // Add click event for removing the item
    remove.addEventListener('click', removeItem);

    var edit = document.createElement('button');
    edit.classList.add('edit');
    edit.innerHTML = editSVG;
    // Add click event for editing the item
    edit.addEventListener('click', editItem);

    var complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = completeSVG;
    // Add click event for completing the item
    complete.addEventListener('click', completeItem);

    buttons.appendChild(remove);
    buttons.appendChild(edit);
    buttons.appendChild(complete);
    item.appendChild(buttons);

    list.insertBefore(item, list.childNodes[0]);
}

// Sets colors for dark mode and light mode
function updateColors() {
    var darkBackground = '#272829'; // dark grey
    var darkCompletedItem = '#63b26b'; // deep green
    var darkItem = '#4b4e51'; // less dark grey
    var darkModeText = '#fff'; // white

    var lightBackground = '#edf0f1'; // light grey
    var lightCompletedItem = '#d5ffdc'; // light green
    var lightItem = '#fff'; // white
    var lightModeText = '#444'; // darkgrey

    // Dark Mode
    if (localStorage.getItem('modeSetting') == 'dark') {
        document.body.style.backgroundColor = darkBackground;

        // To alter every uncompleted item
        var uncompleted = document.querySelector('#todo');
        var todoList = uncompleted.querySelectorAll('li');
        todoList.forEach(function (item) {
            item.style.backgroundColor = darkItem;
            item.style.color = darkModeText;
        });

        // To alter every completed item
        var completed = document.querySelector('#completed');
        var completedList = completed.querySelectorAll('li');
        completedList.forEach(function (item) {
            item.style.backgroundColor = darkCompletedItem;
            item.style.color = darkModeText;
        })
        // Make sure toggle button's checked status is maintained after refresh
        // This makes the toggle button's checked value effectively persistent
        var checkBox = document.getElementById('checkbox');
        checkBox.checked = true;
    }
    // Light Mode
    else {
        document.body.style.backgroundColor = lightBackground;

        // To alter every uncompleted item
        var uncompleted = document.querySelector('#todo');
        var todoList = uncompleted.querySelectorAll('li');
        todoList.forEach(function (item) {
            item.style.backgroundColor = lightItem;
            item.style.color = lightModeText;
        });

        // To alter every completed item
        var completed = document.querySelector('#completed');
        var completedList = completed.querySelectorAll('li');
        completedList.forEach(function (item) {
            item.style.backgroundColor = lightCompletedItem;
            item.style.color = lightModeText;
        })
        // Make sure toggle button's checked status is maintained after refresh
        // This makes the toggle button's checked value effectively persistent
        var checkBox = document.getElementById('checkbox');
        checkBox.checked = false;
    }
}