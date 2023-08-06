import { useState, useEffect } from "react";

export function useFetch() {
    const [data, setData] = useState({});
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        setLoading(true)
        async function fetchData() {
            try {
                const response = await fetch('/data/recipes.json')
                const data = await response.json()
                data?.recipes.sort((a, b) => {
                    return new Date(b.created_at) - new Date(a.created_at)
                })

                setData(data)

            } catch (err) {
                console.log(err)
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return { isLoading, error, data }
}