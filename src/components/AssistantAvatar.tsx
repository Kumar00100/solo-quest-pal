import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AssistantAvatarProps {
  isSpeaking?: boolean;
  position?: { x: number; y: number };
  onPositionChange?: (position: { x: number; y: number }) => void;
}

export function AssistantAvatar({ 
  isSpeaking = false, 
  position = { x: 50, y: 50 },
  onPositionChange 
}: AssistantAvatarProps) {
  const [isDragging, setIsDragging] = useState(false);

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
        <div className={`absolute inset-0 rounded-full bg-gradient-primary blur-2xl opacity-50 ${
          isSpeaking ? 'animate-pulse-glow' : ''
        }`} />
        
        {/* Avatar container */}
        <div className={`relative w-32 h-32 rounded-full bg-gradient-primary p-1 ${
          isSpeaking ? 'animate-pulse-glow' : ''
        }`}>
          <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
            {/* Face */}
            <div className="relative w-20 h-20">
              {/* Eyes */}
              <div className="absolute top-6 left-3 w-3 h-3 rounded-full bg-primary" />
              <div className="absolute top-6 right-3 w-3 h-3 rounded-full bg-primary" />
              
              {/* Mouth - animates when speaking */}
              <motion.div 
                className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-4 border-2 border-primary rounded-b-full"
                animate={isSpeaking ? {
                  scaleY: [1, 1.2, 0.8, 1.2, 1],
                  scaleX: [1, 0.9, 1.1, 0.9, 1],
                } : {}}
                transition={{
                  duration: 0.5,
                  repeat: isSpeaking ? Infinity : 0,
                  ease: "easeInOut"
                }}
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
