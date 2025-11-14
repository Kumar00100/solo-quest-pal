import { useNavigate } from 'react-router-dom';
import { MessageSquare, Mic, Image, History, Bell, ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Home = () => {
  const navigate = useNavigate();

  const actionCards = [
    { 
      title: 'Chat with BDT', 
      icon: MessageSquare, 
      color: 'bg-[hsl(350,85%,60%)]',
      path: '/assistant'
    },
    { 
      title: 'Talk with BDT', 
      icon: Mic, 
      color: 'bg-[hsl(210,100%,60%)]',
      path: '/assistant'
    },
    { 
      title: 'Image search with bot', 
      icon: Image, 
      color: 'bg-[hsl(175,70%,50%)]',
      path: '/assistant'
    },
    { 
      title: 'All history', 
      icon: History, 
      color: 'bg-[hsl(25,95%,60%)]',
      path: '/assistant'
    },
  ];

  const pinnedChats = [
    {
      title: 'Understanding of AI:',
      subtitle: 'Tell me what artificial intelligence?'
    },
    {
      title: 'Healthy way of life:',
      subtitle: 'What is the best way to stay fit?'
    },
    {
      title: 'The value of reading books',
      subtitle: 'What makes reading a habit for success?'
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Wilson" />
              <AvatarFallback>WL</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-muted-foreground">Hello,</p>
              <p className="font-semibold text-foreground">Wilson Lubin</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>

        {/* Main Heading */}
        <h1 className="text-2xl font-semibold text-foreground mt-8">
          How may I help<br />you today?
        </h1>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-2 gap-4">
          {actionCards.map((card, index) => (
            <Card 
              key={index}
              onClick={() => navigate(card.path)}
              className="relative bg-card/50 backdrop-blur border-border/50 p-5 cursor-pointer hover:bg-card/70 transition-all group overflow-hidden"
            >
              <div className={`w-12 h-12 ${card.color} rounded-2xl flex items-center justify-center mb-4`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-medium text-foreground mb-8">
                {card.title}
              </p>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground absolute bottom-4 right-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Card>
          ))}
        </div>

        {/* Pin Chat Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Pin Chat</h2>
            <Button variant="link" className="text-primary text-sm p-0 h-auto">
              See all
            </Button>
          </div>

          <div className="space-y-3">
            {pinnedChats.map((chat, index) => (
              <Card 
                key={index}
                className="bg-card/30 backdrop-blur border-border/50 p-4 cursor-pointer hover:bg-card/50 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <MessageSquare className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm mb-1">
                        {chat.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {chat.subtitle}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                    <svg 
                      className="w-5 h-5 text-muted-foreground" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" 
                      />
                    </svg>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
