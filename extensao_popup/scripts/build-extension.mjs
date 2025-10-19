import fs from 'node:fs';
import path from 'node:path';
import archiver from 'archiver';

const dist = 'dist';
// Limpa e recria a pasta dist
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist);

// Copia arquivos essenciais (manifest.json, src, icons)
for (const f of ['manifest.json']) fs.copyFileSync(f, path.join(dist, f));
fs.cpSync('src', path.join(dist, 'src'), { recursive: true });

fs.cpSync('src/icons', path.join(dist, 'icons'), { recursive: true });

// Gera ZIP
const output = fs.createWriteStream(path.join(dist, 'extension.zip'));
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
    console.log(`Build concluído em dist/ e dist/extension.zip`);
    console.log(`Total de bytes: ${archive.pointer}`);
});

archive.on('warning', (err) => {
    if (err.code !== 'ENOENT') {
        throw err;
    }
});

archive.on('error', (err) => {
    throw err;
});

// Adiciona o conteúdo da pasta dist/ (sem incluir a própria pasta 'dist' dentro do zip)
archive.directory(dist, false); 
archive.pipe(output);

await archive.finalize();