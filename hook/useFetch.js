import { useState, useEffect } from "react";
import axios from "axios";
import { RAPID_API_KEY } from "@env";

const apikey = RAPID_API_KEY;

const useFetch = (url, query) => {
    const [response, setResponse] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": apikey,
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
        url: `https://jsearch.p.rapidapi.com/${url}`,
        params: { ...query },
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const res = await axios.request(options);
            setResponse(res.data.data);
        } catch (error) {
            setError(error);
            alert("There is an error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            fetchData();
        }, 1000);
    }, []);

    // const refetch = () => {
    //     setIsLoading(true);
    //     setTimeout(() => {
    //         fetchData();
    //     }, 1000);
    // };

    return { response, isLoading, error };
};

export default useFetch;
