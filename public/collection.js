const popup = document.getElementById("popup2")
const forColl = document.getElementById("create-collection")
const dispSearch = document.getElementById("dispSearch")
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
    //Function to toggle form visibility of form
    function toggleFormVisibility2(show) {
        if (show) {
            popup.classList.add("active"); // Show the form
        } else {
            popup.classList.remove("active"); // Hide the form
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
    const subtask =  Array.from(document.querySelectorAll("#subtask input")).map(input => input.value);


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
                 displayTask(data)

            })} catch (error) {
                console.log(error);
            }
})


                //function to display task
                function displayTask(data) {
                    const taskList = document.getElementById("task-display");
                    taskList.innerHTML = "";
                    data.forEach((task, index) => {
                        const listItemDiv = document.createElement("div")
                        const delBtn = document.createElement("button")
                        delBtn.textContent = "Delete Collection"
                        delBtn.value = "Delete Collection"
                        const editBtn = document.createElement("button")
                        editBtn.textContent = "Edit collection"
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
                        subt.addEventListener("click", () => {
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
                        // to edit a task
                        editBtn.addEventListener("click", () => {
                            // open edit form with existing taask data
                            document.getElementById("title1").value = task.title
                            document.getElementById("detail1").value = task.details
                            document.getElementById("usage1").value = task.usage
                            document.getElementById("subtask").value = task.subtask
                



                            toggleFormVisibility2(true);
                            // update form submisson for editing
                            document.getElementById("collForm").onsubmit = async (event) => {
                                event.preventDefault()
                                // title = document.getElementById("title").value
                                // details = document.getElementById("detail").value
                                // usage = document.getElementById("usage").value

                                const updatedColl = {
                                    title: document.getElementById("title").value,
                                    details: document.getElementById("detail").value,
                                    usage: document.getElementById("usage").value,
                                    subtasks: Array.from(document.querySelectorAll("#subtask input")).map(input => input.value)
                                }

                                try {
                                    const response = await fetch(`/home/collection/${task._id}`, {
                                        method: "PUT",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify(updatedColl)
                                    })
                                    if (!response.ok) {
                                        throw new Error("Network response was not okay: " + response.statusText);
                                    }
                                    const data = await response.json();
                                    console.log("Task updated", data);

                                } catch (error) {
                                    console.error(error)
                            
                                }
                            }
                        })

                    })
                }

                        // to search task
        document.getElementById("search-task").addEventListener("keyup", async (e) => {
            e.preventDefault()
            const query = document.getElementById("searchQuery").value

            // If the query is empty clear the search results and return early
            if (query.trim() === '') {
                clearResults();
                return;
            }


            try {
                const response = await fetch(`/search?query=${encodeURIComponent(query)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (!response.ok) {
                    throw new Error('Netwotrk response was not okay', response.statusText)
                }

                const data = await response.json()
                displayResult(data)

                // function to display options
                function displayResult(tasks) {
                    const searchResults = document.getElementById('searchResults')
                    searchResults.parentElement.style.display = 'block'
                    searchResults.innerHTML = '';

                    if (tasks.length === 0) {
                        searchResults.innerHTML = '<li style="list-style-type: none;">No tasks found</li>';
                        return;
                    }

                        tasks.forEach(task => {
                    const listItem = document.createElement('li');
                    listItem.className = "search-disp-item"
                    listItem.textContent = `Title: ${task.title}, Details: ${task.details}, Usage: ${task.usage}, Subtask: ${task.subtask}`;
                    searchResults.appendChild(listItem);

                    // Add event listener to each listItem
                    listItem.addEventListener("click", (e) => {
                        const clickedListItem = e.target;
                        if (clickedListItem) {
                            const taskId = task._id; // Get the task ID from task object
                            console.log(taskId);
                            console.log(clickedListItem);
                            fetchTaskDetails(taskId);
                            searchResults.parentElement.style.display = 'none'
                        }
                    });
                    });
                  }
               async function fetchTaskDetails(taskId){
                    try {
                        const response = await fetch(`/search/${taskId}`);
                        if (!response.ok) {
                            throw new Error("Network response was not okay: " + response.statusText);
                        }
                        const data = await response.json();
                                console.log(`Fetched data: ${JSON.stringify(data)}`);
                        displayTask2(data); // Display the fetched task
                    } catch (error) {
                        console.error(error);
                    }
                }
                // to display the searched task
                function displayTask2(data) {
                    console.log([data]);
                    displayTask([data])
                }


            } catch (error) {
                console.error(error)
            }

        })
    
    
        function clearResults() {
            const searchResults = document.getElementById('searchResults');
            searchResults.innerHTML = '';
        }

