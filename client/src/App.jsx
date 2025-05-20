import { useState } from 'react'
import axios from "axios"
import { useEffect } from 'react'
import Modal from "react-modal"

const App = () => {
  const [uploadStatus, setUploadStatus] = useState("")
  const [imageFile, setImageFile] = useState(null);
  const [images, setImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false)
  const [imageData, setImageData] = useState(null)
  const [name, setName] = useState("")
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
    }

  }
  const fetchImages = async () => {
    const res = await axios.get(`/api/images`)
    setImages(res.data.Images)
    console.log(res.data.Images)
  }
  useEffect(() => {
    fetchImages()
  }, [])
  const imageFileUpload = async () => {
    if (!imageFile) {
      setUploadStatus("Please select an image first.");
      return;
    }
    const data = new FormData()
    data.append("image", imageFile)
    try {
      const res = await axios.post(`/api/upload`, data);
      fetchImages();
      setUploadedImageUrl(res.data.imageUrl || res.data.url);
      setUploadStatus("Image uploaded sucessfully")
      console.log("uploaded image url:", res.data)
    } catch (error) {
      setUploadStatus(error || "Image declined !!")
      console.log("error saving images:", error)
    }
  }
  const updateForm = async (image) => {
    try {
      const res = await axios.put(`/api/images/${image._id}`, { name: name })
      console.log("update successful:", res.data)
      setIsOpen(false)
      fetchImages()
      setName("")
    } catch (error) {
      console.error("Error updating image:", error);
    }
  }
  const deleteImage = async (image) => {
    try {
      const res = await axios.delete(`/api/images/${image._id}`, { name: name })
      fetchImages()
      console.log(res.data.message)
    } catch (error) {
      console.error("Error updating image:", error);
    }
  }

  return (
    <>
      {/* Post image */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4">
        <div className="bg-white w-full max-w-3xl rounded-3xl shadow-xl p-10 flex flex-col items-center space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Upload Your Image</h2>
          <input
            type="file"
            accept=".png, .jpeg, .jpg, .bmp"
            name="image"
            onChange={handleImageChange}
            className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
          <button
            onClick={imageFileUpload}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:opacity-90 transition"
          >
            Upload
          </button>

          {uploadStatus && (
            <p className="text-sm text-gray-700 font-medium">{uploadStatus}</p>
          )}
        </div>
      </div>
      {/* get images */}
      <div className="min-h-screen   px-6 bg-blue-950 h-auto py-24 bg-gradient-to-b  mx-auto from-black/40 to-purple-800/35">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-white text-center ">Uploaded Images</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
            {images && images.map((image, idx) => (
              <div
                className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-4 transition-all duration-300 group hover:border-purple-500/50 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-purple-900/20 opacity-100 translate-y-0"
                key={idx}
              >
                <img
                  src={image.imageUrl}
                  alt={`Uploaded ${idx}`}
                  className="w-full h-74 object-cover rounded-t-xl"
                />
                <div className="p-4 text-center text-lg text-white font-semibold">
                  {image.name || 'No name provided'}
                </div>
                <div className="flex justify-between  ">
                  <button className='text-xl  bg-purple-500 py-2 px-4 text-white font-semibold rounded-lg hover:bg-purple-700  ' onClick={() => { setIsOpen(true); setImageData(image) }}>view</button>
                  <button className=" bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition" onClick={() => deleteImage(image)}>
                    delete
                  </button>
                </div>
              </div>

            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        contentLabel="Freelancer Details"
        onRequestClose={() => setIsOpen(false)}
        className="bg-gray-900/60 backdrop-blur-sm  w-[90vw] md:w-[80vw] lg:w-[60vw] max-h-[90vh] overflow-y-auto mx-auto mt-10 relative z-50 p-8 rounded-xl shadow-xl outline-none"
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center overflow-y-auto">
        {imageData && (
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Image Section */}
            <img
              src={imageData.imageUrl}
              alt="Uploaded"
              className="w-full md:w-[40%] h-[50vh] object-cover rounded-lg"
            />

            {/* Form Section (title, input, and button stacked vertically) */}
            <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-[55%] flex flex-col gap-4 absolute right-3 bottom-12">
              <h2 className="text-2xl font-semibold text-gray-800">
                {imageData.name || "Untitled Image"}
              </h2>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Edit image title..."
              />
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" onClick={() => updateForm(imageData)}>
                Update
              </button>
            </div>
          </div>
        )}

      </Modal>
    </>
  );

}

export default App
