import {useCallback, useState} from "react";
export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const request = useCallback(async (
            url,
            method = "GET",
            body = null,
            headers= {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTAzMzg1ZmQ5YzQxMWYxZGJmNzM5M2FhNGFiYTZkNiIsInN1YiI6IjY1ZThiMGMwOTYzODY0MDE0NmM4NDYwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnWH9dvNYILPto9IQnwrW7mEBtiwPloHN6mLizKVsRE'
            }
        ) => {
            setLoading(true)

            try {
                const response = await fetch(url, {method, body, headers})
                if (!response.ok) {
                    throw new Error(`Could not fetch ${url}, status: ${response.status}`)
                }

                const data = await response.json()
                setLoading(false)
                return data
            } catch (error) {
                setLoading(false)
                setError(error.message)
                throw error
            }
        }, []
    )
    const clearError = useCallback(() => setError(null), [])
    return {loading, error, request, clearError}
}

// Todo: headers ni ichidagi larni shu yerga yozib qoyaman
/*
headers: {
    accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTAzMzg1ZmQ5YzQxMWYxZGJmNzM5M2FhNGFiYTZkNiIsInN1YiI6IjY1ZThiMGMwOTYzODY0MDE0NmM4NDYwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnWH9dvNYILPto9IQnwrW7mEBtiwPloHN6mLizKVsRE'
}*/
