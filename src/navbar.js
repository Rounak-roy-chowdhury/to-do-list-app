import React from 'react';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.state={
            taskName:"",
        };
      }
    
    render(){
        return(
            <div>
                 <div  className="navbar">
                <div className="search-bar">
                    <input id="search" type="textbox" placeholder="Search your task" onChange={(e) => this.input(e)} />
                    <button id="icon" type="submit" onClick={()=>this.search()}><i className="fa fa-search"></i></button>
                </div>
            </div>
            </div>
        );
    }

    input(e){
        e.preventDefault();
        this.setState({
            taskName:e.target.value

        })

    }

// USED TO GO TO THE FunctionSearch PROP THAT IS, THE 'search()' FUNCTION IN BODY.JS
    search(){
        if(this.state.taskName!="")
        {
            this.props. FunctionSearch(this.state.taskName)
        }
        else if(this.state.taskName==="")
        {
            this.props. FunctionShow()
        }

    }


}
export default Navbar