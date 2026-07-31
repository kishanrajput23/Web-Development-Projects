// =========================
// TASK MANAGER DASHBOARD
// =========================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load tasks on startup
renderTasks();
updateStats();

// -------------------------
// Modal Functions
// -------------------------
function openTaskModal() {
    document.getElementById("taskModal").style.display = "flex";
}

function closeTaskModal() {
    document.getElementById("taskModal").style.display = "none";
}

// -------------------------
// Add Task
// -------------------------
function addTask() {

    const title = document.getElementById("taskTitle").value.trim();
    const priority = document.getElementById("taskPriority").value;
    const category = document.getElementById("taskCategory").value;

    if (title === "") {
        alert("Please enter a task title");
        return;
    }

    const task = {
        id: Date.now(),
        title,
        priority,
        category,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    document.getElementById("taskTitle").value = "";

    closeTaskModal();

    renderTasks();
    updateStats();
}

// -------------------------
// Render Tasks
// -------------------------
function renderTasks() {

    const container = document.getElementById("taskContainer");

    container.innerHTML = "";

    const searchText =
        document.getElementById("searchInput")?.value.toLowerCase() || "";

    const statusFilter =
        document.getElementById("statusFilter")?.value || "all";

    const priorityFilter =
        document.getElementById("priorityFilter")?.value || "all";

    const categoryFilter =
        document.getElementById("categoryFilter")?.value || "all";

    let filteredTasks = tasks.filter(task => {

        let matchesSearch =
            task.title.toLowerCase().includes(searchText);

        let matchesStatus =
            statusFilter === "all"
            || (statusFilter === "completed" && task.completed)
            || (statusFilter === "pending" && !task.completed);

        let matchesPriority =
            priorityFilter === "all"
            || task.priority === priorityFilter;

        let matchesCategory =
            categoryFilter === "all"
            || task.category === categoryFilter;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesPriority &&
            matchesCategory
        );
    });

    filteredTasks.forEach(task => {

        let priorityClass =
            task.priority.toLowerCase();

        let statusClass =
            task.completed ? "completed" : "pending";

        let statusText =
            task.completed ? "Completed" : "In Progress";

        const card = document.createElement("div");

        card.className = "task-card";

        card.innerHTML = `
            <div class="task-header">

                <div>
                    <div class="task-title">
                        ${task.title}
                    </div>

                    <div class="badges">

                        <span class="badge ${priorityClass}">
                            ${task.priority}
                        </span>

                        <span class="badge ${statusClass}">
                            ${statusText}
                        </span>

                        <span class="badge category">
                            ${task.category}
                        </span>

                    </div>
                </div>

                <div class="actions">

                    <button
                        class="complete-btn"
                        onclick="toggleTask(${task.id})">
                        ✓
                    </button>

                    <button
                        class="edit-btn"
                        onclick="editTask(${task.id})">
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteTask(${task.id})">
                        Delete
                    </button>

                </div>

            </div>
        `;

        container.appendChild(card);
    });
}

// -------------------------
// Complete Task
// -------------------------
function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;
    });

    saveTasks();

    renderTasks();
    updateStats();
}

// -------------------------
// Edit Task
// -------------------------
function editTask(id) {

    let task = tasks.find(t => t.id === id);

    let newTitle =
        prompt("Edit Task", task.title);

    if (
        newTitle === null ||
        newTitle.trim() === ""
    ) {
        return;
    }

    task.title = newTitle;

    saveTasks();

    renderTasks();
}

// -------------------------
// Delete Task
// -------------------------
function deleteTask(id) {

    if (!confirm("Delete this task?")) {
        return;
    }

    tasks =
        tasks.filter(task => task.id !== id);

    saveTasks();

    renderTasks();
    updateStats();
}

// -------------------------
// Update Dashboard Cards
// -------------------------
function updateStats() {

    const total =
        tasks.length;

    const completed =
        tasks.filter(
            task => task.completed
        ).length;

    const pending =
        total - completed;

    const rate =
        total === 0
        ? 0
        : Math.round(
            (completed / total) * 100
        );

    document.getElementById(
        "totalTasks"
    ).innerText = total;

    document.getElementById(
        "completedTasks"
    ).innerText = completed;

    document.getElementById(
        "pendingTasks"
    ).innerText = pending;

    document.getElementById(
        "completionRate"
    ).innerText = rate + "%";
}

// -------------------------
// Save Local Storage
// -------------------------
function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

// -------------------------
// Search + Filters
// -------------------------
document
.getElementById("searchInput")
.addEventListener(
    "input",
    renderTasks
);

document
.getElementById("statusFilter")
.addEventListener(
    "change",
    renderTasks
);

document
.getElementById("priorityFilter")
.addEventListener(
    "change",
    renderTasks
);

document
.getElementById("categoryFilter")
.addEventListener(
    "change",
    renderTasks
);

// -------------------------
// Close modal on outside click
// -------------------------
window.onclick = function(event) {

    const modal =
        document.getElementById(
            "taskModal"
        );

    if (event.target === modal) {
        closeTaskModal();
    }
};