import React, { useState, useEffect } from "react";
import axios from "axios";
import imageLogo from "../assets/imageLogo.jpg";
import loader from "../assets/loader.gif";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCategory = () => {
  const { id } = useParams();
  const [category, setCategory] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(imageLogo);
  const [isLoading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");

  let navigate = useNavigate();
  let params = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3000/category/`+params.id)
      .then(res => {
        const categoryData = res.data.category; // Adjust key based on backend response
        setCategory(categoryData.name);
        setImageUrl(categoryData.photo);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setHasError(true);
        setError(err.message);
      });
  }, [id]);

  const fileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!category.trim()) {
      setError("Category name cannot be empty.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", category);
    if (selectedFile) formData.append("photo", selectedFile);

    axios.put(`http://localhost:3000/category/`+params.id, formData)
      .then((res) => {
        setLoading(false);
        setHasError(false);
        navigate("/dashboard/category");
      })
      .catch((err) => {
        setLoading(false);
        setHasError(true);
        setError(err.message);
      });
  };

  return (
    <>
      <h1>Edit Category</h1>
      {isLoading && <img style={{ width: "150px" }} src={loader} alt="Loading..." />}
      
      {!isLoading && (
        <div>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Category Name"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <br />
            <input type="file" accept="image/*" onChange={fileHandler} />
            <br />
            <img
              style={{ width: "150px" }}
              src={imageUrl || imageLogo}
              alt="Preview"
            />
            <br />
            <button type="submit">Update Category</button>
          </form>
        </div>
      )}

      {hasError && <p style={{ color: "red" }}>Error: {error}</p>}
    </>
  );
};

export default UpdateCategory;
