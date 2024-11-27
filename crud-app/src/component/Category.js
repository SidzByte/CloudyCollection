import axios from 'axios';
import React, { useEffect, useState } from 'react';
import loader from "../assets/loader.gif";
import { useNavigate } from 'react-router-dom';

const Category = () => {
    const [categoryList, setCategoryList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState("");
    let navigate = useNavigate();

    const detailRoute = (id) => {
        navigate("/dashboard/detail/" + id);
    }

    const editRoute = (id) => {
        navigate("/dashboard/edit/" + id);
    }

    const deleteData = (id, imgLink) => {
        if (window.confirm("Are you sure?")) {
            axios.delete(`http://localhost:3000/category?id=${id}&imageUrl=${imgLink}`)
                .then(res => {
                    console.log(res);
                    window.alert("Data deleted");
                    getData();
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    const getData = () => {
        axios.get("http://localhost:3000/category", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => {
                setHasError(false);
                setLoading(false);
                console.log(res.data.category);
                setCategoryList(res.data.category);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                console.log(err.response.data.message);
                setHasError(true);
                setError(err.response.data.msg);
            });
    }

    useEffect(() => {
        setLoading(true);
        getData();
    }, []);

    return (
        <div className="container">
            {isLoading && (
                <div className="loader">
                    <img src={loader} alt="Loading..." />
                </div>
            )}

            {!isLoading && !hasError && (
                <div>
                    <h1>Collection List</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoryList.map(data => (
                                <Row key={data._id} detailReq={detailRoute} editReq={editRoute} deleteReq={deleteData} detail={data} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {hasError && (
                <div className="error-container">
                    <p className="error-message">
                        Error: {error}
                    </p>
                </div>
            )}
        </div>
    );
}

// Row component to render each category
const Row = (props) => {
    return (
        <tr>
            <td>{props.detail.name}</td>
            <td><img style={{ width: "150px" }} src={props.detail.photo} alt={props.detail.name}/></td>
            <td>
                <button onClick={() => props.detailReq(props.detail._id)}>Detail</button>
                <button onClick={() => props.editReq(props.detail._id)}>Edit</button>
                <button onClick={() => props.deleteReq(props.detail._id, props.detail.photo)}>Delete</button>
            </td>
        </tr>
    );
}

export default Category;
