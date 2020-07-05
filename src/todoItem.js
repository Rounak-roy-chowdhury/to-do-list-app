import React from 'react';

class TodoItem extends React.Component {
   
    state={
        todoItems:[],
        taskName:"",
        taskDescription:"",
        deadline:"",
        taskId:""
    };
    render(){
        // var output = this.state.todoItems.map(item => (
        //     <TodoItem key={item._id} TaskName={item.taskName} TaskDescription={item.taskDescription} Deadline={item.deadline} />
        // ));

        // console.log(output)
        console.log(this.props.id)
        console.log(this.state)
        return (
            <div className="todo-item" >
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
                        <form div id="myModal" className="modal" >
                            <div className="modal-content">
                                <span className="close" onClick={() => this.closeModal()}>&times;</span>
                                <p>Edit TASK</p>
                                <br/>
                                <input type="textbox" placeholder="Edit task name" onChange={(e) => this.setTaskName(e)} value={this.state.taskName}/>
                                <input type="textbox" placeholder="Edit task description" onChange={(f) => this.settaskDescription(f)} value={this.state.taskDescription}/>
                                <input type="date" placeholder="Edit task date" onChange={(g) => this.setdeadline(g)} value={this.state.deadline}/>
                                <br/>
                                <button value={this.props.id} className="finalEdit" onClick={(e) => this.edit(e,"value")}>Edit Task</button>
                            </div>
                        </form>
                    <button id="deleteButton" onClick={()=>this.delete()}>Delete</button>
                </div>
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
    //    console.log(this.props.id)
    //    var v = this.props.id
    //    this.setState({
    //        taskId:v
    //    })
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
    }
     closeModal(){
        console.log(this.props.id)
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
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
        console.log(e.target.value)
        // console.log(this.state)
        // console.log(id)
        // var url = "http://localhost:5000/api/todo/application/editTask/" ;
        // console.log(url)

        // fetch(url,{
        //     method:"PUT",
        //     body: JSON.stringify({
        //         "taskName":this.state.taskName,
        //         "taskDescription":this.state.taskDescription,
        //         "deadline":this.state.deadline
        //         }),
        //     headers:{
        //         "Content-type":"application/json; charset=UTF-8"
        //         }
        //     })
        //     this.showTask()
        //     this.closeModal()
            // this.setState({
            //     taskName:"",
            //     taskDescription:"",
            //     deadline:"",
            //     taskId:""
            // })
    };


//     async showTask(req,res) {
//         let test=[]
//         let response = await fetch("http://localhost:5000/api/todo/application/showTask")
//         let data = await response.json()
     
//         for(var i=0; i<data.length;i++)
//         {
//             test.push(data[i])
//         }
//         this.setState({
//             todoItems : test
//         })
      
//     } 

//     delete()
//     {

//     }

//
 }
   
export default TodoItem

