import React from 'react';

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.editTask = this.editTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.doneTask=this.doneTask.bind(this);
        this.state={
            taskName:"",
            taskDescription:"",
            deadline:"",
            showModal:false,
            showEditDelete:false,
            showDeleteModal:false,
            showDoneModal:false,
            done:true,
            checkbox:false
        };
      }
   
    
    render(){
        var showDoneModal=(
            <form  className="modal" >
        <div className="modal-content">
            <span className="close" onClick={() => this.closeDoneModal()}>&times;</span>
            <h4 id="editTask"> ARE YOU SURE THIS TASK IS DONE ?</h4>
            <br/>
            <div id="formStylingButtons">
            <button className="finalButtonDelete" onClick={() => this.closeDoneModal()}>No !</button>
            <button value={this.props.id} className="finalButtonDelete" onClick={(e) => this.doneTask(e)}>Yes, it's done !</button>
            </div>
        </div>
    </form>

        );

        var showDeleteModal=(
            <form  className="modal" >
        <div className="modal-content">
            <span className="close" onClick={() => this.closeDeleteModal()}>&times;</span>
            <h4 id="editTask"> ARE YOU SURE YOU WANT TO DELETE THIS TASK ?</h4>
            <br/>
            <div id="formStylingButtons">
            <button className="finalButtonDelete" onClick={() => this.closeDeleteModal()}>No, I don't want to delete !</button>
            <button value={this.props.id} className="finalButtonDelete" onClick={(e) => this.deleteTask(e)}>Yes, I want to delete this task !</button>
            </div>
        </div>
    </form>

        );
        

        var editWindow = (<form id="myModal" className="modal" >
        <div className="modal-content">
            <span className="close" onClick={() => this.closeModal()}>&times;</span>
            <h4 id="editTask"> EDIT THIS TASK</h4>
            <br/>
            <div id="formStyling">
            <input className="textboxStyle" type="textbox" placeholder="Edit task name" onChange={(e) => this.setTaskName(e)} value={this.state.taskName}/>
            <input className="textboxStyle" type="textbox" placeholder="Edit task description" onChange={(f) => this.settaskDescription(f)} value={this.state.taskDescription}/>
            <input className="textboxStyle" type="date" placeholder="Edit task date" onChange={(g) => this.setdeadline(g)} value={this.state.deadline}/>
            </div>
            <br/>
            <button value={this.props.id} className="finalButton" onClick={(e) => this.editTask(e)}>Edit Task</button>
        </div>
    </form>);

        return (
            <div>
                <h4 id="header">TASK :</h4>
                <div className="mainDiv" onMouseLeave={(e)=>this.dontShowEditDelete(e)}>
                        <div className="todo-item" onMouseEnter={()=> this.showEditDelete()}>
                            <div className="details"  >
                                <div className="todo-title">
                                <input id="checkbox" type="checkbox" onClick={()=>this.showDoneModal()}/> {this.props.TaskName}
                                {this.state.showDoneModal?showDoneModal:""}
                                </div>
                                <div className="todo-description">
                                <i className="fas fa-tasks" id="iconColor"></i> {this.props.TaskDescription}
                                <br/>
                                <i className="fas fa-calendar-week"  id="iconColor"></i> {this.props.Deadline}
                                </div>
                            </div>
                            {this.state.showEditDelete?(
                                    <div className="EditDelete" onMouseLeave={(e)=>this.dontShowEditDelete(e)}>
                                    <button id="editButton" onClick={() => this.openModal()}>Edit</button> 
                                    {this.state.showModal?editWindow:""}
                                    
                                    <button value={this.props.id} id="deleteButton" onClick={(e)=>this.showDeleteModal(e)}>Delete</button>
                                    {this.state.showDeleteModal?showDeleteModal:""}
                                </div>
                                ) : ""}
                        </div>
                        <br/>
                </div>
                <br/>
            </div>
            
               
        );
        
    }

openModal(){

    this.setState({
        showModal:true
    })
    console.log(this.state.showModal)
}
    closeModal(){
    this.setState({
        showModal:false
    })
}

showDeleteModal(){
    this.setState({
        showDeleteModal:true
    })
}

closeDeleteModal(){
    this.setState({
        showDeleteModal:false
    })

}

showDoneModal(){
    this.setState({
        showDoneModal:true
    })
}
closeDoneModal(){
    this.setState({
        showDoneModal:false,
        checkbox:false
    })
    document.getElementById("checkbox").checked=this.state.checkbox
}

showEditDelete()
{
    this.setState({
        showEditDelete:true
    })
}
dontShowEditDelete(e){
    e.preventDefault()
    this.setState({
        showEditDelete:false
    })
    this.closeModal()
}

//     // =========================================
    setTaskName(e){

        e.preventDefault();
        this.setState({
            taskName:e.target.value,
           
           
        })
      
        
    }

    settaskDescription(f){
        
        f.preventDefault();
        this.setState({
            taskDescription:f.target.value,
           
        })
        
    }
    setdeadline(g){
       
        g.preventDefault();
        this.setState({
            deadline:g.target.value,
           
        })
       
    }
    
   
// // =============================================

   editTask(e){
       e.preventDefault()
    this.props.FunctionEdit(e.target.value, this.state.taskName,  this.state.taskDescription,  this.state.deadline )
    this.closeModal()
    this.setState({
        taskName:"",
        taskDescription:"",
        deadline:""
    })
   }


    deleteTask(e){
        e.preventDefault()
        this.props.FunctionDelete(e.target.value)
        this.closeDeleteModal()
    }

    doneTask(e){
        e.preventDefault()
        this.props.FunctionEditDone(e.target.value, this.state.done )
        this.closeDoneModal()


    }

}
   
export default TodoItem

