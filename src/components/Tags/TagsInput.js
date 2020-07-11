import React from 'react';


const TagsInput = () => {

    const toggleTag = (event) => {
        
        if(event.target.classList.contains('inactive')) {
            event.target.classList.remove("inactive");
            event.target.classList.add("active");    
        } else {
            event.target.classList.add("inactive");
            event.target.classList.remove("active");
        }
        
    }
    
    const availableTags = ['main', 'side', 'breakfast', 'lunch', 'dinner', 'meat', 'veggie', 'vegan', 'healthy', 'hearty', 'spicey', 'asian', 'french', 'british', 'mexican', 'pastry', 'quick', 'gluten-free']
    return (
    
        availableTags.map(tag => <span className="tag inactive" onClick={toggleTag}>{tag}</span>)
    )
};
export default TagsInput