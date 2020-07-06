import React from 'react';
import TodoItem from './todoItem'
import image from './image.jpg'
import Navbar from './navbar'

class body extends React.Component {
    constructor(props) {
        super(props);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.search = this.search.bind(this);
        this.showTask=this.showTask.bind(this);
        this.editDone=this.editDone.bind(this);
        this.state={
            todoItems:[],
            taskName:"",
            taskDescription:"",
            deadline:"",
            addTask:false,
            nothing:true
        };
      }
    render(){
        
// CODE OF MODAL USED TO ADD TASK
        var addTask = (<div id="myModal" className="modal1">
        <div className="modal-content">
            <span className="close" onClick={() => this.closeModal1()}>&times;</span>
            <h4 id="addTask">ADD NEW TASK</h4>
            <br/>
            <div id="formStyling">
            <input className="textboxStyle" type="textbox" placeholder="Add new task name" onChange={(e) => this.setTaskName(e)} value={this.state.taskName}/>
            <input  className="textboxStyle" type="textbox" placeholder="Add new task description" onChange={(f) => this.settaskDescription(f)} value={this.state.taskDescription}/>
            <input className="textboxStyle" type="date" placeholder="Add new task date" onChange={(g) => this.setdeadline(g)} value={this.state.deadline}/>
            </div>
            <br/>
            <button className="finalButton" onClick={(e) => this.addTask(e)}>Add Task</button>
        </div>
    </div>);

// CODE OF THE FIRST SCREEN BEFORE EVEN RENDERING THE TODOLIST
        var nothing=(
            <div>
                <div>
                <img id="image" src={image}/>
                </div>
                <br/>
                <br/>
            <button id="myBtn1" onClick={() => this.openModal1()}>Why don't you add a new task ?</button>
            {this.state.addTask?addTask:""}
            </div>
        );

// CODE TO SHOW TODO ITEMS IN <ToDoItem/> NODE 
        var output = this.state.todoItems.map(item => (
            <TodoItem  key={item._id} FunctionEditDone={this.editDone} FunctionDelete={this.delete} FunctionEdit={this.edit} TaskName={item.taskName} TaskDescription={item.taskDescription} Deadline={item.deadline} id={item._id}/>
        ));
        
// CODE TO SHOW NAVBAR IN <Navbar/> NODE
        var navbar = (<Navbar FunctionSearch={this.search} FunctionShow={this.showTask}/>)

        return(
            <div>
                {navbar}
                <div className="body">
                    {this.state.nothing?nothing:output}
                </div>
                {this.state.nothing?"":(<button className="finalButtonAdd" onClick={(e) => this.openModal1(e)}>Add a new Task</button>)}
                {this.state.addTask?addTask:""}
            </div>
            );
    }

// TO OPEN & CLOSE MODAL TO ADD TODOTIEM
     openModal1(){
         this.setState({
            addTask:true
         })
    }
     closeModal1(){
        this.setState({
            addTask:false
         })
    }


// TO SET STATES OF VARIOUS VARIABLES FOR VARIOUS USES
    setTaskName(e){
        e.preventDefault();
        this.setState({
            taskName:e.target.value
        })
    }
    settaskDescription(f){
        f.preventDefault();
        this.setState({
            taskDescription:f.target.value
        })
    }
    setdeadline(g){
        g.preventDefault();
        this.setState({
            deadline:g.target.value
        })
    }

// ALL FUNCTIONS STARTS BELOW THIS

// FUNCTION TO ADD A TODOITEM
    addTask(e){
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


// THIS IS TO EDIT A PARTICULAR TODOITEM (NORMAL EDIT)
    edit(e,x,y,z)
    {
        
        console.log(e)
        var url = "http://localhost:5000/api/todo/application/editTask/" + e ;
        console.log(url)

        fetch(url,{
            method:"PUT",
            body: JSON.stringify({
                "taskName":x,
                "taskDescription":y,
                "deadline":z
                }),
            headers:{
                "Content-type":"application/json; charset=UTF-8"
                }
            }).then(() => this.extra()  )            
    };

//THIS IS TO MARK DONE (EDIT isDone FIELD) TO ANY PARTICULAR TODOITEM 
    editDone(e,x)
    {
        
        console.log(e)
        var url = "http://localhost:5000/api/todo/application/editTask/" + e ;
        console.log(url)

        fetch(url,{
            method:"PUT",
            body: JSON.stringify({
                "isDone":x,
                }),
            headers:{
                "Content-type":"application/json; charset=UTF-8"
                }
            }).then(() => this.extra()  )            
    };


// TO DELETE ANY PARTICULAR TODOITEM
    delete(e)
    { 
        var url = "http://localhost:5000/api/todo/application/deleteTask/" + e ;
        console.log(url)

        fetch(url,{
            method:"POST",
            }).then(() => this.extra()  )
    }

// TO SEARCH/QUERY ANY PARTICULAR TODOITEM
    async search(x)
    {
        console.log("hi")
        let response = await fetch("http://localhost:5000/api/todo/application/queryTask/" + "?taskName=" +x);
        var url = "http://localhost:5000/api/todo/application/queryTask/" + "?taskName=" +x
        console.log(url)
        let data = await response.json()
        let test=[]
        for(var i=0; i<data.length;i++)
        {
            test.push(data[i])
        }
        this.setState({
            todoItems : test
        })
        console.log(this.state.todoItems)
        
    }

// TO SHOW/RENDER TODOITEMS
    async showTask(req,res) {
        console.log("hi")
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

//THIS FUNCTION HOLDS MANY FUNCTIONALITIES WHICH ARE USEFUL TO MANY FUNCTIONS WRITTEN HERE 
    extra(){
        this.setState({
        taskName:"",
        taskDescription:"",
        deadline:"",
        addTask:false,
        nothing:false
    })
    this.showTask()
}
   
}
export default body;



