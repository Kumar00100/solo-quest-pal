import { useState, useEffect } from 'react';
import { TopBar } from '@/components/TopBar';
import { AssistantAvatar } from '@/components/AssistantAvatar';
import { VoiceInput } from '@/components/VoiceInput';
import { TasksSlideOver } from '@/components/TasksSlideOver';
import { ProfileModal } from '@/components/ProfileModal';
import { DashboardModal } from '@/components/DashboardModal';
import { WalkingTracker } from '@/components/WalkingTracker';
import { Button } from '@/components/ui/button';
import { User, LayoutDashboard, MapPin } from 'lucide-react';

const Assistant = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [expression, setExpression] = useState<'idle' | 'speaking' | 'listening' | 'thinking' | 'happy'>('idle');
  const [profileOpen, setProfileOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [walkingTrackerOpen, setWalkingTrackerOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    { role: 'assistant', text: 'Hello! I\'m your SoloLevel assistant. How can I help you level up today?' }
  ]);

  const handleToggleListening = () => {
    setIsListening(!isListening);
    setExpression(!isListening ? 'listening' : 'idle');
  };

  const handleSendMessage = (text: string) => {
    setMessages([...messages, { role: 'user', text }]);
    setExpression('thinking');
    
    // Simulate AI processing
    setTimeout(() => {
      setExpression('happy');
      setTimeout(() => {
        setIsSpeaking(true);
        setExpression('speaking');
        const response = "I understand you want to work on that. Let me help you create a plan!";
        setMessages(prev => [...prev, { role: 'assistant', text: response }]);
        
        // Simulate speech duration
        setTimeout(() => {
          setIsSpeaking(false);
          setExpression('idle');
        }, 3000);
      }, 500);
    }, 1000);
  };


  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-glow blur-3xl opacity-20 animate-pulse-glow" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Main container */}
      <div className="flex-1 flex flex-col relative">
        {/* Top section with avatar */}
        <div className="relative pt-24 pb-8 flex justify-center">
          <AssistantAvatar 
            isSpeaking={isSpeaking}
            isListening={isListening}
            expression={expression}
            position={{ x: 0, y: 0 }}
          />
        </div>

        {/* Quick action buttons - floating on right */}
        <div className="fixed top-24 right-6 z-40 flex flex-col gap-3">
          <Button
            onClick={() => setProfileOpen(true)}
            size="icon"
            className="rounded-full w-14 h-14 bg-card/80 backdrop-blur-md border border-primary/20 hover:bg-card hover:border-primary/40 transition-all shadow-lg"
          >
            <User className="w-6 h-6" />
          </Button>
          <Button
            onClick={() => setDashboardOpen(true)}
            size="icon"
            className="rounded-full w-14 h-14 bg-card/80 backdrop-blur-md border border-primary/20 hover:bg-card hover:border-primary/40 transition-all shadow-lg"
          >
            <LayoutDashboard className="w-6 h-6" />
          </Button>
          <Button
            onClick={() => setWalkingTrackerOpen(true)}
            size="icon"
            className="rounded-full w-14 h-14 bg-card/80 backdrop-blur-md border border-primary/20 hover:bg-card hover:border-primary/40 transition-all shadow-lg"
          >
            <MapPin className="w-6 h-6" />
          </Button>
        </div>

        {/* Chat area - scrollable */}
        <div className="flex-1 overflow-y-auto px-4 pb-32">
          <div className="container mx-auto max-w-3xl">
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
                      max-w-[80%] px-5 py-3 rounded-2xl shadow-lg
                      ${msg.role === 'user'
                        ? 'bg-gradient-primary text-primary-foreground'
                        : 'bg-card/80 backdrop-blur-md border border-primary/20'
                      }
                    `}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Voice Input - fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-primary/10 z-30">
          <VoiceInput
            onSend={handleSendMessage}
            isListening={isListening}
            onToggleListening={handleToggleListening}
          />
        </div>

        {/* Tasks Slide-over */}
        <TasksSlideOver />

        {/* Modals */}
        <ProfileModal open={profileOpen} onOpenChange={setProfileOpen} />
        <DashboardModal open={dashboardOpen} onOpenChange={setDashboardOpen} />
        <WalkingTracker open={walkingTrackerOpen} onOpenChange={setWalkingTrackerOpen} />
      </div>
    </div>
  );
};

export default Assistant;
