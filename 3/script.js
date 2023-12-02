"use strict";

let tasks = [];

function addTask() {
    const taskDescription = document.getElementById('newTask').value;
    const taskDeadline = new Date(document.getElementById('taskDeadline').value);
    const taskDescriptionInput = document.getElementById('taskDescription');

    if (validateTask(taskDescription, taskDeadline)) {
        const task = {
            name: taskDescription,
            deadline: taskDeadline,
            description: taskDescriptionInput.value,
            completed: false,
            important: false,
        };
        tasks.push(task);
        const taskElement = createTaskElement(task);
        const taskList = document.getElementById('pendingTasks');
        taskList.appendChild(taskElement);
        clearTaskInputs();
        updateClearCompletedVisibility();
    }
}

function validateTask(description, deadline) {
    if (description.trim() === '') {
        alert('Please enter a task description.');
        return false;
    }

    const currentTime = new Date();
    const timeDifferenceInHours = (deadline - currentTime) / (1000 * 60 * 60);

    if (timeDifferenceInHours < 1) {
        alert('Please choose a deadline at least one hour ahead from the present time.');
        return false;
    }

    return true;
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.id = `task-${tasks.length - 1}`;
    li.innerHTML = `
        <span class="task${task.completed ? ' completed' : ''}${task.important ? ' important' : ''}" onclick="toggleTaskStatus(${tasks.length - 1})">${task.name}</span>
        <span class="deadline">Deadline: ${formatDate(task.deadline)}</span>
        <span class="description">Description: ${task.description}</span>
        <div>
            <button class="complete-btn" onclick="completeTask(${tasks.length - 1})">Complete</button>
            <button class="delete-btn" onclick="deleteTask(${tasks.length - 1})">Delete</button>
            <button class="edit-btn" onclick="editTask(${tasks.length - 1})">Edit</button>
        </div>
    `;
    return li;
}

function clearTaskInputs() {
    document.getElementById('newTask').value = '';
    document.getElementById('taskDeadline').value = '';
    document.getElementById('taskDescription').value = '';
}

function toggleTaskStatus(taskId) {
    tasks[taskId].completed = !tasks[taskId].completed;
    const taskElement = document.getElementById(`task-${taskId}`);
    taskElement.querySelector('.task').classList.toggle('completed');
}

function completeTask(taskId) {
    toggleTaskStatus(taskId);
    const taskElement = document.getElementById(`task-${taskId}`);
    const completedTasks = document.getElementById('completedTasks');
    completedTasks.appendChild(taskElement);

    updateClearCompletedVisibility();
}

function deleteTask(taskId) {
    tasks.splice(taskId, 1);
    const taskElement = document.getElementById(`task-${taskId}`);
    taskElement.remove();
}

function editTask(taskId) {
    const task = tasks[taskId];
    const newTaskText = prompt('Edit Task:', task.name);

    if (newTaskText !== null && newTaskText !== '') {
        task.name = newTaskText;
        const taskElement = document.getElementById(`task-${taskId}`);
        taskElement.querySelector('.task').innerText = newTaskText;
    }
}

function clearCompleted() {
    const completedTasks = document.getElementById('completedTasks');
    completedTasks.innerHTML = '';
    tasks = tasks.filter(task => !task.completed);

    updateClearCompletedVisibility();
}

function updateClearCompletedVisibility() {
    const clearCompletedButton = document.getElementById('clearCompletedButton');
    const hasCompletedTasks = tasks.some(task => task.completed);

    clearCompletedButton.style.display = hasCompletedTasks ? 'block' : 'none';
}

function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}