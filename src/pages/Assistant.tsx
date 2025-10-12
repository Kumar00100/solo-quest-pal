import { useState, useEffect } from 'react';
import { TopBar } from '@/components/TopBar';
import { AssistantAvatar } from '@/components/AssistantAvatar';
import { VoiceInput } from '@/components/VoiceInput';
import { TasksSlideOver } from '@/components/TasksSlideOver';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';

const Assistant = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [avatarPosition, setAvatarPosition] = useState({ x: 100, y: 200 });
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    { role: 'assistant', text: 'Hello! I\'m your SoloLevel assistant. How can I help you level up today?' }
  ]);

  // Load saved avatar position
  useEffect(() => {
    const saved = localStorage.getItem('avatarPosition');
    if (saved) {
      setAvatarPosition(JSON.parse(saved));
    }
  }, []);

  const handlePositionChange = (position: { x: number; y: number }) => {
    setAvatarPosition(position);
    localStorage.setItem('avatarPosition', JSON.stringify(position));
  };

  const handleSendMessage = (text: string) => {
    setMessages([...messages, { role: 'user', text }]);
    
    // Simulate AI response
    setTimeout(() => {
      setIsSpeaking(true);
      const response = "I understand you want to work on that. Let me help you create a plan!";
      setMessages(prev => [...prev, { role: 'assistant', text: response }]);
      
      // Simulate speech duration
      setTimeout(() => setIsSpeaking(false), 3000);
    }, 1000);
  };

  const handleToggleListening = () => {
    setIsListening(!isListening);
    // TODO: Implement actual speech recognition
  };

  const handleSecondaryMic = () => {
    setIsListening(!isListening);
    // TODO: Implement push-to-talk or continuous listening
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-glow blur-3xl opacity-20 animate-pulse-glow" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Main content area */}
      <div className="relative pt-20 min-h-screen pb-32">
        {/* Draggable Avatar */}
        <AssistantAvatar 
          isSpeaking={isSpeaking}
          position={avatarPosition}
          onPositionChange={handlePositionChange}
        />

        {/* Secondary mic control under avatar */}
        <Button
          onClick={handleSecondaryMic}
          size="icon"
          className={`
            fixed rounded-full w-14 h-14 shadow-glow transition-all z-30
            ${isListening 
              ? 'bg-destructive hover:bg-destructive/90 animate-pulse-glow' 
              : 'bg-gradient-primary hover:shadow-glow-lg'
            }
          `}
          style={{
            left: avatarPosition.x + 40,
            top: avatarPosition.y + 140,
          }}
        >
          {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </Button>

        {/* Chat messages */}
        <div className="container mx-auto px-4 max-w-3xl pt-8">
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`
                  flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}
                  animate-slide-up
                `}
              >
                <div
                  className={`
                    max-w-[80%] px-4 py-3 rounded-2xl
                    ${msg.role === 'user'
                      ? 'bg-gradient-primary text-primary-foreground ml-auto'
                      : 'bg-card border border-primary/20'
                    }
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Voice Input */}
        <VoiceInput
          onSend={handleSendMessage}
          isListening={isListening}
          onToggleListening={handleToggleListening}
        />

        {/* Tasks Slide-over */}
        <TasksSlideOver />
      </div>
    </div>
  );
};

export default Assistant;
