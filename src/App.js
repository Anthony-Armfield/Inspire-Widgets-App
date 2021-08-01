import React from 'react';
import './App.css';

class App extends React.Component {
    state = {
        quote: ''
    };

    componentDidMount() {
        this.setContext();
    }

    async fetchQuote() {
        let url = 'https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand';
        try {
            let response = await fetch(url);
            return await response.json();
        } catch(error) {
            console.log(error);
        }
    }

    async setContext() {
        let quotes = await this.fetchQuote();
        let quote = quotes[Math.floor(Math.random() * quotes.length)];
        let html = `<div class="quote"><h2>${quote.excerpt.rendered}</h2></div>`;
        let quoteContainer = document.querySelector('.quote');
        quoteContainer.innerHTML = html;
    }

    render() {
        return (
            <div class="container quote"></div>
        );
    }
}

export default App;