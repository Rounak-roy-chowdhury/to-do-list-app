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

// CODE OF MODAL USED TO MARK A TODO ITEM AS DONE
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
    
    
// CODE OF MODAL USED TO DELETE A TODO ITEM

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
        
// CODE OF MODAL USED TO EDIT A TODO ITEM

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
                <br/>
                <br/>
                    {/* <h4 id="header">TASK :</h4> */}
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

                                {/* CODE TO SHOW EDIT & DELETE BUTTON */}
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

// TO OPEN & CLOSE MODAL TO EDIT TODO ITEM
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


// TO OPEN & CLOSE MODAL TO DELETE TODO ITEM
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

// TO OPEN & CLOSE MODAL TO MARK A TODO ITEM AS DONE
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

// TO SHOW & HIDE EDIT & DELETE BUTTON
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

// TO SET STATES OF VARIOUS VARIABLES FOR VARIOUS USES
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
    
   
// ALL FUNCTIONS STARTS BELOW THIS

// USED TO GO TO THE FunctionEdit PROP THAT IS, THE 'edit()' FUNCTION IN BODY.JS

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


// USED TO GO TO THE FunctionDelete PROP THAT IS, THE 'delete()' FUNCTION IN BODY.JS
    deleteTask(e){
        e.preventDefault()
        this.props.FunctionDelete(e.target.value)
        this.closeDeleteModal()
    }

// USED TO GO TO THE FunctionEditDone PROP THAT IS, THE 'editDone()' FUNCTION IN BODY.JS
    doneTask(e){
        e.preventDefault()
        this.props.FunctionEditDone(e.target.value, this.state.done )
        this.closeDoneModal()


    }

}
   
export default TodoItem

