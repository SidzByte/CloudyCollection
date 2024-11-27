import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Detail = () => {
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const { id } = useParams();

    console.log("Route Params ID:", id); // Debugging: Check if the ID is passed correctly.

    useEffect(() => {
        axios.get(`http://localhost:3000/category/${id}`) // Corrected API call
            .then((res) => {
                console.log("API Response:", res.data);
                setCategory(res.data.category);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching category details:", err);
                setHasError(true);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (hasError) return <p>Error fetching details. Please try again later.</p>;

    return (
        <div>
            <p>Detail Page</p>
            {category && (
                <>
                    <img style={{ width: "250px" }} src={category.photo} alt={category.name} />
                    <h1>{category.name}</h1>
                </>
            )}
        </div>
    );
};

export default Detail;
