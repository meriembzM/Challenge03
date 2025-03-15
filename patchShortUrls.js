const shortenUrlLists = document.getElementById('shorten-list');
const patchShortUrl = async (id, updatedData) => {
    const url = `https://www.shorten-url-api.infobrains.club/api/private/urls/${id}`;
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedData)
        });
        const jsonResponse = await response.json();
        if (response.ok) {
            alert('URL updated successfully');
            console.log("Updated Data:", jsonResponse);
            data.forEach((shortUrl) => {
                const li = document.createElement('li');
                li.innerHTML = `
                <div class="shorten-url">
                    <div class="shorten-url__original-url">
                        <p><strong>Original:</strong> ${shortUrl.originalUrl}</p>
                    </div>
                    <div class="shorten-url__short-url">
                        <p><strong>Shortened:</strong> 
                            <a href="${shortUrl.shortUrl}" target="_blank" rel="noopener noreferrer">
                                ${shortUrl.shortUrl}
                            </a>
                        </p>
                    </div>
                    <div class="shorten-url__clicks">
                        <p><strong>Clicks:</strong> ${shortUrl.clicks}</p>
                    </div>
                    <div class="shorten-url__created-at">
                        <p><strong>Created At:</strong> ${new Date(shortUrl.createdAt).toLocaleString()}</p>
                    </div>
                    <div class="shorten-url__updated-at">
                        <p><strong>Updated At:</strong> ${new Date(shortUrl.updatedAt).toLocaleString()}</p>
                    </div>
                </div>
                `;
                shortenUrlLists.appendChild(li);
            });
        } else if (response.status === 400) {
            alert('Validation error');
        } else if (response.status === 401) {
            alert('Unauthorized');
        } else if (response.status === 404) {
            alert('URL not found');
        } else if (response.status === 500) {
            alert('Internal server error');
        } else {
            alert(`Unexpected error: ${response.status}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    }
};

