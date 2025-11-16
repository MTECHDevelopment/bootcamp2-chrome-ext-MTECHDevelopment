# 🎬 Roteiro para Vídeo/GIF do PWA
**Duração máxima:** 3 minutos

---

## 🎯 Objetivo
Demonstrar a instalação do PWA e o fluxo principal de uso da aplicação de notas.

---

## 📋 Checklist Antes de Gravar

- [ ] Limpar histórico do navegador (para mostrar instalação limpa)
- [ ] Abrir navegador em modo anônimo/privado
- [ ] Preparar ferramenta de gravação (OBS Studio, ScreenToGif, QuickTime, etc.)
- [ ] Testar áudio se for incluir narração
- [ ] Configurar resolução: 1920x1080 ou 1280x720

---

## 🎬 ROTEIRO DETALHADO

### **[0:00 - 0:20] INTRODUÇÃO (20s)**

1. **Abrir navegador** (Chrome/Edge recomendado)
2. **Acessar o PWA**
   ```
   https://mtechdevelopment.github.io/bootcamp2-chrome-ext-MTECHDevelopment/
   ```
3. **Mostrar a interface inicial**
   - Lista de notas vazia
   - Editor à direita
   - Estatísticas zeradas

**🎤 Narração (opcional):**
> "Vou demonstrar como instalar e usar nosso PWA de notas."

---

### **[0:20 - 0:50] INSTALAÇÃO DO PWA (30s)**

#### **Opção A: Botão de Instalação (Mais Fácil)**
1. **Clicar no botão "📱 Instalar App"**
2. **Aguardar prompt de instalação aparecer**
3. **Clicar em "Instalar"** no prompt do navegador
4. **Aguardar abertura do app standalone**

#### **Opção B: Ícone da Barra de Endereço**
1. **Apontar para o ícone ⊕ na barra de endereços**
2. **Clicar no ícone**
3. **Clicar em "Instalar"** no prompt
4. **Aguardar abertura do app**

**🎤 Narração:**
> "Clicando em 'Instalar App', o navegador abre um prompt. Após confirmar, o PWA é instalado como um aplicativo nativo."

**✨ Destacar:**
- PWA abre em janela própria (sem barra de endereços)
- Ícone do app aparece no desktop/menu iniciar

---

### **[0:50 - 1:30] CRIAR PRIMEIRA NOTA (40s)**

1. **Clicar em "Nova Nota"** (botão +)
2. **Digitar título e conteúdo:**
   ```
   Lista de Compras
   
   - Arroz
   - Feijão
   - Leite
   - Pão
   https://supermercado.com
   ![imagem de carrinho]
   ```
3. **Aguardar salvamento automático** (nota aparece na sidebar)
4. **Mostrar estatísticas atualizando:**
   - Palavras
   - Links detectados
   - Imagens detectadas
   - Caracteres

**🎤 Narração:**
> "Criando uma nota, veja como as estatísticas são atualizadas em tempo real: contagem de palavras, links e imagens."

---

### **[1:30 - 2:00] FUNCIONALIDADES PRINCIPAIS (30s)**

1. **Trocar cor da borda:**
   - Clicar no color picker
   - Escolher cor diferente (ex: verde, vermelho)
   - Mostrar borda mudando de cor

2. **Selecionar texto:**
   - Selecionar parte do conteúdo
   - Mostrar estatística "Seleção" atualizando

3. **Criar segunda nota:**
   - Clicar "Nova Nota"
   - Adicionar título: "Tarefas"
   - Adicionar conteúdo rápido

**🎤 Narração:**
> "É possível personalizar a cor da borda, ver estatísticas de seleção e criar múltiplas notas."

---

### **[2:00 - 2:30] FUNCIONALIDADES OFFLINE (30s)**

1. **Abrir DevTools** (F12)
2. **Ir em "Network" → "Offline"** (ou "Application" → "Service Workers" → "Offline")
3. **Recarregar página** (F5)
4. **Mostrar que continua funcionando:**
   - Clicar entre notas
   - Editar conteúdo
   - Ver estatísticas

5. **Voltar Online**
6. **Mostrar sincronização**

**🎤 Narração:**
> "Graças ao Service Worker, o PWA funciona completamente offline. As notas são salvas localmente."

---

### **[2:30 - 2:50] EXPORTAR E EXCLUIR (20s)**

