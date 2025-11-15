// Aguarda o DOM estar pronto
document.addEventListener('DOMContentLoaded', () => {

    // --- Seletores de Elementos ---
    const noteList = document.getElementById('note-list');
    const noteEditor = document.getElementById('note-editor');
    const btnNewNote = document.getElementById('btn-new-note');
    const btnDeleteNote = document.getElementById('btn-delete-note');
    const btnDownload = document.getElementById('btn-download');
    const colorPicker = document.getElementById('color-picker');
    
    // Seletores de Stats
    const statWords = document.getElementById('stat-words');
    const statLinks = document.getElementById('stat-links');
    const statImages = document.getElementById('stat-images');
    const statCharacters = document.getElementById('stat-characters');
    const statSelectedCharacters = document.getElementById('stat-selected-characters');

    // --- Estado da Aplicação ---
    let notes = [];
    let currentNoteId = null;

    // Lógica de URL para funcionar no Docker E no GitHub Pages
    let apiUrl = 'http://localhost:3000/api'; // Padrão

    // Se estiver rodando no GitHub Pages, use uma API pública
    if (window.location.hostname.includes('github.io')) {
        apiUrl = 'https://pokeapi.co/api/v2/pokemon/ditto'; 
    }

fetch(apiUrl)
  .then(res => res.json())
  .then(data => console.log('Dados da API:', data));

    // --- Funções ---

    /**
     * Carrega as notas do localStorage e a cor da borda
     */
    function loadAppState() {
        // Carrega notas
        const savedNotes = localStorage.getItem('pwa-notes');
        notes = savedNotes ? JSON.parse(savedNotes) : [];

        // Carrega cor da borda
        const savedColor = localStorage.getItem('pwa-border-color') || '#6366f1';
        colorPicker.value = savedColor;
        applyBorderColor(savedColor);

        renderNoteList();

        // Se houver notas, seleciona a primeira
        if (notes.length > 0) {
            selectNote(notes[0].id);
        } else {
            // Se não houver notas, limpa o editor
            clearEditor();
        }
    }

    /**
     * Salva o array de notas no localStorage
     */
    function saveNotes() {
        localStorage.setItem('pwa-notes', JSON.stringify(notes));
    }

    /**
     * Atualiza a lista de notas na barra lateral
     */
    function renderNoteList() {
        noteList.innerHTML = ''; // Limpa a lista

        if (notes.length === 0) {
            noteList.innerHTML = '<li class="placeholder">Crie sua primeira nota!</li>';
            return;
        }

        notes.forEach(note => {
            const li = document.createElement('li');
            li.textContent = note.content.split('\n')[0] || 'Nova Nota...'; // Mostra a primeira linha
            li.dataset.id = note.id; // Armazena o ID no elemento

            if (note.id === currentNoteId) {
                li.classList.add('active');
            }

            // Adiciona evento de clique para selecionar a nota
            li.addEventListener('click', () => {
                selectNote(note.id);
            });

            noteList.appendChild(li);
        });
    }

    /**
     * Seleciona uma nota para edição
     */
    function selectNote(id) {
        // Salva a nota anterior antes de mudar
        saveCurrentNote(false); // Salva sem redesenhar a lista

        currentNoteId = id;
        const note = notes.find(n => n.id === id);

        if (note) {
            noteEditor.value = note.content;
            noteEditor.disabled = false;
        }
        
        updateAllStats();
        renderNoteList(); // Redesenha a lista para marcar o item ativo
    }

    /**
     * Limpa e desativa o editor
     */
    function clearEditor() {
        noteEditor.value = '';
        noteEditor.disabled = true;
        currentNoteId = null;
        updateAllStats();
    }

    /**
     * Cria uma nova nota
     */
    function createNewNote() {
        // Salva a nota atual antes de criar uma nova
        saveCurrentNote(false);

        const newNote = {
            id: Date.now(), // ID simples baseado no timestamp
            content: ''
        };
        
        notes.unshift(newNote); // Adiciona no início do array
        saveNotes();
        
        currentNoteId = newNote.id;
        selectNote(newNote.id);
    }

    /**
     * Salva o conteúdo do editor na nota atual
     */
    function saveCurrentNote(redrawList = true) {
        if (!currentNoteId) return; // Nenhuma nota selecionada

        const note = notes.find(n => n.id === currentNoteId);
        if (note && note.content !== noteEditor.value) {
            note.content = noteEditor.value;
            saveNotes();
            
            if (redrawList) {
                renderNoteList(); // Atualiza o título na lista se a primeira linha mudou
            }
        }
    }

    /**
     * Exclui a nota atualmente selecionada
     */
    function deleteCurrentNote() {
        if (!currentNoteId) return;

        if (confirm('Tem certeza que deseja excluir esta nota?')) {
            notes = notes.filter(n => n.id !== currentNoteId);
            saveNotes();
            
            // Seleciona a próxima nota ou limpa o editor
            if (notes.length > 0) {
                selectNote(notes[0].id);
            } else {
                clearEditor();
                renderNoteList(); // Limpa a lista
            }
        }
    }

    /**
     * Atualiza as estatísticas da nota (palavras, links, imagens)
     */
    function updateAllStats() {
        const text = noteEditor.value;

        // Contar Palavras
        const words = text.trim().split(/\s+/).filter(Boolean).length;
        statWords.textContent = words;

        // Contar Caracteres
        const characters = text.length;
        statCharacters.textContent = characters;

        // Contar caracteres do texto selecionado
        const selectedText = noteEditor.value.substring(noteEditor.selectionStart, noteEditor.selectionEnd);
        const selectedCharacters = selectedText.length;
        statSelectedCharacters.textContent = selectedCharacters;

        // Contar Links (regex simples para URLs)
        const links = (text.match(/https?:\/\/[^\s]+/gi) || []).length;
        statLinks.textContent = links;

        // Contar Imagens (regex para markdown de imagem ou tags <img>)
        const images = (text.match(/!\[.*?\]\(.*?\)|<img.*?>/gi) || []).length;
        statImages.textContent = images;
    }

    /**
     * Aplica a cor selecionada à borda do editor
     */
    function applyBorderColor(color) {
        // Define a variável CSS --editor-border-color
        document.documentElement.style.setProperty('--editor-border-color', color);
        // Salva a preferência
        localStorage.setItem('pwa-border-color', color);
    }

    /**
     * Faz o download da nota atual como um arquivo .txt
     */
    function downloadNoteAsTxt() {
        if (!currentNoteId) return;
        
        const note = notes.find(n => n.id === currentNoteId);
        if (!note) return;

        const text = note.content;
        const filename = (text.split('\n')[0].substring(0, 20) || 'nota').replace(/[^a-z0-9]/gi, '_') + '.txt';
        
        const dataUrl = 'data:text/plain;charset=utf-8,' + encodeURIComponent("\uFEFF" + text);
        
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    // --- Registro do Service Worker (para PWA) ---
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('service-worker.js')
                .then(reg => console.log('Service Worker registrado!', reg))
                .catch(err => console.error('Erro ao registrar Service Worker:', err));
        });
    }

    // --- Event Listeners ---
    btnNewNote.addEventListener('click', createNewNote);
    btnDeleteNote.addEventListener('click', deleteCurrentNote);
    btnDownload.addEventListener('click', downloadNoteAsTxt);

    // Salva automaticamente ao parar de digitar (com um delay)
    let saveTimeout;
    noteEditor.addEventListener('input', () => {
        updateAllStats();
        
        // Debounce: espera 1 segundo após o usuário parar de digitar para salvar
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            saveCurrentNote();
        }, 1000);
    });

    // Atualiza a cor da borda instantaneamente
    colorPicker.addEventListener('input', (e) => {
        applyBorderColor(e.target.value);
    });
    document.addEventListener('selectionchange', () => {
        // Roda a função de stats apenas se o foco estiver no editor
        // Isso evita rodar a função desnecessariamente
        if (document.activeElement === noteEditor) {
            updateAllStats();
        }
    });
    // --- Inicialização ---
    loadAppState();
});