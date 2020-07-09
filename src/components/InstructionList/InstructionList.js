import React from 'react';
import './InstructionList.css';
import InstructionDetail from '../InstructionDetail/InstructionDetail';
import Col from 'react-bootstrap/Col';


class InstructionList extends React.Component {
  

    render () {
        
        
        if (this.props.instructions) {
            

            const instructions = this.props.instructions.map((instruction) => 
                <InstructionDetail key={instruction.instruction_id} instruction={instruction}/>)
                return (
                
                <Col className="text-center">{instructions}</Col>
                
                )
            

            
        } else {
            return null;
        }
        

    }

    

}

export default InstructionList