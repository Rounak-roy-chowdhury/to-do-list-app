import React from 'react';
import TodoItem from './todoItem'

class body extends React.Component {
    
    state={
        todoItems:[],
        taskName:"",
        taskDescription:"",
        deadline:""
    };
    render(){
        // console.log(this.state)
        var output = this.state.todoItems.map(item => (
            <TodoItem onClick={(e) => {this.edit(item._id)}}  key={item._id} TaskName={item.taskName} TaskDescription={item.taskDescription} Deadline={item.deadline} id={item._id}/>
        ));
        return(
            <div className="body">
                YOUR TASK LIST
                {output}

                <button id="myBtn1" onClick={() => this.openModal1()}>Add new item</button>
        
                <div id="myModal1" className="modal1">
                    <div className="modal-content1">
                        <span className="close1" onClick={() => this.closeModal1()}>&times;</span>
                        <p>ADD NEW TASK</p>
                        <br/>
                        <input type="textbox" placeholder="Add new task name" onChange={(e) => this.setTaskName(e)} value={this.state.taskName}/>
                        <input type="textbox" placeholder="Add new task description" onChange={(f) => this.settaskDescription(f)} value={this.state.taskDescription}/>
                        <input type="date" placeholder="Add new task date" onChange={(g) => this.setdeadline(g)} value={this.state.deadline}/>
                        <br/>
                        <button onClick={() => this.addTask()}>Add Task</button>
                    </div>
                </div>
               
            </div>
            );
    }

     openModal1(){
        var modal = document.getElementById("myModal1");
        modal.style.display = "block";
    }
     closeModal1(){
        var modal = document.getElementById("myModal1");
        modal.style.display = "none";
    }


// =========================================
    setTaskName(e){
        this.setState({
            taskName:e.target.value
        })
        // console.log(this.state)
    }
    settaskDescription(f){
        this.setState({
            taskDescription:f.target.value
        })
    }
    setdeadline(g){
        this.setState({
            deadline:g.target.value
        })
    }
// ============================================


    addTask(){
        // console.log(this.state)
        var url = "http://localhost:5000/api/todo/application/addTask"
        fetch(url,{
            method:"POST",
            body: JSON.stringify({
            "taskName":this.state.taskName,
            "taskDescription":this.state.taskDescription,
            "deadline":this.state.deadline
            }),
            headers:{
                "Content-type":"application/json; charset=UTF-8"
            }
        }).then(() => this.extra()  )
        
    };

    extra(){
        this.closeModal1()
            this.setState({
            taskName:"",
            taskDescription:"",
            deadline:""
        })
        this.showTask()
    }

    
    async showTask(req,res) {
        let test=[]
        let response = await fetch("http://localhost:5000/api/todo/application/showTask")
        let data = await response.json()
        for(var i=0; i<data.length;i++)
        {
            test.push(data[i])
        }
        this.setState({
            todoItems : test
        })
    }
   
}
export default body;



