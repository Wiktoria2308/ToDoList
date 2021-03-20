
//add task on enter
document.getElementById('input-container').addEventListener('keyup', function (e) {
  if (e.code === 'Enter') {
    const listItem = document.createElement('li');
    const inputValue = document.getElementById('input-container').value;
    const checkbox = `<i class="far fa-check-circle" id="checkbox" onclick="done(this)"></i>`;
    const circle = `<i class="far fa-circle" id="circle" onclick="done(this)"></i>`;
    const cross = `<i class="fas fa-times" id="cross" onclick="remove(this)"></i>`;
    listItem.innerHTML = checkbox;
    listItem.innerHTML += circle;
    listItem.innerHTML += inputValue;
    listItem.innerHTML += cross;

    if (inputValue === '') {
      alert('You must write what you want to do!');
    } else {
      document.getElementById('task-list').appendChild(listItem);
    }
    document.getElementById('input-container').value = '';
  }
});

  



function remove(link) {
  link.parentNode.parentNode.removeChild(link.parentNode);
}

function done(link) {
  link.parentNode.classList.toggle('checked');
}



