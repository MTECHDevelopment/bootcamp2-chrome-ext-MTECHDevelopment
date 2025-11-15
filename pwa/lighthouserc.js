module.exports = {
  ci: {
    collect: {
      // URL do PWA (serviço 'web' na porta '80' interna do Docker)
      url: ['http://web:80']
    },
    upload: {
      target: 'filesystem', // Salva o relatório em arquivos (JSON/HTML)
      outputDir: './.lighthouseci', // A pasta que o erro está procurando!
    },
  },
};