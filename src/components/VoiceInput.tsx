import { useState } from 'react';
import { Mic, MicOff, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface VoiceInputProps {
  onSend: (message: string) => void;
  isListening?: boolean;
  onToggleListening?: () => void;
}

export function VoiceInput({ onSend, isListening = false, onToggleListening }: VoiceInputProps) {
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
      setIsExpanded(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full px-4 py-4">
      <div className="container mx-auto max-w-3xl">
        <div className={`
          bg-card/80 backdrop-blur-md border border-primary/20 rounded-2xl 
          shadow-glow transition-all duration-300
          ${isExpanded ? 'p-4' : 'p-2'}
        `}>
          <div className="flex items-center gap-3">
            <Button
              onClick={onToggleListening}
              size="icon"
              className={`
                rounded-full w-12 h-12 flex-shrink-0 transition-all
                ${isListening 
                  ? 'bg-destructive hover:bg-destructive/90 animate-pulse-glow' 
                  : 'bg-gradient-primary hover:shadow-glow-lg'
                }
              `}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>

            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsExpanded(true)}
              onBlur={() => !input && setIsExpanded(false)}
              placeholder="Type your message or use voice..."
              className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />

            {input && (
              <Button
                onClick={handleSend}
                size="icon"
                className="rounded-full w-10 h-10 flex-shrink-0 bg-gradient-primary hover:shadow-glow-lg"
              >
                <Send className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
