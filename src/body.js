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
        this.SidePanelControl=this.SidePanelControl.bind(this);
        this.state={
            todoItems:[],
            taskName:"",
            taskDescription:"",
            deadline:"",
            addTask:false,
            nothing:true,
            sidePanel:true,
            dueTasks:false,
            completedTasks:false
        };
      }
    render(){

// CODE OF "Check completed tasks by" IN SIDE PANEL
        var completedTasks=(
            <div>
                <i id="doneTasks" className="fas fa-clipboard-check" onClick={()=>this.completedTasks()}></i><a className="topics" onClick={()=>this.completedTasks()}>Check completed tasks by </a><i class="fas fa-caret-up" onClick={()=>this.completedTasks()}></i>
                <div id="dropdown2">
                    <a className="options"><i class="fas fa-arrow-circle-right"></i>&nbsp;Show all</a>
                    <a className="options"><i class="fas fa-arrow-circle-right"></i>&nbsp;Task name</a>
                    <a className="options"><i class="fas fa-arrow-circle-right"></i>&nbsp;Label</a>
                    <a className="options"><i class="fas fa-arrow-circle-right"></i>&nbsp;Priority</a>
                    <a className="options"><i class="fas fa-arrow-circle-right"></i>&nbsp;Task completion date</a>
                </div>
            </div>
        );

// CODE OF "Check due tasks by" IN SIDE PANEL
        var dueTasks=(
            <div>
                <i id="dueTasks" className="fas fa-exclamation-triangle" onClick={()=>this.dueTasks()}></i><a className="topics" onClick={()=>this.dueTasks()}>Check due tasks by </a><i class="fas fa-caret-up" onClick={()=>this.dueTasks()}></i>
                <div id="dropdown1">
                    <a className="options"><i class="fas fa-arrow-circle-right"></i>&nbsp;Show all</a>
                    <a className="options"><i class="fas fa-arrow-circle-right"></i>&nbsp;Task name</a>
                    <a className="options"><i class="fas fa-arrow-circle-right"></i>&nbsp;Label</a>
                    <a className="options"><i class="fas fa-arrow-circle-right"></i>&nbsp;Priority</a>
                    <a className="options"><i class="fas fa-arrow-circle-right"></i>&nbsp;No deadline</a>
                    <a className="options"><i class="fas fa-arrow-circle-right"></i>&nbsp;Overdue</a>
                </div>
            </div>
        );
// CODE OF SIDE PANEL
        var sidePanelOutput=(
            <div id="sidePanel">
                <div>
                    <a id="dashboard">Your Dashboard</a>
                </div>
                <div className="categories">
                    <i id="today" className="fas fa-calendar-day"></i><a className="topics">Today</a>
                </div>
                <div className="categories1">
                    {this.state.dueTasks?dueTasks:(<div><i id="dueTasks" className="fas fa-exclamation-triangle" onClick={()=>this.dueTasks()}></i><a className="topics" onClick={()=>this.dueTasks()}>Check due tasks by </a><i class="fas fa-caret-down" onClick={()=>this.dueTasks()}></i></div>)}
                </div>
                <div className="categories">
                   {this.state.completedTasks?completedTasks:(<div><i id="doneTasks" className="fas fa-clipboard-check" onClick={()=>this.completedTasks()}></i><a className="topics" onClick={()=>this.completedTasks()}>Check completed tasks by </a><i class="fas fa-caret-down" onClick={()=>this.completedTasks()}></i></div>)}
                </div>
            </div>

            
        );
        
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
        var navbar = (<Navbar FunctionSidePanel={this.SidePanelControl} FunctionSearch={this.search} FunctionShow={this.showTask}/>)

        return(
            <div>
                {navbar}
                <div className="todoItems">
                    <div className="body">
                        {this.state.sidePanel?sidePanelOutput:""}
                        {this.state.nothing?nothing:output}
                    </div>
                    {this.state.nothing?"":(<button className="finalButtonAdd" onClick={(e) => this.openModal1(e)}>Add a new Task</button>)}
                    {this.state.addTask?addTask:""}
                </div>
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
        
       
        var url = "http://localhost:5000/api/todo/application/editTask/" + e ;
       

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
        
        
        var url = "http://localhost:5000/api/todo/application/editTask/" + e ;
       

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
       

        fetch(url,{
            method:"POST",
            }).then(() => this.extra()  )
    }

// TO SEARCH/QUERY ANY PARTICULAR TODOITEM
    async search(x)
    {
       
        let response = await fetch("http://localhost:5000/api/todo/application/queryTask/" + "?taskName=" +x);
        let data = await response.json()
        let test=[]
        for(var i=0; i<data.length;i++)
        {
            test.push(data[i])
        }
        this.setState({
            todoItems : test
        })
       
        
    }

// TO SHOW/RENDER TODOITEMS
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

// TO TOGGLE THE SIDE PANEL

  SidePanelControl(e){
      if(e===true)
      {
          this.setState({
              sidePanel:true
          })
      }
      else if(e===false)
      {
          this.setState({
              sidePanel:false,
              dueTasks:false,
              completedTasks:false
          })
      }
  }

//   TO OPEN/CLOSE DUE "Check due tasks by" IN SIDE PANEL
  dueTasks(){
      if(this.state.dueTasks===false)
      {
        this.setState({
            dueTasks:true
        })
      }
      else if(this.state.dueTasks===true)
      {
        this.setState({
            dueTasks:false
        })
      }
  }

//   TO OPEN/CLOSE DUE "Check completed tasks by" IN SIDE PANEL
  completedTasks(){
    if(this.state.completedTasks===false)
    {
      this.setState({
        completedTasks:true
      })
    }
    else if(this.state.completedTasks===true)
    {
      this.setState({
        completedTasks:false
      })
    }
  }
   
}
export default body;
