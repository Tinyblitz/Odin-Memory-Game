import { useEffect, useState } from "react";
import '../styles/Cards.css'

let compList = [];

export default function Cards( {addScore, resetScore} ) {

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const changeList = () => {
        // Fisher-Yates shuffle
        function shuffleArray(array) {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                // Swap elements
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        }
        setList(prev => [...shuffleArray(prev)]);
    };

    const handleCardClick = (id) => {

        changeList();
        if (compList.includes(id)) {
            resetScore();
            compList = [];
        }
        else {
            addScore();
            compList.push(id);
        }
    }

    useEffect(() => {

        const pokemon = [
            'pikachu',
            'eevee',
            'squirtle',
            'charmander',
            'bulbasaur',
            'meowth',
            'jigglypuff',
            'psyduck',
            'mew',
            'manaphy',
            'jirachi',
            'celebi'
        ]

        async function fetchAllData() {
            try {
                setLoading(true);
                setError(null);

                // Fetch all URLs in parallel and resolve into a single array
                const allResults = await Promise.all(
                    pokemon.map(async (poke) => {
                        const url = `https://pokeapi.co/api/v2/pokemon/${poke}`;
                        const response = await fetch(url);
                        if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                );

                // Save the array directly to state
                setList(
                    allResults.map((data) => ({
                        id: data.id,
                        name: data.name,
                        image: data.sprites?.other?.["official-artwork"]?.front_default,
                    }))
                );
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
                changeList();
            }
        }

        fetchAllData();
    }, []); // Empty dependency array runs this once on mount

    if (loading) return <p>Loading Pokemon...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="cards">
            {list.map(data => {
                return (
                    <>
                        <img 
                            className="card" 
                            key={data.id} 
                            src={data.image} 
                            alt={data.name}
                            title={data.name}
                            onClick={() => handleCardClick(data.id)}
                        />
                    </>
                )
            })}
        </div>
    )
}