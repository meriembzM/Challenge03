const deleteShortUrl = async (id) => {
    const url = `https://www.shorten-url-api.infobrains.club/api/private/urls/${id}`;
    const token = localStorage.getItem('token');
    if (!token) {
        alert("No token found. Please log in again.");
        window.location.href = "/index.html";
        return;
    }
    if (!confirm("Are you sure you want to delete this URL?")) return;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            }
        });
      
        if (response.status === 200) {
            alert('URL deleted successfully');
            document.getElementById(`url-${id}`).remove(); 
        } else if (response.status === 401) {
            alert('Unauthorized. Please log in again.');
            localStorage.removeItem('token');
            window.location.href = '/index.html';
        } else if (response.status === 404) {
            alert('URL not found.');
        } else if (response.status === 500) {
            alert('Internal server error.');
        } else {
            alert(`Unexpected error: ${response.status}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    }
};
