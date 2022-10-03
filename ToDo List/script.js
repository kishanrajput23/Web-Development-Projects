window.addEventListener('load',()=> {
    const form=document.querySelector("#new-task-form");
    const input=document.querySelector("#new-task");
    const list_el=document.querySelector("#tasks")

    form.addEventListener('submit',(e) =>{
        e.preventDefault();

        const task=input.value;
        if(!task){
            alert("Please enter a task");
            return;
        }

        const task_el=document.createElement("div");
        task_el.classList.add("task-list");

        const task_content_el=document.createElement("div");
        task_content_el.classList.add("task");
       

        task_el.appendChild(task_content_el);

        const task_input_el=document.createElement("input");
        task_input_el.classList.add("task-text");
        task_input_el.type="text";
        task_input_el.value=task;
        task_input_el.setAttribute("readonly","readonly");

        task_content_el.appendChild(task_input_el);

        const task_actions_el=document.createElement("div");
        task_actions_el.classList.add("actions");

        const task_edil_el=document.createElement("button");
        task_edil_el.classList.add("button");
        task_edil_el.innerHTML="EDIT";

        const task_delete_el=document.createElement("button");
        task_delete_el.classList.add("button");
        task_delete_el.innerHTML="DELETE";

        task_actions_el.appendChild(task_edil_el);
        task_actions_el.appendChild(task_delete_el);
        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el);

        input.value="";

        task_edil_el.addEventListener('click', () => {
            if(task_edil_el.innerText.toLowerCase()=="edit"){
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
                task_edil_el.innerText="SAVE";
            }
            else{
                task_input_el.setAttribute("readonly","readonly");
                task_edil_el.innerText="EDIT";
            }
        });

        task_delete_el.addEventListener('click',()=>{
            list_el.removeChild(task_el);
        });
    });
});