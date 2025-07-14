import speech_recognition as sr
import pyaudio
import threading
import time
from google.cloud import translate_v2 as translate
import queue
import sys

class VoiceToTextConverter:
    def __init__(self):
        self.recognizer = sr.Recognizer()
        self.microphone = sr.Microphone()
        self.translator = translate.Client.from_service_account_json('C:\\Users\\R. Subrahmanyam\\OneDrive\\Desktop\\soulmate\\speech_text\\translation-bot-464508-d80ab12ef2d2.json')
        self.audio_queue = queue.Queue()
        self.is_listening = False
        self.pause_count = 0
        self.max_pauses = 4
        self.pause_duration = 5  # seconds
        self.collected_text = []
        self.last_speech_time = time.time()
        
        # Adjust for ambient noise
        print("Adjusting for ambient noise... Please wait.")
        with self.microphone as source:
            self.recognizer.adjust_for_ambient_noise(source, duration=2)
        print("Ready to listen!")
    
    def translate_to_english(self, text):
        """Translate text to English regardless of detected language"""
        try:
            result = self.translator.translate(text, target_language='en')
            return result['translatedText']
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
                
                print(f"\n[Original] {text}")

                # Always translate
                english_text = self.translate_to_english(text)
                print(f"[English] {english_text}")
                
                self.collected_text.append(english_text)
                
        except sr.UnknownValueError:
            # Speech was unintelligible
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
                    self.last_speech_time = current_time  # Reset timer
            
            time.sleep(0.5)  # Check every 500ms
    
    def start_listening(self):
        """Start the voice recognition process"""
        self.is_listening = True
        self.pause_count = 0
        self.collected_text = []
        self.last_speech_time = time.time()
        
        print("\n🎤 Starting voice recognition...")
        print(f"- Speak in any language (will be translated to English)")
        print(f"- {self.pause_duration} second pause will be detected")
        print(f"- After {self.max_pauses} pauses, recording will stop")
        print("- Press Ctrl+C to stop manually\n")
        
        # Start the pause monitoring thread
        pause_thread = threading.Thread(target=self.monitor_pauses)
        pause_thread.daemon = True
        pause_thread.start()
        
        # Start continuous listening
        stop_listening = self.recognizer.listen_in_background(
            self.microphone, 
            self.audio_callback,
            phrase_time_limit=30  # Maximum phrase length
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
    required_packages = ['speech_recognition', 'pyaudio', 'google-cloud-translate']
    missing_packages = []
    
    for package in required_packages:
        try:
            if package == 'google-cloud-translate':
                __import__('google.cloud.translate_v2')
            else:
                __import__(package)
        except ImportError:
            missing_packages.append(package)
    
    if missing_packages:
        print("Missing required packages:")
        for package in missing_packages:
            print(f"pip install {package}")
        print("\nPlease install the missing packages and try again.")
        return False
    
    return True

def main():
    """Main function"""
    print("Multilingual Voice-to-Text Converter")
    print("====================================")
    
    # Check dependencies
    if not check_dependencies():
        return
    
    # Initialize and run the converter
    converter = VoiceToTextConverter()
    converter.run()

if __name__ == "__main__":
    main()