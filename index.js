//add task on enter
document.getElementById('input-container').addEventListener('keyup', (event) => {
  if (event.keyCode === 13 || event.code === 'Enter') {
    const listItem = document.createElement('li');
    const inputValue = document.getElementById('input-container').value;
    const checkbox = `<i class="far fa-check-circle" id="checkbox" onclick="done(this)"></i>`;
    const circle = `<i class="far fa-circle" id="circle" onclick="done(this)"></i>`;
    const cross = `<i class="fas fa-times" id="cross" onclick="remove(this)"></i>`;
    listItem.innerHTML = checkbox;
    listItem.innerHTML += circle;
    listItem.innerHTML += inputValue;
    listItem.innerHTML += cross;
    let ref = database.ref('todos');
    if (inputValue === '') {
      alert('You must write what you want to do!');
    } else {
      listItem.className = 'todos';
      let data = {
        todo: inputValue,
        class: listItem.className,
      };
      let newData = ref.push(data);
      listItem.id = newData.key;
      document.getElementById('task-list').appendChild(listItem);
    }
    document.getElementById('input-container').value = '';
  }
});

// function addId() {  //zmienic
//   let allElements = document.querySelectorAll('.todos');

//   for (let i = 0; i < allElements.length; i++) {
//     if (allElements[i].id !== 'list' + i) {
//       allElements[i].id = 'list' + i;
//     }
//   }
// }

function loadData() {
  // this remove all added data on page which wasn't submited afetr loading a page and then load data from database
  var query = database.ref('todos').orderByKey();
  query.once('value').then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      // childData will be the actual contents of the child
      let childData = childSnapshot.val();
      let id = childSnapshot.key;
      let todo = childData.todo;
      let classs = childData.class;
      addTaskOnLoad(id, todo, classs);
    });
  });
}
function addTaskOnLoad(idd, todoo, classs) {
  let listItem = document.createElement('li');
  listItem.className = classs;
  listItem.id = idd;
  let checkbox = `<i class="far fa-check-circle" id="checkbox" onclick="done(this)"></i>`;
  let circle = `<i class="far fa-circle" id="circle" onclick="done(this)"></i>`;
  let cross = `<i class="fas fa-times" id="cross" onclick="remove(this)"></i>`;
  listItem.innerHTML += checkbox;
  listItem.innerHTML += circle;
  listItem.innerHTML += todoo;
  listItem.innerHTML += cross;
  document.getElementById('task-list').appendChild(listItem);
}

function submit() {
  let allElements = document.querySelectorAll('.todos');
  var array = Array.prototype.slice.call(allElements);

  var query = database.ref('todos').orderByKey();
  query.once('value').then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === childSnapshot.key) {
          let childData = childSnapshot.val();
          if (array[i].className !== childData.class) {
            var updates = {};
            updates['todos/' + childSnapshot.key + '/class/'] = array[i].className;
            firebase.database().ref().update(updates);
          }
        }
      }
    });
  });
}

function remove(link) {
  let ref = database.ref('todos');
  let key = link.parentNode.id;
  ref.child(key).remove();

  link.parentNode.parentNode.removeChild(link.parentNode);
}

function done(link) {
  link.parentNode.classList.toggle('checked');
}

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: 'AIzaSyCpSP9sGp664FH1W3CtjNpHwjt_TpcHr40',
  authDomain: 'todolist-c2de4.firebaseapp.com',
  databaseURL: 'https://todolist-c2de4-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'todolist-c2de4',
  storageBucket: 'todolist-c2de4.appspot.com',
  messagingSenderId: '445151597249',
  appId: '1:445151597249:web:e87eb7810ed46a69c1fa40',
  measurementId: 'G-TD7LZKB7WB',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let database = firebase.database();
