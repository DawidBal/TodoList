const DOM = (() => {
    const taskForm = document.querySelector('.c-form');
    const taskList = document.querySelector('.js-tasklist');

    // TODO: Make function populate only newest added item 
    const populateTasks = (taskArr) => {
        taskList.innerHTML = 
        taskArr.map((task, index) => {
            return `<li>
            <div class="priority-${task.priority}">
                <h2>${task.title}</h2>
                <label for="task-${index}"></label>
                <input type="checkbox" data-index="${index}" name="" id="task-${index}" ${task.completed === true ? `disabled` : ``}>
                <button data-index="${index}">X</button>
            </div>
            </li>`
        }).join('');
    };

    const removeItem = (e, arr) => {
        if(!e.target.matches('button')) return;
        const index = e.target.dataset.index;
        arr.splice(index, 1);
        console.log(arr);
    }

    return { taskForm, populateTasks }

})();

export default DOM