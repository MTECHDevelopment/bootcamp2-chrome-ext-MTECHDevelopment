#!/bin/bash
# Script para gravar demonstração do PWA em GIF animado

set -e

echo "🎥 Script de Captura de Tela - Demonstração PWA"
echo "================================================"
echo ""
echo "Este script ajuda você a gravar uma demonstração do PWA"
echo ""

# Verificar dependências
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ ffmpeg não está instalado"
    echo "Instale com: sudo apt install ffmpeg (Linux) ou brew install ffmpeg (Mac)"
    exit 1
fi

echo "✅ ffmpeg disponível"
echo ""

# Opções
echo "Escolha o método de captura:"
echo "1. Gravar com ffmpeg (recomendado para Linux)"
echo "2. Converter vídeo existente para GIF"
echo ""
read -p "Opção (1-2): " opcao

case $opcao in
    1)
        echo ""
        echo "📹 Instruções:"
        echo "1. Abra: http://localhost:8080"
        echo "2. Demonstre: criar nota, editar, deletar"
        echo "3. Pressione Ctrl+C quando terminar"
        echo ""
        read -p "Pressione ENTER para começar a gravar... "
        
        # Gravar por 3 minutos (180 segundos)
        echo "⏱️  Gravando por até 3 minutos... (Ctrl+C para parar)"
        ffmpeg -f x11grab -framerate 15 -i :0 -c:v libx264 -preset ultrafast -t 180 demo.mp4 2>/dev/null || true
        
        if [ -f demo.mp4 ]; then
            echo "✅ Vídeo salvo: demo.mp4"
            echo ""
            read -p "Converter para GIF? (s/n) " converter
            if [[ $converter == "s" || $converter == "S" ]]; then
                echo "🎬 Convertendo para GIF..."
                ffmpeg -i demo.mp4 -vf "fps=10,scale=1280:-1" -loop 0 demo.gif 2>/dev/null
                echo "✅ GIF salvo: demo.gif"
            fi
        fi
        ;;
    2)
        echo ""
        read -p "Caminho do vídeo (ex: demo.mp4): " video
        
        if [ ! -f "$video" ]; then
            echo "❌ Arquivo não encontrado: $video"
            exit 1
        fi
        
        echo "🎬 Convertendo para GIF..."
        output="${video%.*}.gif"
        ffmpeg -i "$video" -vf "fps=10,scale=1280:-1" -loop 0 "$output" 2>/dev/null
        echo "✅ GIF salvo: $output"
        ;;
    *)
        echo "❌ Opção inválida"
        exit 1
        ;;
esac

echo ""
echo "📤 Próximos passos:"
echo "1. Fazer upload do vídeo/GIF em:"
echo "   - GitHub Releases"
echo "   - GitHub Wiki"
echo "   - Giphy/Imgur"
echo "   - Google Drive/Dropbox"
echo ""
echo "2. Copiar link de compartilhamento"
echo "3. Adicionar ao documento de entrega"
echo ""
echo "✅ Pronto!"
