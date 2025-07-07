import React, { useState, useEffect } from 'react';
import '../index.css';
import first_date from '../assets/first_date.jpg';
import first_gift from '../assets/first_gift.jpg';
import first_meet from '../assets/first_meet.jpg';
import clicks from '../assets/memories.jpg';
import online from '../assets/online.jpg';
import admiring from '../assets/admiring.jpg'

const MemoriesWebsite = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [showProposal, setShowProposal] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonText, setNoButtonText] = useState("No");
  const [noClickCount, setNoClickCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  // Sample memories - you can replace these with your actual photos and memories
  const memories = [
    {
      id: 1,
      title: "Our First Meet",
      date: "The day that started it all",
      description: "The nervous butterflies, the shy smiles, and the moment we both knew something special was beginning.",
      image: first_meet,
      category: "First Times"
    },
    {
      id: 2,
      title: "Our First Eveving Walk",
      date: "June 5th, 2025",
      description: "My heart was racing, my palms were sweaty, but I knew I had to ask you to go out with me. Best decision ever! 💕",
      image: first_date,
      category: "Special Moments"
    },
    {
      id: 3,
      title: "Your First Gift To Me",
      date: "When a simple gift meant everything",
      description: "A flower, a huge smile, and a moment I'll never forget. It wasn't just a gift—it was a piece of your heart wrapped just for me.",
      image: first_gift,
      category: "Our Places"
    },
    {
      id: 4,
      title: "Together with you",
      date: "Another beautiful page in our story",
      description: "You, by my side, laughing at nothing and everything. I don’t remember the place, the time, or what we wore—but I remember how you made me feel.",
      image: clicks,
      category: "Cozy Moments"
    },
    {
      id: 5,
      title: "Your Beautiful Smile",
      date: "Every single day",
      description: "The way your eyes crinkle when you laugh, how your whole face lights up - it's my favorite view in the world.",
      image: online,
      category: "You"
    },
    {
      id: 6,
      title: "Our Adventures",
      date: "Just You",
      description: "Just admiring how pretty and beautigul you are.",
      image: admiring,
      category: "Adventures"
    }
  ];

  const timeline = [
  { date: "First Meeting", description: "The day our story began", emoji: "💫" },
  { date: "First Walk", description: "Getting to know each other", emoji: "🚶‍♂️" },
  { date: "First Gift", description: "A flower that spoke volumes", emoji: "🌸" },
  { date: "Confession Day", description: "June 8th - I told you I love you", emoji: "💕" },
  { date: "Now", description: "Still falling for you every day", emoji: "🥰" },
  { date: "Future", description: "Forever and always", emoji: "♾️" }
];


  const floatingHearts = () => {
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 3000);
  };

  const handleNoClick = () => {
    const funnyTexts = [
      "Are you sure? 🤔",
      "Think again! 😏",
      "Really? 🥺",
      "Come on! 😘",
      "Pretty please? 🙏",
      "Don't be shy! 💕",
      "You know you do! 😉",
      "Last chance! 💖",
      "Fine, I'll ask again! 😤"
    ];
    
    if (noClickCount < funnyTexts.length - 1) {
      setNoButtonText(funnyTexts[noClickCount]);
      setNoClickCount(noClickCount + 1);
      
      // Move the button to a random position
      const newX = Math.random() * 300 - 150;
      const newY = Math.random() * 200 - 100;
      setNoButtonPosition({ x: newX, y: newY });
    } else {
      // After many clicks, just say yes!
      handleYesClick();
    }
  };

  const handleYesClick = () => {
    setShowCelebration(true);
    setShowProposal(false);
    setTimeout(() => setShowCelebration(false), 5000);
  };

  const openProposal = () => {
    setShowProposal(true);
    setNoButtonPosition({ x: 0, y: 0 });
    setNoButtonText("No");
    setNoClickCount(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === memories.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [memories.length]);

  return (
    <div className="container">
      {/* Floating Hearts */}
      {showHearts && (
        <div className="heart-container">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="heart"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              💕
            </div>
          ))}
        </div>
      )}

     {/* Timeline Modal */}
      {showTimeline && (
  <div className="timeline-modal">
    <div className="timeline-content">
      <button className="close-timeline" onClick={() => setShowTimeline(false)}>✕</button>
      <h2>Our Love Timeline 💕</h2>
      <div className="timeline">
        {timeline.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-emoji">{item.emoji}</div>
            <div className="timeline-info">
              <h4>{item.date}</h4>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}


      {/* Proposal Modal */}
      {showProposal && (
        <div className="proposal-modal">
          <div className="proposal-content">
            <h2 className="proposal-title">💕 Do You Love Me? 💕</h2>
            <p className="proposal-question">
              Be honest with me... 🥺
            </p>
            <div className="proposal-buttons">
              <button 
                className="yes-button"
                onClick={handleYesClick}
              >
                Yes! 💖
              </button>
              <button 
                className="no-button"
                onClick={handleNoClick}
                style={{
                  transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`
                }}
              >
                {noButtonText}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Celebration Modal */}
      {showCelebration && (
        <div className="celebration-modal">
          <div className="celebration-emoji">🎉</div>
          <div className="celebration-text">
            I KNEW IT! 💕
          </div>
          <p className="celebration-message">
            You're stuck with me forever now! 😘
          </p>
          <div className="heart-container">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="heart"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              >
                {Math.random() > 0.5 ? '💕' : '🎉'}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Header */}
      <header className="header">
        <h1 className="title">Our Story</h1>
        <p className="subtitle">A collection of our most precious memories</p>
        <div 
          className="confession-date"
          onClick={floatingHearts}
        >
          💕 June 8th, 2025 - The Day I Told You I Love You 💕
        </div>
       <button className="menu-button" onClick={() => setShowTimeline(true)}>
          📅 Our Timeline
        </button>

      </header>

      {/* Memories Grid */}
      <section className="memories-grid">
        {memories.map((memory) => (
          <div
            key={memory.id}
            className="memory-card"
          >
            {/* <div className="category">{memory.category}</div> */}
            <img 
              src={memory.image} 
              alt={memory.title}
              className="memory-image"
            />
            <h3 className="memory-title">{memory.title}</h3>
            <p className="memory-date">{memory.date}</p>
            <p className="memory-description">{memory.description}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-message">
          "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
        </p>
        <p className="love-note">
          I am happy that i made the decision to visit Darjeeling this year, one of the best decision i ever made and it made me meet you. It's just one month now but many more to come, I wish you be by my side for my entire life time. Love you a lots chunnu 💕
        </p>
        <button 
          className="proposal-button"
          onClick={openProposal}
        >
          💕 Ask Me Something Special 💕
        </button>
      </footer>
    </div>
  );
};

export default MemoriesWebsite;