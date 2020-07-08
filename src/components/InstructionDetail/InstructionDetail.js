import React from 'react';
import './InstructionDetail.css';

class InstructionDetail extends React.Component {
    
    render() {
        
        return (

            <p>Step {this.props.instruction.step}: {this.props.instruction.instruction_text}</p>
        )
    }

}

export default InstructionDetail