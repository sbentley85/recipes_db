import React from 'react';


const Tags = (props) => {
    console.log(props.tags)
    if(props.tags) {
    return (
        props.tags.map(tag => <span className="tag">{tag.tag}</span>)
    )
    } else {
        return null
    }
};

export default Tags