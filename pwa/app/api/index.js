import express from 'express';
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// ===== CORS para o PWA =====
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  next();
});

// ===== ENDPOINTS =====

/**
 * GET /api/hello - Teste de conectividade
 */
app.get('/api/hello', (req, res) => {
  res.json({ 
    ok: true, 
    msg: 'Hello Bootcamp!',
    timestamp: new Date().toISOString()
  });
});

/**
 * GET /api/data - Dados mock
 */
app.get('/api/data', (req, res) => {
  res.json({ 
    data: [1, 2, 3],
    message: 'Mock data'
  });
});

/**
 * GET /api/pokemon/:name - Busca Pokémon via PokéAPI
 */
app.get('/api/pokemon/:name', async (req, res) => {
  try {
    const { name } = req.params;
    
    // Validar input
    if (!name || name.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Pokemon name is required' 
      });
    }

    // Buscar da PokéAPI
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    );

    if (!response.ok) {
      return res.status(404).json({ 
        error: `Pokemon '${name}' not found` 
      });
    }

    const data = await response.json();

    // Retornar dados úteis
    res.json({
      ok: true,
      name: data.name,
      id: data.id,
      height: data.height,
      weight: data.weight,
      types: data.types.map(t => t.type.name),
      image: data.sprites.front_default,
      abilities: data.abilities.map(a => a.ability.name)
    });

  } catch (err) {
    console.error('Erro ao buscar Pokémon:', err);
    res.status(500).json({ 
      error: 'Failed to fetch Pokemon data',
      details: err.message
    });
  }
});

/**
 * GET /api/pokemon/random - Pokémon aleatório
 */
app.get('/api/pokemon/random/random', async (req, res) => {
  try {
    const randomId = Math.floor(Math.random() * 898) + 1; // 898 Pokémon
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const data = await response.json();

    res.json({
      ok: true,
      name: data.name,
      id: data.id,
      image: data.sprites.front_default,
      types: data.types.map(t => t.type.name)
    });

  } catch (err) {
    console.error('Erro ao buscar Pokémon aleatório:', err);
    res.status(500).json({ 
      error: 'Failed to fetch random Pokemon' 
    });
  }
});

/**
 * GET /api/health - Health check
 */
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    service: 'Bootcamp API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// ===== 404 Handler =====
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not found',
    path: req.path,
    method: req.method
  });
});

// ===== ERROR Handler =====
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message
  });
});

// ===== START Server =====
app.listen(port, () => {
  console.log(`🚀 API rodando em http://localhost:${port}`);
  console.log(`📚 Endpoints disponíveis:`);
  console.log(`   GET  /api/hello - Teste de conectividade`);
  console.log(`   GET  /api/data - Dados mock`);
  console.log(`   GET  /api/health - Health check`);
  console.log(`   GET  /api/pokemon/:name - Busca Pokémon`);
  console.log(`   GET  /api/pokemon/random/random - Pokémon aleatório`);
});
