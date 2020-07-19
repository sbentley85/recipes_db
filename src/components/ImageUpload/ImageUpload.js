import React, {useState} from 'react'

const ImageUpload = () => {
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState("")
    
    const uploadImage = async e => {
        
        
        const files = e.target.files
        const data = new FormData();
        data.append('file', files[0])
        data.append('upload_preset', 'recipes')
        setLoading(true)

        const res = await fetch('https://api.cloudinary.com/v1_1/hg4qmtzec/image/upload', {
            method: 'POST',
            body: data
        } )

        const file = await res.json()
        console.log(file)
        setImage(file.secure_url)
        setLoading(false)

    }
    if (image) {
        return (
            <div className="upload">
                <h4>Upload image</h4>
                <input type="file" name="file" placeholder="upload an image" onChange={uploadImage} />
    
                {
                loading ? (
                    <h5>Loading</h5>
                ) : (
                    <img className = "upload" src={image} style={{width: '300px'}} />
                )}
    
            </div>
        )
    } else {
        return (
            <div className="upload">
                <h4>Upload image</h4>
                <input type="file" name="file" placeholder="upload an image" onChange={uploadImage} />
    
                {
                loading ? (
                    <h5>Loading</h5>
                ) : (
                    <div></div>
                )}
    
            </div>
        )
    }
    
};

export default ImageUpload;