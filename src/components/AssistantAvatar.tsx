import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import robotAvatar from '@/assets/robot-avatar.png';

type Expression = 'idle' | 'speaking' | 'listening' | 'thinking' | 'happy';

interface AssistantAvatarProps {
  isSpeaking?: boolean;
  isListening?: boolean;
  expression?: Expression;
  position?: { x: number; y: number };
  onPositionChange?: (position: { x: number; y: number }) => void;
}

export function AssistantAvatar({ 
  isSpeaking = false,
  isListening = false,
  expression = 'idle',
  position = { x: 50, y: 50 },
  onPositionChange 
}: AssistantAvatarProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [currentExpression, setCurrentExpression] = useState<Expression>(expression);

  useEffect(() => {
    if (isSpeaking) setCurrentExpression('speaking');
    else if (isListening) setCurrentExpression('listening');
    else setCurrentExpression(expression);
  }, [isSpeaking, isListening, expression]);

  const getEyeAnimation = () => {
    switch (currentExpression) {
      case 'speaking':
        return {
          scaleY: [1, 0.8, 1.2, 1],
          transition: { duration: 0.5, repeat: Infinity }
        };
      case 'listening':
        return {
          scale: [1, 1.3, 1],
          transition: { duration: 1, repeat: Infinity }
        };
      case 'thinking':
        return {
          x: [-2, 2, -2],
          transition: { duration: 1.5, repeat: Infinity }
        };
      case 'happy':
        return {
          scaleY: [1, 0.6, 1],
          transition: { duration: 0.3, repeat: 3 }
        };
      default:
        return {};
    }
  };

  const getMouthShape = () => {
    switch (currentExpression) {
      case 'speaking':
        return {
          height: [16, 24, 12, 20, 16],
          width: [32, 28, 36, 30, 32],
          borderRadius: ['0 0 50% 50%', '0 0 40% 40%', '0 0 60% 60%', '0 0 45% 45%', '0 0 50% 50%'],
          transition: { duration: 0.5, repeat: Infinity }
        };
      case 'listening':
        return {
          scaleX: 0.8,
          borderRadius: '50%'
        };
      case 'happy':
        return {
          height: 20,
          width: 40,
          borderRadius: '0 0 50% 50%'
        };
      case 'thinking':
        return {
          height: 12,
          width: 28,
          borderRadius: '50%'
        };
      default:
        return {
          height: 16,
          width: 32,
          borderRadius: '0 0 50% 50%'
        };
    }
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.1}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(e, info) => {
        setIsDragging(false);
        onPositionChange?.({ x: info.point.x, y: info.point.y });
      }}
      style={{ 
        position: 'absolute',
        left: position.x,
        top: position.y,
        touchAction: 'none'
      }}
      className="cursor-move z-40"
    >
      <div className="relative">
        {/* Glow effect */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-gradient-primary blur-2xl opacity-50"
          animate={isSpeaking || isListening ? {
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.1, 1]
          } : {}}
          transition={{
            duration: 1,
            repeat: isSpeaking || isListening ? Infinity : 0
          }}
        />
        
        {/* Robot Avatar Image with screen overlay */}
        <div className="relative w-48 h-48">
          <img 
            src={robotAvatar} 
            alt="AI Assistant" 
            className="w-full h-full object-contain"
          />
          
          {/* Face overlay on the screen area */}
          <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-24 h-16 flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Eyes */}
              <motion.div 
                className="absolute top-4 left-6 w-6 h-6 rounded-full bg-cyan-400"
                animate={getEyeAnimation()}
              />
              <motion.div 
                className="absolute top-4 right-6 w-6 h-6 rounded-full bg-cyan-400"
                animate={getEyeAnimation()}
              />
              
              {/* Mouth - changes based on expression */}
              <motion.div 
                className="absolute bottom-2 left-1/2 -translate-x-1/2 border-2 border-cyan-400"
                initial={{ height: 16, width: 32 }}
                animate={getMouthShape()}
              />
            </div>
          </div>
        </div>

        {/* Level indicator */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-card border border-primary/30 rounded-full px-3 py-1 text-xs font-bold whitespace-nowrap">
          Level 1
        </div>
      </div>
    </motion.div>
  );
}
