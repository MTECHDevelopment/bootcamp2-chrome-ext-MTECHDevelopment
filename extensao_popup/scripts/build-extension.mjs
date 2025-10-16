import fs from 'node:fs';
import path from 'node:path';
import archiver from 'archiver';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const dist = path.join(rootDir, 'dist');

console.log('🏗️  Iniciando build da extensão...');

// Remove e recria o diretório dist
if (fs.existsSync(dist)) {
  console.log('🗑️  Removendo dist/ anterior...');
  fs.rmSync(dist, { recursive: true, force: true });
}
fs.mkdirSync(dist);

// Copia arquivos essenciais
console.log('📦 Copiando arquivos...');
const filesToCopy = ['manifest.json'];
for (const f of filesToCopy) {
  const source = path.join(rootDir, f);
  const target = path.join(dist, f);
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, target);
    console.log(`  ✓ ${f}`);
  } else {
    console.warn(`  ⚠️  Arquivo não encontrado: ${f}`);
  }
}

// Copia diretórios
const dirsToCopy = ['src'];
for (const dir of dirsToCopy) {
  const source = path.join(rootDir, dir);
  const target = path.join(dist, dir);
  if (fs.existsSync(source)) {
    fs.cpSync(source, target, { recursive: true });
    console.log(`  ✓ ${dir}/`);
  } else {
    console.warn(`  ⚠️  Diretório não encontrado: ${dir}/`);
  }
}

// Gera ZIP
console.log('📦 Gerando extension.zip...');
const output = fs.createWriteStream(path.join(dist, 'extension.zip'));
const archive = archiver('zip', { zlib: { level: 9 } });

archive.on('warning', (err) => {
  if (err.code === 'ENOENT') {
    console.warn('⚠️  ', err);
  } else {
    throw err;
  }
});

archive.on('error', (err) => {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Adiciona todos os arquivos do dist (exceto o próprio zip)
archive.glob('**/*', {
  cwd: dist,
  ignore: ['extension.zip']
});

await archive.finalize();

await new Promise((resolve) => output.on('close', resolve));

console.log('✅ Build concluído!');
console.log(`📊 Total: ${archive.pointer()} bytes`);
console.log(`📁 Localização: dist/`);
console.log(`📦 Pacote: dist/extension.zip`);
