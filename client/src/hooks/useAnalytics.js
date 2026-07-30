import { useEffect, useState } from "react";

function useAnalytics(fetchFunction) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = async () => {

            try {

                const result = await fetchFunction();
                setData(result);

            } catch (err) {

                console.error(err);
                setError(err);

            } finally {

                setLoading(false);

            }

        };

        fetchData();

    }, [fetchFunction]);

    return {
        data,
        loading,
        error
    };

}

export default useAnalytics;