// PWA Install Handler para página de docs
document.addEventListener('DOMContentLoaded', () => {
    const btnInstall = document.getElementById('btn-install-pwa');
    let deferredPrompt;

    if (!btnInstall) return;

    // Evento disparado quando o navegador detecta que o PWA pode ser instalado
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        btnInstall.textContent = '⬇️ Instalar App';
        btnInstall.style.opacity = '1';
    });

    // Click do botão
    btnInstall.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`Instalação: ${outcome}`);
            if (outcome === 'accepted') {
                btnInstall.textContent = '✅ Instalado!';
                btnInstall.disabled = true;
            }
            deferredPrompt = null;
        } else {
            // Se não há prompt disponível, mostra instruções
            alert('Para instalar o app PWA de notas:\n\n' +
                  '🖥️ Desktop: Clique no ícone ⊕ na barra de endereços\n' +
                  '📱 Mobile: Abra o menu do navegador e selecione "Instalar app"\n\n' +
                  'Link do PWA:\n' +
                  'https://mtechdevelopment.github.io/bootcamp2-chrome-ext-MTECHDevelopment/');
        }
    });

    // Evento disparado quando o app é instalado
    window.addEventListener('appinstalled', () => {
        console.log('PWA foi instalado com sucesso!');
        btnInstall.textContent = '✅ Instalado!';
        btnInstall.disabled = true;
        deferredPrompt = null;
    });
});
