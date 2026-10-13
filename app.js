// MyOS Tasks — a to-do list saved to localStorage.
const KEY = 'myos.tasks';
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const empty = document.getElementById('todo-empty');

let tasks = [];
try { tasks = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) {}

function save() { try { localStorage.setItem(KEY, JSON.stringify(tasks)); } catch (e) {} }

function render() {
  list.replaceChildren();
  empty.style.display = tasks.length ? 'none' : 'block';
  tasks.forEach((t, i) => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (t.done ? ' done' : '');
    const cb = document.createElement('input');
    cb.type = 'checkbox'; cb.checked = t.done;
    cb.addEventListener('change', () => { tasks[i].done = cb.checked; save(); render(); });
    const span = document.createElement('span');
    span.className = 'txt'; span.textContent = t.text;
    const del = document.createElement('button');
    del.className = 'del'; del.textContent = '✕'; del.title = 'Delete';
    del.addEventListener('click', () => { tasks.splice(i, 1); save(); render(); });
    li.append(cb, span, del);
    list.appendChild(li);
  });
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    tasks.push({ text, done: false });
    input.value = '';
    save(); render();
  });
  render();
}
