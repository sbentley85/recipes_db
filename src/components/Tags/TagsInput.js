import React from 'react';


const TagsInput = (props) => {
    const availableTags = ['main', 'side', 'breakfast', 'lunch', 'dinner',
    'dessert', 'meat', 'veggie', 'vegan', 'seafood', 'healthy', 'hearty', 'spicey', 'asian',
    'indian', 'japanese', 'chinese', 'french', 'british', 'mexican', 'italian',
    'spanish', 'pastry', 'rice', 'pasta', 'chocolate', 'quick', 'gluten-free']

    const toggleTag = (event) => {
        
        if(event.target.classList.contains('inactive')) {
            event.target.classList.remove("inactive");
            event.target.classList.add("active");    
        } else {
            event.target.classList.add("inactive");
            event.target.classList.remove("active");
        }
        
    }



    const renderTags = () => {
        if (props.tags) {
            const activeTags = [];
            for (let i=0; i<props.tags.length; i++) {
                activeTags.push(props.tags[i].tag)
                
            }

            return availableTags.map(tag => activeTags.includes(tag) ? <span className="tag active" onClick={toggleTag}>{tag}</span> : <span className="tag inactive" onClick={toggleTag}>{tag}</span>)
        } else {
            return availableTags.map(tag => <span className="tag inactive" onClick={toggleTag}>{tag}</span>)
        }
    }
        
    return (
    
        renderTags()
    )    
    
    
};
export default TagsInput