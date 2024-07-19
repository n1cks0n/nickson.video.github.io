from pytube import YouTube
import os

def youtube_to_mp3(url):
    """Descarga un video de YouTube y lo convierte a MP3."""

    try:
        yt = YouTube(url)

        # Obtiene el stream de audio de mayor calidad
        audio_stream = yt.streams.filter(only_audio=True).first()

        # Descarga el archivo de audio
        out_file = audio_stream.download(output_path=".")

        # Obtiene el nombre base del archivo (sin extensión)
        base, ext = os.path.splitext(out_file)

        # Convierte a MP3 usando ffmpeg (debes tenerlo instalado)
        os.system(f'ffmpeg -i "{out_file}" "{base}.mp3"')

        # Elimina el archivo original
        os.remove(out_file)

        print(f"Descarga y conversión completa: {base}.mp3")

    except Exception as e:
        print(f"Ocurrió un error: {e}")

# Solicita la URL del video al usuario
url = input("Ingresa la URL del video de YouTube: ")

# Llama a la función para descargar y convertir
youtube_to_mp3(url)
