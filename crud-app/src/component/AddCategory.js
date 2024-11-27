import axios from 'axios';
import React, { useState } from 'react';
import imageLogo from "../assets/imageLogo.jpg"
import loader from "../assets/loader.gif"
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {

    const [category, setCategory] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(imageLogo);
    const [isLoading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState("");

    let navigate = useNavigate();

    const fileHandler = (e) => {
        setSelectedFile(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    }

    const submitHandler = (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("name", category);
        formData.append("photo", selectedFile);

        axios.post("http://localhost:3000/category", formData,{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => {
                console.log(res);
                setLoading(false);
                navigate("/dashboard/category");
            })
            .catch(err => {
                console.log(err.message);
                setLoading(false);
                setHasError(true);
                setError(err.message);
                
            })

    }

    return (
        <>
            {isLoading && <div>
                <img style={{ width: "150px" }} src={loader} />
            </div>}

            {!isLoading && <div>
                <h1>Add New Collection Item</h1>
                <form onSubmit={submitHandler}>
                    <input onChange={(e) => { setCategory(e.target.value) }} type="text" />
                    <input onChange={(e) => { fileHandler(e) }} type="file" />
                    <button type="submit">Add</button>
                    <br />
                    <img style={{ width: "120px" }} src={imageUrl} />
                </form>

                {hasError && <div>
                    <p style={{color : "red"}}>
                        Error : {error}
                    </p>
                </div>}
            </div>}

        </>
    )
}

export default AddCategory