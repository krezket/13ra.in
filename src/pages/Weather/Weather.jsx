import React from 'react';

export default function Weather() {

    return (
        <>
 <header>
        <h1 id="header">Crazy Cat Weather</h1>
    </header>

    <main id="main">
        <form id="search-form">
            <h4>Search for Cities</h4>
            <div class="search">
                <input id="search-input" class="text-input" type="text">
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
