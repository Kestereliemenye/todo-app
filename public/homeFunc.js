

const btn2 = document.getElementById("coll-btn")
const btn1 = document.getElementById("task-button")
const btn3 = document.getElementById("comp-btn")
const defMsg = document.getElementById("no-task-message")
const dispDiv = document.getElementById("disp")
document.addEventListener("DOMContentLoaded", function () {
    function handleClick(event) {
        const clickedBtn = event.target
        if (clickedBtn.id === "task-button") {
            btn2.style.border = "none"
            btn3.style.border = "none"
            btn1.style.border = "1px solid white"
            btn1.style.padding = "8px"
        } else if (clickedBtn.id === "coll-btn") {
            btn1.style.border = "none"
            btn3.style.border = "none"
            btn2.style.border = "1px solid white"
            btn2.style.padding = "8px"
        } else if (clickedBtn.id === "comp-btn") {
            btn1.style.border = "none"
            btn2.style.border = "none"
            btn3.style.border = "1px solid white"
            btn3.style.padding = "8px"
        }
    }
    btn1.addEventListener("click",handleClick)
    btn2.addEventListener("click",handleClick)
    btn3.addEventListener("click", handleClick)
    // to show msg
    function showMsg(show) {
        if (show) {
            defMsg.classList.add("hidden")
        } else {
            defMsg.classList.remove("hidden")
            defMsg1.value = "no ongoing task"

        }
    }
      // Function to toggle form visibility
    function toggleFormVisibility(show) {
        if (show) {
            popup.classList.add("active"); // Show the form
        } else {
            popup.classList.remove("active"); // Hide the form
        }
    }
    

    

    // to recieve all tasks
    btn1.addEventListener("click", async function () {
      try {
        console.log("Fetching data...");
        const response = await fetch("/home/task?username=radiance");
        console.log("Response received:", response);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Parsed data:", data);
    } catch (error) {
        console.error("Error occurred:", error);
    }
    } )
            //             .then(res => { return res.json() })
            //                 .then(data => {
            //                     //check if there are no task
            //                     if (data.length === 0) {
            //                         showMsg(false)
            //                  // Show the default message
            //             } else {
            //                 // Hide the default message
            //                 showMsg(true)
            //             }
            //                 //creating the li for d response
            //                 const taskList = document.getElementById("task-display");
            //                 taskList.innerHTML = "";
            //                     data.forEach((task, index) => {
            //                         const listItemDiv = document.createElement("div")
            //                         const delBtn = document.createElement("button")
            //                         delBtn.textContent = "Delete task"
            //                         delBtn.value = "Delete task"
            //                         const editBtn = document.createElement("button")
            //                         editBtn.textContent = "Edit task"
            //                         editBtn.value = "Edit task"
            //                         listItemDiv.id = "div-for-li"
            //                         const listItem = document.createElement("li")
            //                         listItem.className = "for-li"
            //                         const detBtnID = `det-btn-${index}`
            //                         const popUpID = `popup3-${index}`
            //                         const closeBtnID = `close-button3-${index}`
            //                         listItemDiv.innerHTML = `<h3 class="task-num">Task ${index + 1}</h3>
            //                         <hr>
            //                         <h4 class="task-title">Title</h4><span class="span-title">${task.title}</span>
            //                         <button class="task-detail" id="${detBtnID}">Details</button><div class="popup-details" id="${popUpID}">
            //                         <div class="overlay-details"</div>
            //                         <div class="content-details">
            //                         <div class="close-button" id="${closeBtnID}">&times;</div>
            //                         <span class="spam-details">${task.details}</span>
            //                         </div>
            //                         </div>
            //                         <div class="task-usage-div"><h4 class="task-usage">Usage:</h4> <span class="span-usage">${task.usage}</span></div`
            
            
            //                         listItemDiv.appendChild(delBtn)
            //                         listItemDiv.appendChild(editBtn)
            //                         listItem.appendChild(listItemDiv)
            //                         taskList.appendChild(listItem);
            // const popupDet = document.getElementById(popUpID)
            // const detBtn = document.getElementById(detBtnID)
            //     detBtn.addEventListener("click", () => {
            //     popupDet.classList.toggle("active")
            //     })
            //     document.getElementById(closeBtnID).addEventListener("click", () => {
            //     popupDet.classList.remove("active")
            // })
                
            //                         // to delete a task
            //                         delBtn.addEventListener("click", () => {
            //                             try {
            //                                 fetch(`/home/tasks/${task._id}`, {
            //                                     method: "DELETE",
            //                                     headers: {
            //                                         'Content-Type': 'application/json'
            //                                     }
            //                                 })
            //                                     .then(res => {
            //                                         if (!res.ok) {
            //                                             throw new Error("Network response was not okay")
            //                                         }
            //                                         return res.json()
            //                                     })
            //                                     .then(task => {
            //                                         console.log("Task deleted succesfully", task);
            //                                         // to clear task from dom
            //                                         delBtn.parentElement.remove()
                                                
            //                                     })
            //                             } catch (error) {
            //                                 console.error(error)
            //                             }
            //                         })
            //                         // TO EDIT TASK
            //                         editBtn.addEventListener("click", () => {
            //                             // open edit form with existing taask data
            //                             document.getElementById("title").value = task.title
            //                             document.getElementById("detail").value = task.details
            //                             document.getElementById("usage").value = task.usage
            //                             toggleFormVisibility(true);
            //                             // update form submisson for editing
            //                             document.getElementById("taskForm").onsubmit = async (event) => {
            //                                 event.preventDefault()
            //                                 // title = document.getElementById("title").value
            //                                 // details = document.getElementById("detail").value
            //                                 // usage = document.getElementById("usage").value
            
            //                                 const updatedTask = {
            //                                     title: document.getElementById("title").value,
            //                                     details: document.getElementById("detail").value,
            //                                     usage: document.getElementById("usage").value
            //                                 }
            
            //                                 try {
            //                                     const response = await fetch(`/home/tasks/${task._id}`, {
            //                                         method: "PUT",
            //                                         headers: {
            //                                             "Content-Type": "application/json"
            //                                         },
            //                                         body: JSON.stringify(updatedTask)
            //                                     })
            //                                     if (!response.ok) {
            //                                         throw new Error("Network response was not okay: " + response.statusText);
            //                                     }
            //                                     const data = await response.json();
            //                                     console.log("Task updated", data);
            
            //                                 } catch (error) {
            //                                     console.error(error)
                                                
            //                                 }
            //                                 fetchTask()
            //                             }
            //                         })
            //                         })})
            //                         } catch (error) {
                        // console.error(error)
  




















// to create task saved to database
const popup = document.getElementById("popup1")
const Fortask = document.getElementById("create-task")
Fortask.addEventListener("click", () => {
    popup.classList.toggle("active")
})
document.getElementById("close-button").addEventListener("click", () => {
    popup.classList.remove("active")
})




// FOR TASK creation
    const createTaskForm = document.getElementById("taskForm")
        createTaskForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value
    const details = document.getElementById("detail").value
    const usage = document.getElementById("usage").value// gets the selected option


    const task = {
        title,
        details,
        usage
    }


    try {
        const response = await fetch("/home/task", {
            method: "POST",
            headers: {
                "Content-type" : "application/json"
            },
            body: JSON.stringify(task)
        })

        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText)
        }
        const data = await response.json();
        console.log("task created:", data);
        console.log("form submitted");
        createTaskForm.reset()
        // fetch and display updated tasklis
        fetchTask()
    } catch (error) {
        console.error("there was  problem with the fetch operation", error)
    }
        })
})