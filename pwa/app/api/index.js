import express from 'express';
const app = express();
const port = 3000;

app.get('/api/hello', (req, res) => {
  res.json({ ok: true, msg: 'Hello Bootcamp!' });
});

// Adicione aqui os endpoints que seu PWA precisará
app.get('/api/data', (req, res) => {
  // Lógica para buscar dados (ex: do IBGE, ou dados mocados)
  res.json({ data: [1, 2, 3] });
});

// Exemplo de endpoints úteis:
app.get('/api/hello', (req, res) => {
  res.json({ ok: true, msg: 'Teste de conectividade' });
});
app.get('/api/data', (req, res) => {
  res.json({ data: [1, 2, 3] });
});
app.post('/api/notes', (req, res) => {
  // Lógica para salvar notas
  res.json({ ok: true, msg: 'Nota salva com sucesso!' });
});
app.get('/api/health', (req, res) => {
  res.json({ ok: true, msg: 'API está saudável!' });
});

app.listen(port, () => console.log(`API rodando na porta ${port}`));
