import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import robotAvatar from '@/assets/robot-avatar.png';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8 animate-slide-up">
        {/* Robot Avatar */}
        <div className="flex justify-center">
          <div className="relative w-64 h-64 animate-float">
            <img 
              src={robotAvatar} 
              alt="Chat Bot" 
              className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(59,130,246,0.5)]"
            />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            Hello, and Welcome to<br />Chat Hub
          </h1>
          <p className="text-muted-foreground text-sm max-w-xs mx-auto">
            Your intelligent chat companion helps you connect, learn, and communicate effortlessly every day.
          </p>
        </div>

        {/* Get Started Button */}
        <Button 
          onClick={() => navigate('/home')}
          className="w-full max-w-sm h-12 bg-primary hover:bg-primary/90 text-white rounded-full text-base font-medium"
        >
          Get started
        </Button>
      </div>
    </div>
  );
};

export default Index;
