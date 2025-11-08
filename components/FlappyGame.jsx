'use client';
import React, { useEffect, useRef, useState } from 'react';

const FlappyGame = () => {
  const [birdY, setBirdY] = useState(250);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [pipes, setPipes] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [birdRotation, setBirdRotation] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  
  const gameLoopRef = useRef();
  const pipeIntervalRef = useRef();
  const audioContextRef = useRef(null);

  const GRAVITY = 0.5;
  const JUMP_STRENGTH = -8;
  const PIPE_WIDTH = 60;
  const PIPE_GAP = 200;
  const BIRD_SIZE = 40;
  const GAME_HEIGHT = typeof window !== 'undefined' ? Math.min(600, window.innerHeight - 200) : 600;
  const GAME_WIDTH = typeof window !== 'undefined' ? Math.min(400, window.innerWidth - 40) : 400;

  // Funny obstacle emojis
  const obstacles = ['🌵', '🗿', '🍕', '🧀', '🎃', '🦴', '🔥', '💩'];
  const [currentObstacle, setCurrentObstacle] = useState(obstacles[0]);

  // Initialize Audio Context
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
  }, []);

  // Play jump sound
  const playJumpSound = () => {
    if (isMuted || !audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.setValueAtTime(400, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  };

  // Play score sound
  const playScoreSound = () => {
    if (isMuted || !audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.frequency.setValueAtTime(1000, ctx.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.15);
  };

  // Play game over sound
  const playGameOverSound = () => {
    if (isMuted || !audioContextRef.current) return;
    const ctx = audioContextRef.current;
    
    [400, 350, 300, 250].forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
      gainNode.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.2);
      
      oscillator.start(ctx.currentTime + i * 0.1);
      oscillator.stop(ctx.currentTime + i * 0.1 + 0.2);
    });
  };

  // Play background music (simple melody loop)
  const playBackgroundMusic = () => {
    if (isMuted || !audioContextRef.current || !gameStarted || gameOver) return;
    const ctx = audioContextRef.current;
    const notes = [523, 587, 659, 698, 784, 698, 659, 587]; // C D E F G F E D
    
    notes.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.type = 'sine';
      
      const startTime = ctx.currentTime + i * 0.2;
      oscillator.frequency.setValueAtTime(freq, startTime);
      gainNode.gain.setValueAtTime(0.05, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.2);
    });
  };

  const jump = () => {
    if (!gameStarted) {
      setGameStarted(true);
      playJumpSound();
      return;
    }
    if (gameOver) {
      resetGame();
      return;
    }
    setBirdVelocity(JUMP_STRENGTH);
    setBirdRotation(-20);
    playJumpSound();
  };

  const resetGame = () => {
    setBirdY(250);
    setBirdVelocity(0);
    setPipes([]);
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
    setBirdRotation(0);
    setCurrentObstacle(obstacles[Math.floor(Math.random() * obstacles.length)]);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };
    const handleTouch = (e) => {
      e.preventDefault();
      jump();
    };
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('touchstart', handleTouch);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, [gameStarted, gameOver]);

  // Background music loop
  useEffect(() => {
    if (gameStarted && !gameOver) {
      const musicInterval = setInterval(() => {
        playBackgroundMusic();
      }, 1600);
      return () => clearInterval(musicInterval);
    }
  }, [gameStarted, gameOver, isMuted]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    gameLoopRef.current = setInterval(() => {
      setBirdVelocity(v => v + GRAVITY);
      setBirdRotation(r => Math.min(r + 2, 90));
      
      setBirdY(y => {
        const newY = y + birdVelocity;
        if (newY > GAME_HEIGHT - BIRD_SIZE || newY < 0) {
          setGameOver(true);
          playGameOverSound();
          return y;
        }
        return newY;
      });

      setPipes(currentPipes => {
        const newPipes = currentPipes
          .map(pipe => ({ ...pipe, x: pipe.x - 3 }))
          .filter(pipe => pipe.x > -PIPE_WIDTH);

        newPipes.forEach(pipe => {
          if (!pipe.passed && pipe.x + PIPE_WIDTH < 50) {
            pipe.passed = true;
            setScore(s => {
              playScoreSound();
              return s + 1;
            });
          }

          const birdLeft = 50;
          const birdRight = 50 + BIRD_SIZE;
          const birdTop = birdY;
          const birdBottom = birdY + BIRD_SIZE;

          const pipeLeft = pipe.x;
          const pipeRight = pipe.x + PIPE_WIDTH;

          if (birdRight > pipeLeft && birdLeft < pipeRight) {
            if (birdTop < pipe.height || birdBottom > pipe.height + PIPE_GAP) {
              setGameOver(true);
              playGameOverSound();
            }
          }
        });

        return newPipes;
      });
    }, 20);

    return () => clearInterval(gameLoopRef.current);
  }, [gameStarted, gameOver, birdY, birdVelocity]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    pipeIntervalRef.current = setInterval(() => {
      const height = Math.random() * (GAME_HEIGHT - PIPE_GAP - 100) + 50;
      setPipes(p => [...p, { x: GAME_WIDTH, height, passed: false, emoji: currentObstacle }]);
    }, 2000);

    return () => clearInterval(pipeIntervalRef.current);
  }, [gameStarted, gameOver, currentObstacle]);

  useEffect(() => {
    if (gameOver && score > highScore) {
      setHighScore(score);
    }
  }, [gameOver, score, highScore]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-500 via-pink-500 to-orange-400 p-2 sm:p-4">
      <div className="mb-2 sm:mb-4 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2 drop-shadow-lg animate-pulse">
          🐔 Silly Flappy 🎪
        </h1>
        <div className="text-white text-lg sm:text-xl drop-shadow flex items-center justify-center gap-4">
          <span>Score: <span className="font-bold text-yellow-300">{score}</span></span>
          <span>Best: <span className="font-bold text-yellow-300">{highScore}</span></span>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition"
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        </div>
      </div>

      <div 
        className="relative bg-gradient-to-b from-sky-300 to-green-200 rounded-lg shadow-2xl overflow-hidden cursor-pointer touch-none"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
        onClick={jump}
        onTouchStart={(e) => {
          e.preventDefault();
          jump();
        }}
      >
        {/* Clouds */}
        <div className="absolute top-10 left-10 text-4xl animate-bounce" style={{ animationDuration: '3s' }}>☁️</div>
        <div className="absolute top-20 right-20 text-3xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>☁️</div>
        <div className="absolute top-40 left-1/2 text-5xl animate-bounce" style={{ animationDuration: '5s', animationDelay: '2s' }}>☁️</div>

        {/* Bird */}
        <div
          className="absolute transition-all duration-100"
          style={{
            width: BIRD_SIZE,
            height: BIRD_SIZE,
            left: 50,
            top: birdY,
            transform: `rotate(${birdRotation}deg)`,
            fontSize: BIRD_SIZE
          }}
        >
          🐔
        </div>

        {/* Pipes with funny emojis */}
        {pipes.map((pipe, i) => (
          <React.Fragment key={i}>
            {/* Top pipe */}
            <div
              className="absolute bg-gradient-to-b from-green-600 to-green-700 border-4 border-green-800 rounded-b-lg flex items-end justify-center pb-2"
              style={{
                left: pipe.x,
                top: 0,
                width: PIPE_WIDTH,
                height: pipe.height
              }}
            >
              <span className="text-2xl sm:text-3xl">{pipe.emoji}</span>
            </div>
            {/* Bottom pipe */}
            <div
              className="absolute bg-gradient-to-t from-green-600 to-green-700 border-4 border-green-800 rounded-t-lg flex items-start justify-center pt-2"
              style={{
                left: pipe.x,
                top: pipe.height + PIPE_GAP,
                width: PIPE_WIDTH,
                height: GAME_HEIGHT - pipe.height - PIPE_GAP
              }}
            >
              <span className="text-2xl sm:text-3xl">{pipe.emoji}</span>
            </div>
          </React.Fragment>
        ))}

        {/* Start screen */}
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="text-center text-white p-4">
              <p className="text-3xl sm:text-4xl font-bold mb-4 animate-bounce">🎮 TAP TO START! 🎮</p>
              <p className="text-base sm:text-lg">Help the silly chicken avoid obstacles!</p>
              <p className="text-sm sm:text-base mt-2">🐔 Tap screen or press Space to flap! 🐔</p>
            </div>
          </div>
        )}

        {/* Game over screen */}
        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
            <div className="text-center text-white p-4">
              <p className="text-4xl sm:text-5xl font-bold mb-2 animate-pulse">💥 BONK! 💥</p>
              <p className="text-2xl sm:text-3xl mb-4">Score: {score} 🏆</p>
              {score > highScore && <p className="text-xl text-yellow-300 mb-4 animate-bounce">🎉 NEW RECORD! 🎉</p>}
              <p className="text-base sm:text-lg">Tap to try again!</p>
            </div>
          </div>
        )}

        {/* Floating score indicators */}
        {gameStarted && !gameOver && score > 0 && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-4xl animate-ping">
            ⭐
          </div>
        )}
      </div>

      <div className="mt-2 sm:mt-4 text-white text-center drop-shadow">
        <p className="text-xs sm:text-sm">🎪 The silliest game ever! 🎪</p>
        <p className="text-xs sm:text-sm mt-1">Tap anywhere or press Space to flap!</p>
      </div>
    </div>
  );
};

export default FlappyGame;