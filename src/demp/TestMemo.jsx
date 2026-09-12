import { useState,useMemo } from "react";
import { memo } from "react";

const MovieCard = memo(function MovieCard({ movie }) {

    console.log("MovieCard rendered:", movie.title);

    return (
        <div>
            <h2>{movie.title}</h2>
        </div>
    );
});

function TestMemo() {

    const [count, setCount] = useState(0);

    const movie = useMemo(() => {
        console.log("Creating movie object");

        return {
            id: 1,
            title: `Spider-Man ${count}`
        };
    }, [count]);

    return (
        <div>

            <h1>Count: {count}</h1>

            <button onClick={() => setCount(count + 1)}>
                Increase
            </button>

            <MovieCard movie={movie} />

        </div>
    );
}

export default TestMemo;