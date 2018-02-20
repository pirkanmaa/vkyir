import React from 'react';

class Root extends React.Component {
    constructor(){
    	super();
    	this.state = {
            number: 123,
        };
    }

    render() {
        return (
            <div onClick={() => {
                    this.setState({number: this.state.number - 1});
            }}>
                Here be the stuff: {this.state.number}
            </div>
        );
    }
}

export default Root;
