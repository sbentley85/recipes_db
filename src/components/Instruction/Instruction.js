import React from 'react';
import './Instruction.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


class Instruction extends React.Component {
    


    render() {
        if (this.props.instruction) {
            const instructionText = this.props.instruction.instruction_text;
            return (
                <Row className='mt-2'>
                    <Form.Control className="instructions text-center" defaultValue={instructionText} />
                </Row>
            )
        } else {
            const instructionString = `Instruction ${this.props.instructionNum}`
            return (
                <Row className='mt-2'>
                    <Form.Control className="instructions" placeholder={instructionString} />
                </Row>
            )
        }
        
        
    }

}

export default Instruction