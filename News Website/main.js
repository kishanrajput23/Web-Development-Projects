/**
 * REPLACED: XMLHttpRequest (XHR) with Fetch API + Async/Await
 * PREVIOUS: XHR was clunky, used callbacks, and made the code "flat" and harder to read.
 * BETTER: Fetch is modern, returns Promises, and async/await makes asynchronous code look synchronous.
 */

// Note: Ensure these variables are defined globally or at the top of your file
const newsAccordion = document.getElementById('accordian');
const country = 'in';
const apiKey = 'b598648722f84619b927f4e38f64aed3';

async function fetchNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;

    try {
        /**
         * BETTER: User Experience (UX)
         * PREVIOUS: The screen stayed blank until the data arrived.
         * IMPROVEMENT: We show a "Loading..." spinner so the user knows something is happening.
         */
        newsAccordion.innerHTML = `<div class="spinner-border text-primary" role="status"></div> <p>Loading news...</p>`;

        const response = await fetch(url);

        /**
         * BETTER: Robust Error Checking
         * PREVIOUS: If the API was down or the key was wrong, the code might have crashed silently.
         * IMPROVEMENT: We explicitly check if the response status is 200-299.
         */
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const articles = data.articles;

        // Render the articles
        renderNews(articles);

    } catch (error) {
        console.error("Could not fetch news:", error);
        newsAccordion.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Failed to load news. Please try again later. Error: ${error.message}
            </div>`;
    }
}

/**
 * BETTER: Separation of Concerns
*/
function renderNews(articles) {
    let newsHtml = "";

    articles.forEach((element, index) => {
        /**
         * PREVIOUS: If description or image was missing, it might show "undefined" or a broken image icon.
         */
        let description = element.description ? element.description : "No description available for this article.";
        let imageHtml = element.urlToImage 
            ? `<img src="${element.urlToImage}" class="img-fluid mt-3 rounded" alt="news-image">` 
            : "";

        // IMPROVED UI: Added numbers (index + 1) and better Bootstrap button styling
        let news = `
            <div class="mb-3">
                <button class="btn btn-primary w-100 text-start shadow-sm" type="button" data-bs-toggle="collapse" 
                    data-bs-target="#collapse${index}" aria-expanded="false">
                    <strong>${index + 1}:</strong> ${element.title}
                </button>
                <div class="collapse mt-2" id="collapse${index}">
                    <div class="card card-body border-primary">
                        <p class="card-text">${description}</p>
                        <a href="${element.url}" target="_blank" class="btn btn-sm btn-outline-primary w-25">Read Full Article</a>
                        ${imageHtml}
                    </div>
                </div>
            </div>`;
        newsHtml += news;
    });

    // IMPROVEMENT: Handles cases where the API returns 0 articles.
    newsAccordion.innerHTML = newsHtml || "<p>No news articles found.</p>";
}

fetchNews();