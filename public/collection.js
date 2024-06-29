const popup = document.getElementById("popup2")
const forColl = document.getElementById("create-collection")
forColl.addEventListener("click", () => {
    popup.classList.toggle("active")
})
document.getElementById("close-button2").addEventListener("click", () => {
    popup.classList.remove("active")
})
// to select amount of subtask
const stValue = document.getElementById("st-select")
stValue.addEventListener("change", () => {
    const selectedValue = parseInt(stValue.value)
    console.log(selectedValue);
    const subTaskDiv = document.getElementById("subtask")
    subTaskDiv.innerHTML = "";

    for (let i = 0; i < selectedValue; i++) {
        const subtaskContainer = document.createElement("div");
        subtaskContainer.classList.add("subtask-container");

        const subtaskLabel = document.createElement("label");
        subtaskLabel.innerText = `Subtask ${i + 1}:`;

        const subtaskInput = document.createElement("input");
        subtaskInput.type = "text";
        subtaskInput.id = "subTask"
        subtaskInput.name = `subtask${i + 1}`;
        subtaskInput.required = true;
        subtaskInput.autocomplete = "off";

        subtaskContainer.appendChild(subtaskLabel);
        subtaskContainer.appendChild(subtaskInput);
        subTaskDiv.appendChild(subtaskContainer);
    }
})
  // to make default message disappear
const defMsg1 = document.getElementById("no-task-message")
    function defGo(show) {
  if (show) {
        defMsg.classList.add("hidden")
    } else {
      defMsg1.classList.remove("hidden");
      defMsg1.value = "no ongoing collection"
    }
    }




//To post collection
const createCollForm = document.getElementById("collForm")
createCollForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    const title = document.getElementById("title1").value
    console.log(title);
    const details = document.getElementById("detail1").value
    const usage = document.getElementById("usage").value// gets the selected option
    const subtask = document.getElementById("subTask").value

    const coll = {
        title,
        details,
        usage,
        subtask
    }
    try {
         const response = await fetch("/home/collection", {
            method: "POST",
            headers: {
                "Content-type" : "application/json"
            },
            body: JSON.stringify(coll)
        })

        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText)
        }
        const data = await response.json();
        console.log("task created:", data);
        console.log("form submitted");
        createCollForm.reset()
        // fetch and display updated tasklis
        // fetchTask()
    } catch (error) {
        console.error("there was a problem with d fetch operaion", error)
    }
})


// to get all collection
const collBtn = document.getElementById("coll-btn")

collBtn.addEventListener("click", async function () {
try {
    fetch("/home/collection")
         .then(res => {
            if (!res.ok) {
                throw new Error("Network response was not okay: " + res.statusText);
            }
            return res.json();
        })
        .then(data => {
            //check if there are no task
            if (data.length === 0) {
                defGo(false); // Show the default message
            } else {
                defGo(true); // Hide the default message
            }
            //creating the li for d response
            const taskList = document.getElementById("task-display");
            taskList.innerHTML = "";
            data.forEach((task, index) => {
                const listItemDiv = document.createElement("div")
                const delBtn = document.createElement("button")
                delBtn.textContent = "Delete task"
                delBtn.value = "Delete Collection"
                const editBtn = document.createElement("button")
                editBtn.textContent = "Edit task"
                editBtn.value = "Edit Collection"
                listItemDiv.id = "div-for-li"
                const listItem = document.createElement("li")
                listItem.className = "for-li"
                const detBtnID2 = `det-btn1-${index}`
                const subtBtn = `subt-btn-${index}`
                const popUpID2 = `popup4-${index}`
                const popUpID3 = `popup5-${index}`
                const closeBtnID2 = `close-button4-${index}`
                const closeBtnID3 = `close-button5-${index}`
                listItemDiv.innerHTML = `<h3>Task ${index + 1}:</h3>
                <hr>
                        <h4 class="task-title">Title</h4><span class="span-title">${task.title}</span>
                        <button class="task-detail"  id ="${detBtnID2}">Details</button><div class="popup-details" id="${popUpID2}">
                        <div class="overlay-details"></div>
                        <div class="content-details">
                        <div class="close-button" id="${closeBtnID2}">&times;</div>
                        <span class="spam-details">${task.details}</span>
                        </div>
                        </div>
                        <div class="task-usage-div"><h4 class="task-usage">Usage:</h4> <span class="span-usage">${task.usage}</span></div>

                        <button class="task-detail" id ="${subtBtn}">View subtask</button><div class="popup-details" id="${popUpID3}">
                        <div class="overlay-details"></div>
                        <div class="content-details">
                        <div class="close-button" id="${closeBtnID3}">&times;</div>
                        <span class="spam-details">${task.subtask}</span>
                        </div>
                        </div>`
                        
                        listItemDiv.appendChild(delBtn)
                        listItemDiv.appendChild(editBtn)
                        listItem.appendChild(listItemDiv)
                        taskList.appendChild(listItem);
                
                



const popupDet2 = document.getElementById(popUpID2)
const popupDet3 = document.getElementById(popUpID3)
const detBtn = document.getElementById(detBtnID2)
const subt = document.getElementById(subtBtn)
    detBtn.addEventListener("click", () => {
    popupDet2.classList.toggle("active")
    })
    document.getElementById(closeBtnID2).addEventListener("click", () => {
    popupDet2.classList.remove("active")
    })
    subt.addEventListener("click",()=>{
    popupDet3.classList.toggle("active")
    })          
    document.getElementById(closeBtnID3).addEventListener("click", () => {
    popupDet3.classList.remove("active")
    })
                

                // to delete a task 
                delBtn.addEventListener("click", () => {
                    try {
                        fetch(`/home/collection/${task._id}`, {
                            method: "DELETE",
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(res => {
                                if (!res.ok) {
                                    throw new Error("Network response was not okay")
                                }
                                return res.json()
                            })
                            .then(task => {
                                console.log("Task deleted succesfully", task);
                                // to clear task from dom
                                delBtn.parentElement.remove()
                                    
                            })
                    } catch (error) {
                        console.error(error)
                    }
                })
            })
        })
} catch (error) {
    console.log(error);
        }
})