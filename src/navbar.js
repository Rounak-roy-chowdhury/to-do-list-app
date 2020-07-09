import React from 'react';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.SidePanelControl=this.SidePanelControl.bind(this);
        this.state={
            taskName:"",
            sidePanel:true
        };
      }
    
    render(){
        return(
            <div>
                 <div  className="navbar">
                    <i id="bars" onClick={(e)=>this.SidePanelControl(e)} class="fas fa-bars"></i>
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
        if(this.state.taskName!=="")
        {
            this.props.FunctionSearch(this.state.taskName)
        }
        else if(this.state.taskName==="")
        {
            this.props.FunctionShow()
        }

    }

// USED TO GO TO THE FunctionSidePanel PROP THAT IS, THE 'SidePanelControl()' FUNCTION IN BODY.JS

    SidePanelControl(e){
        e.preventDefault();
        if(this.state.sidePanel===false)
        {
            this.setState({
                sidePanel:true
            })
            this.props.FunctionSidePanel(true)
        }
        else if(this.state.sidePanel===true)
        {
            this.setState({
                sidePanel:false
            })
            this.props.FunctionSidePanel(false)
        }

    }


}
export default Navbar