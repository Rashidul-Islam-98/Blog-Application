import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
const baseURL = process.env.REACT_APP_BASE_URL;

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState(null);
  const [categories, setCategories] = useState([]);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categories,
      photo
    };

    if (categories) {
      try {
        await Promise.all(
          categories.map(async (category) => {
            let response = await axios.get(
              `${baseURL}/api/categories?name=${category}`
            );
            if (response.data === null) {
              await axios.post(`${baseURL}/api/categories`, {
                name: category
              });
            }
          })
        );
      } catch (err) {}
    }    

    try {
      const res = await axios.post(`${baseURL}/api/posts`, newPost);
      window.location.replace("/posts/" + res.data._id);
    } catch (err) { }
  };

  const handleImage = async (e) =>{
    const reader = new FileReader();

    reader.onload = () =>{
      if(reader.readyState===2){
        setPhoto(reader.result);
      }
    }

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="write">
      {photo && (
        <img className="writeImg" src={photo} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleImage}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="Category"
            className="writeInput"
            onChange={(e) => setCategories(e.target.value.split(','))}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
