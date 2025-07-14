from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import tensorflow.keras.models
from tensorflow.keras.preprocessing import image
from PIL import Image
import io
import speech_recognition as sr
from pydub import AudioSegment
from googletrans import Translator, LANGUAGES
import requests
from textblob import TextBlob
import language_tool_python

app = Flask(__name__)
CORS(app)

# Load Emotion Detection Model
model_best = tensorflow.keras.models.load_model('../emotion_detection/emotion_model.h5')
class_names = ['Angry', 'Disgusted', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral']
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Load Speech Recognition
recognizer = sr.Recognizer()

# Load Google Translator
translator = Translator()

# Grammar checker
try:
    grammar_tool = language_tool_python.LanguageTool('en-US')
    grammar_enabled = True
except Exception as e:
    print(f"Grammar tool load failed: {e}")
    grammar_enabled = False

@app.route('/')
def home():
    return 'Backend is working perfectly...'

@app.route('/predict_emotion', methods=['POST'])
def predict_emotion():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        img_bytes = file.read()
        pil_image = Image.open(io.BytesIO(img_bytes)).convert('RGB')
        frame = np.array(pil_image)
        frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5, minSize=(30, 30))

        predictions_list = []

        for (x, y, w, h) in faces:
            face_roi = frame[y:y + h, x:x + w]
            face_image = cv2.resize(face_roi, (48, 48))
            face_image = cv2.cvtColor(face_image, cv2.COLOR_BGR2GRAY)
            face_image = image.img_to_array(face_image)
            face_image = np.expand_dims(face_image, axis=0)
            face_image = np.vstack([face_image])

            predictions = model_best.predict(face_image)
            emotion_label = class_names[np.argmax(predictions)]
            predictions_list.append(emotion_label)

        if not predictions_list:
            return jsonify({'error': 'No face detected in image'}), 200

        return jsonify({'predictions': predictions_list})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/translate', methods=['POST'])
def transcribe():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400

    audio_file = request.files['audio']

    try:
        audio_bytes = audio_file.read()
        audio_segment = AudioSegment.from_file(io.BytesIO(audio_bytes))
        audio_segment = audio_segment.set_channels(1).set_frame_rate(16000)

        wav_buffer = io.BytesIO()
        audio_segment.export(wav_buffer, format="wav")
        wav_buffer.seek(0)

        with sr.AudioFile(wav_buffer) as source:
            audio_data = recognizer.record(source)
            original_text = recognizer.recognize_google(audio_data)

        print(f"[Original] {original_text}")

        # Detect language and translate using googletrans
        detected_lang = translator.detect(original_text).lang
        if detected_lang != 'en':
            translated = translator.translate(original_text, src=detected_lang, dest='en')
            translated_text = translated.text
        else:
            translated_text = original_text

        print(f"[English] {translated_text}")

        # Spell correction using TextBlob
        corrected_text = str(TextBlob(translated_text).correct())

        # Grammar correction using LanguageTool
        if grammar_enabled:
            matches = grammar_tool.check(corrected_text)
            final_text = language_tool_python.utils.correct(corrected_text, matches)
        else:
            final_text = corrected_text

        return jsonify({"english_text": final_text})

    except sr.UnknownValueError:
        return jsonify({"error": "Could not understand audio"}), 400
    except Exception as e:
        import traceback
        print("[ERROR] Exception in /translate route:")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route('/chatbot', methods=['POST'])
def chat_with_bot():
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        if not user_message.strip():
            return jsonify({"error": "Empty message provided"}), 400

        prompt = (
            "You are a compassionate and empathetic AI trained to provide emotional and mental support."
            "Reply to the user with compassion, warmth, and comfort in less than 100 characters.\n"
            f"User: {user_message}\n"
            "Bot:"
        )

        payload = {
            "model": "gemma:2b",
            "prompt": prompt,
            "stream": False
        }
        response = requests.post("http://127.0.0.1:11434/api/generate", json=payload)
        if response.status_code == 200:
            bot_response = response.json()["response"].strip()
            return jsonify({"response": bot_response}) 
        else:
            return jsonify({"error": f"Ollama API error {response.status_code}: {response.text}"}), 500

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host="localhost", port=5000)
