import React from 'react';
import './InstructionsInput.css';
import Instruction from '../Instruction/Instruction';
import Form from 'react-bootstrap/Form';

class InstructionsInput extends React.Component {
    


    render() {
        const instructionsArray = [];
        if(this.props.instructions) {
            for (let i=0; i < this.props.numInstructions; i++) {
                const instruction = this.props.instructions[i]
                instructionsArray.push(<Instruction instruction={instruction} instructionNum={i+1} key={1}/>)
            }
        } else {
            for (let i=0; i < this.props.numInstructions; i++) {
                instructionsArray.push(<Instruction instructionNum={i+1} key={i}/>)
            }
        }


        return (
          <Form>
            {instructionsArray}
          </Form>                        
        );
    }

}

export default InstructionsInput