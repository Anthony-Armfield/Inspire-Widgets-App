import React from 'react';
import './styles.css';

class Quote extends React.Component {
    state = {
        quote: ''
    };

    componentDidMount() {
        this.getSingleQuote();
    }

    async fetchQuotes() {
        let url = 'https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand';
        try {
            let response = await fetch(url);
            return await response.json();
        } catch(error) {
            console.log(error);
        }
    }

    async getSingleQuote() {;
        let quotes = await this.fetchQuotes();
        let singleQuote = quotes[Math.floor(Math.random() * quotes.length)];
        let html = `<figure id="quote">
                        <blockquote>
                            ${singleQuote.excerpt.rendered}
                        </blockquote>
                        <figcaption class="author">
                        - ${singleQuote.title.rendered}
                        </figcaption>
                    </figure>`;
        let quoteContainer = document.querySelector('.quote');
        quoteContainer.innerHTML = html;
    }

    render() {
        return (
            <div className="quote"></div>
        );
    }
}

export default Quote;