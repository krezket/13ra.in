import React, { useEffect, useState } from 'react';

export default function Weather() {
    const [search, setSearch] = useState('');

    const handleChange = e => {
        if (e.target.name === "text") {
            setSearch(e.target.value)
        }
    }
    const handleSubmit = () => {
    :q

    }
    useEffect(() => {

    },[])

    return (
        <>
            <header>
                <h1 id="header">Crazy Cat Weather</h1>
            </header>

            <main id="main">
                <form id="search-form" onSubmit={handleSubmit}>
                    <h4>Search for Cities</h4>
                    <div className="search">
                        <input id="search-input" className="text-input" name="text" onChange={handleChange}/>
                        <button>Search</button>
                    </div>
                </form>

            </main>
            <section>
                <button id="secret">Press Here</button>
                <div id="cat"></div>
            </section>
        </>
    )
}
