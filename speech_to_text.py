import speech_recognition as sr
import pyaudio
import threading
import time
from googletrans import Translator, LANGUAGES
import queue
import sys
from textblob import TextBlob
import language_tool_python

class VoiceToTextConverter:
    def __init__(self):
        self.recognizer = sr.Recognizer()
        self.microphone = sr.Microphone()
        self.translator = Translator()
        self.audio_queue = queue.Queue()
        self.is_listening = False
        self.pause_count = 0
        self.max_pauses = 4
        self.pause_duration = 5 
        self.collected_text = []
        self.last_speech_time = time.time()
        
        # Initialize grammar checker
        print("Initializing grammar checker... Please wait.")
        try:
            self.grammar_tool = language_tool_python.LanguageTool('en-US')
            self.grammar_enabled = True
            print("Grammar checker initialized successfully.")
        except Exception as e:
            print(f"Warning: Grammar checker initialization failed: {e}")
            print("Continuing without grammar correction...")
            self.grammar_enabled = False
        
        # Adjusting for ambient noise
        print("Adjusting for ambient noise... Please wait.")
        with self.microphone as source:
            self.recognizer.adjust_for_ambient_noise(source, duration=2)
        print("Ready to listen!")
    
    def detect_language(self, text):
        """Detect the language of the input text"""
        try:
            detected = self.translator.detect(text)
            return detected.lang
        except Exception as e:
            print(f"Language detection error: {e}")
            return 'en'  
    
    def correct_grammar_and_spelling(self, text):
        """Correct grammar and spelling in the text"""
        try:
            # First, use TextBlob for basic spelling correction
            blob = TextBlob(text)
            spell_corrected = str(blob.correct())
            
            # Then use LanguageTool for grammar correction if available
            if self.grammar_enabled:
                matches = self.grammar_tool.check(spell_corrected)
                corrected_text = language_tool_python.utils.correct(spell_corrected, matches)
                
                # Show corrections if any were made
                if corrected_text != text:
                    print(f"[Corrected] {corrected_text}")
                
                return corrected_text
            else:
                # Only spelling correction available
                if spell_corrected != text:
                    print(f"[Spell-corrected] {spell_corrected}")
                return spell_corrected
                
        except Exception as e:
            print(f"Grammar/spelling correction error: {e}")
            return text
    def translate_to_english(self, text, source_lang):
        """Translate text to English if it's not already in English"""
        try:
            if source_lang != 'en':
                translated = self.translator.translate(text, src=source_lang, dest='en')
                return translated.text
            return text
        except Exception as e:
            print(f"Translation error: {e}")
            return text
    
    def audio_callback(self, recognizer, audio):
        """Callback function for continuous listening"""
        try:
            # Use Google's speech recognition
            text = recognizer.recognize_google(audio)
            
            if text.strip():
                self.last_speech_time = time.time()
                
                # Detecting language
                detected_lang = self.detect_language(text)
                lang_name = LANGUAGES.get(detected_lang, 'Unknown')
                
                print(f"\n[Detected: {lang_name}] Original: {text}")
                
                # Translate to English if needed
                english_text = self.translate_to_english(text, detected_lang)
                print(f"[English] {english_text}")
                
                # Apply grammar and spelling correction
                corrected_text = self.correct_grammar_and_spelling(english_text)
                
                self.collected_text.append(corrected_text)
                
        except sr.UnknownValueError:
            pass
        except sr.RequestError as e:
            print(f"Could not request results; {e}")
    
    def monitor_pauses(self):
        """Monitor for pauses in speech"""
        while self.is_listening:
            current_time = time.time()
            time_since_last_speech = current_time - self.last_speech_time
            
            if time_since_last_speech >= self.pause_duration:
                self.pause_count += 1
                print(f"\n--- Pause detected ({self.pause_count}/{self.max_pauses}) ---")
                
                if self.pause_count >= self.max_pauses:
                    print("Maximum pauses reached. Stopping...")
                    self.stop_listening()
                    break
                else:
                    print("Continuing to listen...")
                    self.last_speech_time = current_time  
            time.sleep(0.5)  
    
    def start_listening(self):
        """Start the voice recognition process"""
        self.is_listening = True
        self.pause_count = 0
        self.collected_text = []
        self.last_speech_time = time.time()
        
        print("\n🎤 Starting voice recognition...")
        print(f"- Speak in any language (will be translated to English)")
        print(f"- Auto grammar & spelling correction enabled")
        print(f"- {self.pause_duration} second pause will be detected")
        print(f"- After {self.max_pauses} pauses, recording will stop")
        print("- Press Ctrl+C to stop manually\n")
        
        # Start the pause monitoring thread
        pause_thread = threading.Thread(target=self.monitor_pauses)
        pause_thread.daemon = True
        pause_thread.start()
        
        # Starting continuous listening
        stop_listening = self.recognizer.listen_in_background(
            self.microphone, 
            self.audio_callback,
            phrase_time_limit=30  
        )
        
        try:
            # Keep the main thread alive
            while self.is_listening:
                time.sleep(0.1)
        except KeyboardInterrupt:
            print("\nStopping by user request...")
            self.is_listening = False
        
        # Stop listening
        stop_listening(wait_for_stop=False)
        
        # Wait for pause thread to finish
        if pause_thread.is_alive():
            pause_thread.join(timeout=1)
    
    def stop_listening(self):
        """Stop the listening process"""
        self.is_listening = False
    
    def __del__(self):
        """Cleanup resources"""
        if hasattr(self, 'grammar_tool') and self.grammar_enabled:
            try:
                self.grammar_tool.close()
            except:
                pass
    def get_final_output(self):
        """Get the final concatenated output"""
        if self.collected_text:
            final_text = ' '.join(self.collected_text)
            return final_text.strip()
        return ""
    
    def run(self):
        """Main execution function"""
        try:
            self.start_listening()
            
            # Get final output
            final_output = self.get_final_output()
            
            print("\n" + "="*60)
            print("FINAL OUTPUT:")
            print("="*60)
            if final_output:
                print(final_output)
            else:
                print("No speech was detected.")
            print("="*60)
            
        except Exception as e:
            print(f"An error occurred: {e}")

def check_dependencies():
    """Check if all required packages are installed"""
    required_packages = ['speech_recognition', 'pyaudio', 'googletrans', 'textblob', 'language_tool_python']
    missing_packages = []
    
    for package in required_packages:
        try:
            if package == 'speech_recognition':
                __import__('speech_recognition')
            elif package == 'language_tool_python':
                __import__('language_tool_python')
            else:
                __import__(package)
        except ImportError:
            missing_packages.append(package)
    
    if missing_packages:
        print("Missing required packages:")
        for package in missing_packages:
            if package == 'googletrans':
                print(f"pip install googletrans==4.0.0rc1")
            elif package == 'speech_recognition':
                print(f"pip install SpeechRecognition")
            else:
                print(f"pip install {package}")
        print("\nPlease install the missing packages and try again.")
        return False
    
    return True

def main():
    """Main function"""
    print("Multilingual Voice-to-Text Converter")
    print("====================================")
    
    # Initialize and run the converter
    converter = VoiceToTextConverter()
    converter.run()

if __name__ == "__main__":
    main()