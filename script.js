document.addEventListener('DOMContentLoaded', () => {
    const booksSection = document.getElementById('books-section');
    const loadingMessage = document.getElementById('loading');
    const errorMessage = document.getElementById('error-message');

    // caminho da api
    const API_URL = './livros.json'; 

    async function fetchBooks() {
        try {
            loadingMessage.classList.remove('hidden'); // Mostra a mensagem de carregamento
            errorMessage.classList.add('hidden'); // Esconde a mensagem de erro, caso esteja visível

            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const books = await response.json();
            displayBooks(books);
        } catch (error) {
            console.error('Erro ao buscar os livros:', error);
            loadingMessage.classList.add('hidden'); // Esconde a mensagem de carregamento
            errorMessage.classList.remove('hidden'); // Mostra a mensagem de erro
            booksSection.innerHTML = ''; // Limpa qualquer conteúdo existente para mostrar apenas o erro
        } finally {
            loadingMessage.classList.add('hidden'); // Esconde a mensagem de carregamento ao final
        }
    }

    function displayBooks(books) {
        booksSection.innerHTML = ''; // Limpa o conteúdo existente antes de adicionar os novos cards

        books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-6 text-center transform hover:scale-102 hover:shadow-xl transition-all duration-300 ease-in-out';

            // Imagem do Livro
            const bookImage = document.createElement('img');
            bookImage.src = book.imagem;
            bookImage.alt = `Capa do livro ${book.titulo}`;
            bookImage.className = 'w-48 h-auto object-cover rounded-md mb-4 shadow-md'; // Ajuste o tamanho conforme necessário

            // Título do Livro
            const bookTitle = document.createElement('h2');
            bookTitle.className = 'text-xl font-semibold text-gray-800 mb-2';
            bookTitle.textContent = book.titulo;

            // Resumo do Livro
            const bookSummary = document.createElement('p');
            bookSummary.className = 'text-gray-600 text-sm mb-4 flex-grow'; // flex-grow para que ocupe o espaço disponível
            bookSummary.textContent = book.resumo || 'Nenhum resumo disponível.';

            bookCard.appendChild(bookImage);
            bookCard.appendChild(bookTitle);
            bookCard.appendChild(bookSummary);
            
            booksSection.appendChild(bookCard);
        });
    }

    // Carrega os livros quando a página é carregada
    fetchBooks();
});