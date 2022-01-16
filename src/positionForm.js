import React from 'react';
import { spawnPosition } from './main'

class PositionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { x: '', y: '' }

        this.handleChangeX = this.handleChangeX.bind(this);
        this.handleChangeY = this.handleChangeY.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeX(event) {
        this.setState({ x: event.target.value });
    }

    handleChangeY(event) {
        this.setState({ y: event.target.value });
    }

    handleSubmit = async event => {
        //alert('Position was submitted: (' + this.state.x + ',' + this.state.y + ')');
        event.preventDefault();
        let response = await spawnPosition(parseInt(this.state.x), parseInt(this.state.y));
        console.log("response: ", response);
        let result;
        if ((typeof response)!="string") {
            result = "Spawn success.";
        } else if (response.includes('Other players have spawned at this position within the last 5 minutes.')) {
            result = 'Other players have spawned at this position within the last 5 minutes.'
        } else if (response.includes('This position is currently occupied by another player.')) {
            result  = 'This position is currently occupied by another player.'
        } else {
            result = response;
        }
        alert(result);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                Only positive integer inputs are allowed.<br/>
                <label>
                    x:
                    <input type="text" pattern="\d+"value={this.state.x} onChange={this.handleChangeX} />
                </label><br/><label>
                    y:
                    <input type="text" pattern="\d+" value={this.state.y} onChange={this.handleChangeY} />
                </label><br/>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default PositionForm;