

let taskList = []

const entryElm = document.getElementById("entry")
const badElm = document.getElementById("bad")
const hoursPerWeek = 24*7

const handleOnSubmit = (e) =>{
    const newTask = new FormData(e)
    const task = newTask.get("task")
    const hr = newTask.get("hr")
    const obj = {
        id: randomStr(),
         task,
     hr,
     type: "entry"
    
    }

    const ttl = total()

    if (ttl + +hr > hoursPerWeek){
        return alert("You have exceeded the total hours per week")
    }

    taskList.push(obj)

    console.log(taskList)
 // for(const task of newTask.values()) {
    //     console.log(task)
    // }
    // for(const task of newTask.values()) {
    //     console.log(task)
    // }
    displayTask()
    displayBadTask()
    total()
}

const displayTask = () => {
    let str = ``
    const entryArray = taskList.filter((task)=>
    task.type==="entry"
    )
    entryArray.map((item, i)=>{
        str += `<tr>
    <td>${i + 1}</td> 
    <td>${item.task}</td>
    <td>${item.hr}</td>
    <td>
        <button class="btn btn-sm btn-danger" onclick="handleOnDelete('${item.id}')">
            <i class="fa-solid fa-trash">
            
            </i>
        </button>
        <button class="btn btn-sm btn-success" onclick="switchTask('${item.id}', 'bad')">
            <i class="fa-solid fa-arrow-right"></i>
        </button>
    </td>
  </tr>`
    })

    entryElm.innerHTML = str
}
const displayBadTask = () => {
    let str = ``
    const entryArray = taskList.filter((task)=>
    task.type==="bad"
    )
    entryArray.map((item, i)=>{
        str += `<tr>
    <td>${i + 1}</td> 
    <td>${item.task}</td>
    <td>${item.hr}</td>
    <td>

    <button class="btn btn-sm btn-warning" onclick="switchTask('${item.id}', 'entry')">
    <i class="fa-solid fa-arrow-left"></i>
</button>
        <button class="btn btn-sm btn-danger" onclick="handleOnDelete('${item.id}')">
            <i class="fa-solid fa-trash">
            
            </i>
        </button>
       
    </td>
  </tr>`
    })

    badElm.innerHTML = str
}
 const handleOnDelete = (id)=>{
    if(window.confirm("Are you sure you want to delete")){
    taskList = taskList.filter((item)=> id != item.id)
    displayTask()
    displayBadTask()
    total()
    }
 }
 
 const randomStr = () =>{
    const charLength = 6
    const str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
    let id = ""
    for(let i=0; i< charLength; i++){
        const ranNum = Math.round(Math.random() * (str.length -1))
         id += str[ranNum]
    }
    return id
 }
 
 const switchTask = (id, type) =>{
    taskList.map((item)=>{
    if (item.id == id){
        item.type = type
    }
    return item;
})
displayTask()
displayBadTask()
total()
 }

 const total =() =>{
    const ttl = taskList.reduce((acc, item) =>
    acc+ +item.hr,0
 )
 document.getElementById("total").innerHTML = ttl

 

 const badttl = taskList.reduce((acc, item)=>
   item.type === "bad" ? acc + +item.hr : acc, 0
 )
 document.getElementById("badTotal").innerText = badttl
 return ttl
}