1. **Clicar em "Baixar .txt"**
2. **Mostrar arquivo sendo baixado**
3. **Abrir arquivo .txt** (mostrar conteúdo)
4. **Voltar ao PWA**
5. **Clicar em "Excluir Nota"**
6. **Confirmar exclusão**
7. **Mostrar nota removida da lista**

**🎤 Narração:**
> "Podemos exportar notas como .txt e excluir quando não precisamos mais."

---

### **[2:50 - 3:00] ENCERRAMENTO (10s)**

1. **Mostrar lista final de notas**
2. **Fechar e reabrir o app** (para mostrar persistência)
3. **Mostrar notas ainda presentes**

**🎤 Narração:**
> "Os dados ficam salvos mesmo ao fechar e reabrir o aplicativo. Obrigado!"

**🎬 Fade out ou tela final:**
```
✅ PWA de Notas
📱 Instalável
💾 Funciona Offline
📊 Estatísticas em Tempo Real

GitHub: MTECHDevelopment/bootcamp2-chrome-ext-MTECHDevelopment
```

---

## 🛠️ Ferramentas Recomendadas

### **Para Gravação de Vídeo:**
- **OBS Studio** (Windows/Mac/Linux) - Gratuito e profissional
- **QuickTime Player** (Mac) - Nativo, File → New Screen Recording
- **Xbox Game Bar** (Windows) - Win+G
- **ShareX** (Windows) - Gratuito, com edição
- **Loom** (Web) - Fácil e com narração

### **Para Criação de GIF:**
- **ScreenToGif** (Windows) - Melhor opção para GIF
- **LICEcap** (Windows/Mac) - Simples e leve
- **Peek** (Linux) - Específico para GIFs
- **GIPHY Capture** (Mac) - Fácil compartilhamento

### **Para Edição:**
- **DaVinci Resolve** (Gratuito, profissional)
- **Shotcut** (Open source)
- **iMovie** (Mac, nativo)
- **Online**: Kapwing, Clipchamp

---

## ⚙️ Configurações de Gravação

### **Vídeo:**
- **Resolução:** 1280x720 (720p) ou 1920x1080 (1080p)
- **FPS:** 30 fps (suficiente para demo)
- **Formato:** MP4 (H.264)
- **Bitrate:** 5000 kbps (boa qualidade)

### **GIF:**
- **Resolução:** 800x600 ou 1000x750 (GIF fica pesado em alta resolução)
- **FPS:** 15 fps (GIF não precisa de muito)
- **Tamanho máximo:** 10 MB (para fácil compartilhamento)
- **Loop:** Infinito

---

## 📤 Após Gravar

1. **Comprimir o vídeo** (se necessário):
   ```bash
   ffmpeg -i input.mp4 -vcodec h264 -acodec aac output.mp4
   ```

2. **Converter vídeo para GIF** (se preferir):
   ```bash
   ffmpeg -i input.mp4 -vf "fps=15,scale=800:-1:flags=lanczos" output.gif
   ```

3. **Adicionar ao repositório:**
   ```bash
   mkdir -p docs/demo
   # Copiar arquivo de vídeo/GIF
   git add docs/demo/pwa-demo.mp4  # ou .gif
   git commit -m "docs: add PWA demonstration video"
   git push origin main
   ```

4. **Atualizar README.md** com link do vídeo

---

## 🎯 Pontos Importantes a Destacar

✅ **Instalação simples** (1 clique)  
✅ **Interface intuitiva** e moderna  
✅ **Funciona offline** (Service Worker)  
✅ **Estatísticas em tempo real**  
✅ **Múltiplas notas** com navegação  
✅ **Personalização** (cores)  
✅ **Exportação** de dados  
✅ **Persistência** de dados  

---

## 📝 Dicas de Gravação

1. **Movimentos suaves** - Não mova o mouse rápido demais
2. **Pausas curtas** - Dê tempo para o viewer processar cada ação
3. **Zoom em elementos importantes** - Use zoom se gravar vídeo
4. **Texto na tela** - Adicione legendas se não tiver narração
5. **Música de fundo** - Adicione música suave (sem direitos autorais)
6. **Teste antes** - Grave um teste de 30s antes do vídeo final

---

## 🎨 Recursos Adicionais

### **Música sem Copyright:**
- YouTube Audio Library
- Incompetech
- Bensound
- Free Music Archive

### **Ícones/Overlays:**
- Flaticon (ícones gratuitos)
- Canva (templates de vídeo)

---

**Boa gravação! 🎬**
