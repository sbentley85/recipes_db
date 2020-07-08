import React from 'react';
import './InstructionList.css';
import InstructionDetail from '../InstructionDetail/InstructionDetail'


class InstructionList extends React.Component {
  

    render () {
        
        
        if (this.props.instructions) {
            

            const instructions = this.props.instructions.map((instruction) => 
                <InstructionDetail key={instruction.instruction_id} instruction={instruction}/>)
                return (
                
                <div>{instructions}</div>
                
                )
            

            
        } else {
            return null;
        }
        

    }

    

}

export default InstructionList