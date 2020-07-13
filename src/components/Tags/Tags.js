import React from 'react';
import { Link } from 'react-router-dom';


const Tags = (props) => {
    
    if(props.tags) {
    return (
        props.tags.map(tag => <Link to={`/tags/${tag.tag}`}><span className="tag">{tag.tag}</span></Link>)
    )
    } else {
        return null
    }
};

export default Tags