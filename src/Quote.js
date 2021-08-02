import React from 'react';

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

    changeQuote() {
        this.setState({ quote: this.getSingleQuote()});
    }

    async getSingleQuote() {;
        let quotes = await this.fetchQuotes();
        let singleQuote = quotes[Math.floor(Math.random() * quotes.length)];
        let excerptHTML = `${singleQuote.excerpt.rendered}`
        let authorHTML = `- ${singleQuote.title.rendered}`;
        let excerptContainer = document.querySelector('#excerpt');
        let authorContainer = document.querySelector('#author');
        excerptContainer.innerHTML = excerptHTML;
        authorContainer.innerHTML = authorHTML;
    }

    render() {
        return (
            <div className="quote">
                <figure className="text-center" id="quote">
                    <blockquote id="excerpt" className="blockquote row">
                    </blockquote>
                    <div className="row author">
                        <div className="col">
                            <figcaption id="author">
                            </figcaption>
                        </div>
                        <div className="col">
                            <button class="btn btn-primary" onClick={() => this.changeQuote()}>Change Quote</button>
                        </div>
                    </div>
                </figure>
            </div>
        );
    }
}

export default Quote;