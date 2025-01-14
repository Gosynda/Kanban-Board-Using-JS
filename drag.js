document.addEventListener("DOMContentLoaded", () => {
    const tasks = document.querySelectorAll(".task");
    const lanes = document.querySelectorAll(".swim-lane");

    tasks.forEach(task => {
        task.addEventListener("dragstart", dragStart);
        task.addEventListener("dragend", dragEnd);
    });

    lanes.forEach(lane => {
        lane.addEventListener("dragover", dragOver);
        lane.addEventListener("drop", dropTask);
    });

    let draggedTask = null;

    function dragStart(event) {
        draggedTask = event.target;
        event.target.classList.add("dragging");
        event.dataTransfer.effectAllowed = "move";
    }

    function dragEnd(event) {
        event.target.classList.remove("dragging");
        draggedTask = null;
    }

    function dragOver(event) {
        event.preventDefault();
        const afterElement = getDragAfterElement(event.currentTarget, event.clientY);
        const lane = event.currentTarget;
        const dragging = document.querySelector(".dragging");
        if (afterElement == null) {
            lane.appendChild(dragging);
        } else {
            lane.insertBefore(dragging, afterElement);
        }
    }

    function dropTask(event) {
        event.preventDefault();
    }

    function getDragAfterElement(container, y) {
        const draggableElements = [
            ...container.querySelectorAll(".task:not(.dragging)")
        ];

        return draggableElements.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;
                if (offset < 0 && offset > closest.offset) {
                    return { offset, element: child };
                } else {
                    return closest;
                }
            },
            { offset: Number.NEGATIVE_INFINITY }
        ).element;
    }
});
