document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('searchTerm').value;
    const searchResultsDiv = document.getElementById('searchResults');
    const videoPreviewDiv = document.getElementById('videoPreview');

    if (!searchTerm) {
        searchResultsDiv.innerText = 'Por favor, ingresa un término de búsqueda válido.';
        return;
    }

    searchResultsDiv.innerText = 'Buscando...';

    // Limpia el contenido anterior
    videoPreviewDiv.innerHTML = '';

    // Llama a la API para obtener la información del video
    fetch(`https://api.vevioz.com/apis/search/${encodeURIComponent(searchTerm)}`)
        .then(response => response.json())
        .then(data => {
            // Extrae la información del primer video encontrado (asumiendo que devuelve una lista de videos)
            const video = data[0]; // Aquí debes ajustar según la estructura de la respuesta de tu API

            // Crea un iframe para mostrar el preview del video
            const iframe = document.createElement('iframe');
            iframe.width = '560';
            iframe.height = '315';
            iframe.src = `https://www.youtube.com/embed/${video.id}`; // URL del video de YouTube
            iframe.title = video.title; // Título del video para accesibilidad
            iframe.allowFullscreen = true; // Permite el modo pantalla completa

            // Agrega el iframe al contenedor del preview
            videoPreviewDiv.appendChild(iframe);
        })
        .catch(error => {
            console.error('Error al buscar el video:', error);
            searchResultsDiv.innerText = 'Error al buscar el video. Por favor, inténtalo de nuevo más tarde.';
        });
});
function submitForm() {
            var searchTerm = document.getElementById('searchTerm').value.trim();
            var iframe = document.getElementById('searchApi');
            iframe.src = "https://api.vevioz.com/apis/search/" + encodeURIComponent(searchTerm);

            return false; // Prevent form submission
        }

        // Automatically resize the iframe
        iFrameResize({ log: false }, '#searchApi');