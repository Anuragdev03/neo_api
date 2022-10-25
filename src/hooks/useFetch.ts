import React, { useState, useEffect } from "react";

// Responsetype
export interface Responsetype {
    data: unknown;
    loading: boolean;
    error: string;
}

export default function useFetch(url: string): Responsetype {        
    const [data, setData] = useState<unknown>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        setLoading(true);
        const abortController = new AbortController();
        fetch(url, {signal: abortController.signal})
            .then(data => data.json())
            .then(data => {
                setData(() => data);
                setLoading(false);
            })
            .catch(err => {                
                setLoading(false);
                setError("An error occurred.")
            })

            return () => {
                abortController.abort();
            }
    }, [url])

    return {data, loading, error}

}