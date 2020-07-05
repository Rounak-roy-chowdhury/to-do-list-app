import React from 'react';

class TodoItem extends React.Component {
   
    state={
        todoItems:[],
        taskName:"",
        taskDescription:"",
        deadline:"",
        showModal:false,
        output:false,
        normalRender:true
    };
    render(){
        // console.log(this.state.showModal)
        var output = this.state.todoItems.map(item => (
            <TodoItem key={item._id} TaskName={item.taskName} TaskDescription={item.taskDescription} Deadline={item.deadline} />
        ));

        var normalRender =( <div>
            <div className="details">
                <div className="todo-title">
                    {this.props.TaskName}
                    <br/>
                    {this.props.id}
                </div>
                <div className="todo-description">
                    {this.props.TaskDescription}
                </div>
                <div>
                    {this.props.Deadline}
                </div>
            </div>
            <div className="EditDelete">
                <button id="myBtn" onClick={() => this.openModal()}>Edit</button> 
                <button value={this.props.id} id="deleteButton" onClick={(e)=>this.delete(e)}>Delete</button>
            </div>
        </div>);

        var editWindow = (<form id="myModal" className="modal" >
        <div className="modal-content">
            <span className="close" onClick={() => this.closeModal()}>&times;</span>
            <p>Edit TASK</p>
            <br/>
            <input type="textbox" placeholder="Edit task name" onChange={(e) => this.setTaskName(e)} value={this.state.taskName}/>
            <input type="textbox" placeholder="Edit task description" onChange={(f) => this.settaskDescription(f)} value={this.state.taskDescription}/>
            <input type="date" placeholder="Edit task date" onChange={(g) => this.setdeadline(g)} value={this.state.deadline}/>
            <br/>
            <button value={this.props.id} className="finalEdit" onClick={(e) => this.edit(e)}>Edit Task</button>
        </div>
    </form>);

        return (
            <div className="todo-item" >
                {this.state.showModal?editWindow:""}
               {this.state.normalRender?normalRender:""}
               {this.state.output?output:""}
            </div>
               
        );
        
    }

    // setIsShown1()
    // {
    //     document.getElementById("editButton").style.display = "block";
    //     document.getElementById("deleteButton").style.display = "block";
    // }

    // setIsShown2()
    // {
    //     document.getElementById("editButton").style.display = "none";
    //     document.getElementById("deleteButton").style.display = "none";
    // }


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

    edit(e)
    {
        e.preventDefault();
        this.setState({
            normalRender:false
        })
        e.preventDefault();
        console.log(e.target.value)
        var url = "http://localhost:5000/api/todo/application/editTask/" + e.target.value ;
        console.log(url)

        fetch(url,{
            method:"PUT",
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
        this.setState({
        taskName:"",
        taskDescription:"",
        deadline:"",
        showModal:false,
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
            todoItems : test,
            output : true
        })
      
    } 

    delete(e)
    {
        e.preventDefault();
        console.log(e.target.value)
        var url = "http://localhost:5000/api/todo/application/deleteTask/" + e.target.value ;
        console.log(url)

        fetch(url,{
            method:"POST",
            }).then(() => this.extra()  )
    }


}
   
export default TodoItem

