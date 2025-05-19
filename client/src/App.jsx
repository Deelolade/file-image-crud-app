import React from 'react'
import { useState } from 'react'
import axios from "axios"

const App = () => {
  const [uploadStatus, setUploadStatus]=useState("")
  const [imageFile, setImageFile] = useState(null);
  const handleImageChange = async(e)=>{
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
    }
    
  }
const imageFileUpload= async()=>{
  if (!imageFile) {
      setUploadStatus("Please select an image first.");
      return;
    }
  const data = new FormData()
  data.append("image", imageFile)
    try {
        const res = await axios.post("http://localhost:3000/api/upload", data);
        setUploadStatus("Image uploaded sucessfully")
        console.log("uploaded image url:", res.data)
    } catch (error) {
        setUploadStatus("Image declined !!")
      console.log("error saving images:", error)
    }
}
  return (
    <div>
      <input type="file" accept=".png, .jpeg, .jpg, .bmp" name='image' onChange={handleImageChange} />
      <button onClick={imageFileUpload}>send</button>
      <p></p>
    </div>
  )
}

export default App
