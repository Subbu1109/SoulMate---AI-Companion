'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import MicRecorder from 'mic-recorder-to-mp3';
import { Send, Mic, Camera, Bot, User, X } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI companion. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date(),
      sentiment: 'positive',
    },
  ]);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const PREDICT_URL = process.env.NEXT_PUBLIC_PREDICT_URL;
  const TRANSLATE_URL = process.env.NEXT_PUBLIC_TRANSLATE_URL;
  const CHAT_URL = process.env.NEXT_PUBLIC_CHAT_URL;

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcribing, setTranscribing] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const res = await axios.post(CHAT_URL!, { message: userMessage.content });
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: res.data.response || 'Sorry! I did not understand that.',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: 'Sorry! I did not understand that.',
          sender: 'ai',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const [showCamera, setShowCamera] = useState(false);
  const [emotionResult, setEmotionResult] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const recorder = useRef(new MicRecorder({ bitRate: 64 }));

  useEffect(() => {
    if (!showCamera) return;
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => videoRef.current && (videoRef.current.srcObject = stream))
      .catch(console.error);
  }, [showCamera]);

  const captureAndPredict = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0, 200, 200);
    const blob = await (await fetch(canvasRef.current.toDataURL('image/jpeg'))).blob();
    const fd = new FormData();
    fd.append('image', blob, 'frame.jpg');
    try {
      const res = await axios.post(PREDICT_URL!, fd);
      setEmotionResult(res.data.predictions?.[0] ?? '');
    } catch (err) { console.error(err); }
  };

  const closeCamera = () => {
    setShowCamera(false);
    setEmotionResult('');
    (videoRef.current?.srcObject as MediaStream | undefined)
      ?.getTracks()
      .forEach((t) => t.stop());
  };

  const handleStartRecording = () => {
    recorder.current.start();
    setIsRecording(true);
  };

  const handleStopRecording = async () => {
    if (!isRecording) return;

    setIsRecording(false);
    setTranscribing(true);

    try {
      const [, blob] = await recorder.current.stop().getMp3();
      const fd = new FormData();
      fd.append('audio', blob, 'recording.mp3');

      const res = await axios.post(
        TRANSLATE_URL!,
        fd,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 25000,
        }
      );

      if (res.data.english_text) {
        setInputValue(res.data.english_text);
      } else {
        alert('Could not transcribe speech.');
      }
    } catch (err) {
      console.error('Recording stop error:', err);
    } finally {
      setTranscribing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl h-screen flex flex-col overflow-hidden relative">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-2 mb-2 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-white">AI Companion</h1>
          <div className="flex items-center gap-1 mt-1">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-green-400 font-medium">Online</span>
          </div>
        </div>
      </motion.div>

      <div className="flex-1 glass-panel p-6 mb-4 overflow-y-auto scrollbar-hide">
        <AnimatePresence>
          {messages.map((m) => (
            <motion.div key={m.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`flex mb-6 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 max-w-xs lg:max-w-md ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${m.sender === 'user' ? 'bg-gradient-to-br from-green-500 to-teal-600' : 'bg-gradient-to-br from-blue-500 to-purple-600'}`}>
                  {m.sender === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                </div>
                <div className={`glass-panel p-4 rounded-3xl ${m.sender === 'user' ? 'bg-gradient-to-br from-green-500/20 to-teal-600/20' : 'bg-gradient-to-br from-blue-500/20 to-purple-600/20'}`}>
                  <p className="text-white">{m.content}</p>
                  {isClient && (
                    <span className="text-xs text-white/50 mt-2 block">
                      {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex mb-6">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="glass-panel p-4 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-600/20">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-4">
        <div className="flex items-center gap-2">
          <button onClick={() => setShowCamera(true)} className="glass-button p-2 rounded-full">
            <Camera className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={isRecording ? handleStopRecording : handleStartRecording}
            disabled={transcribing}
            className={`glass-button p-2 rounded-full ${(isRecording ? 'bg-red-600 ' : '') + (transcribing ? 'opacity-50 cursor-not-allowed' : '')}`}
          >
            <Mic className="w-5 h-5 text-white" />
          </button>

          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share your thoughts..."
              className="w-full bg-white/10 border border-white/20 rounded-3xl px-3 py-2 text-white placeholder-white/50 resize-none focus:outline-none focus:border-white/40 backdrop-blur-sm"
              rows={1}
            />

            {transcribing && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          <button onClick={handleSendMessage} className="glass-button p-2 rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </motion.div>

      {showCamera && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur">
          <div className="relative rounded-xl shadow-lg max-w-sm w-full">
            <button onClick={closeCamera} className="absolute -top-5 -right-5 z-50 text-white bg-black/50 rounded-full p-3 hover:bg-black/70 shadow-lg">
              <X className="w-6 h-6" />
            </button>
            <div className="flex flex-col items-center gap-4">
              <video ref={videoRef} autoPlay className="rounded-lg shadow-lg w-full max-w-md" />
              <canvas ref={canvasRef} className="hidden" width={400} height={400} />
              <button onClick={captureAndPredict} className="glass-button px-4 py-2 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                Capture & Predict
              </button>
              {emotionResult && (
                <h2 className="text-white text-lg mt-2">
                  Your Mood: <span className="font-bold">{emotionResult}</span>
                </h2>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
