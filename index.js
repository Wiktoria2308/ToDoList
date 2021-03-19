function addTask() {
  const listItem = document.createElement('li');
  const inputValue = document.getElementById('add-task').value;
  const icon = `<i class="fas fa-check" id="check-icon"></i>`;
  const trashCan = `<i class="fas fa-trash-alt" id="trash" onclick="remove(this)"></i>`;
  listItem.innerHTML = icon;
  listItem.innerHTML += inputValue;
  listItem.innerHTML += trashCan;

  if (inputValue === '') {
    alert('You must write what you want to do!');
  } else {
    document.getElementById('task-list').appendChild(listItem);
  }
  document.getElementById('add-task').value = '';
}


//add task on enter
document.getElementById('add-task').addEventListener('keyup', function (e) {
  if (e.code === 'Enter') {
    const listItem = document.createElement('li');
    const inputValue = document.getElementById('add-task').value;
    const icon = `<i class="fas fa-check" id="check-icon"></i>`;
    const trashCan = `<i class="fas fa-trash-alt" id="trash" onclick="remove(this)"></i>`;
    listItem.innerHTML = icon;
    listItem.innerHTML += inputValue;
    listItem.innerHTML += trashCan;

    if (inputValue === '') {
      alert('You must write what you want to do!');
    } else {
      document.getElementById('task-list').appendChild(listItem);
    }
    document.getElementById('add-task').value = '';
  }
});

document.onclick = function (e) {
  if (e.target.tagName == 'LI') {
    e.target.classList.toggle('checked');
  }
};

function remove(link) {
  link.parentNode.parentNode.removeChild(link.parentNode);
}




