import { useEffect, useState } from "react";

type TypewriterTextProps = {
  text: string;
  speed?: number;
  pause?: number; // czas pauzy po pełnym wpisaniu/wymazaniu
};

const TypewriterText = ({
  text,
  speed = 100,
  pause = 1000,
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleTyping = () => {
      if (!isDeleting) {
        // Pisanie
        if (displayedText.length < text.length) {
          setDisplayedText(text.slice(0, displayedText.length + 1));
          timeout = setTimeout(handleTyping, speed);
        } else {
          // Pauza przed usuwaniem
          timeout = setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        // Usuwanie
        if (displayedText.length > 0) {
          setDisplayedText(text.slice(0, displayedText.length - 1));
          timeout = setTimeout(handleTyping, speed / 2);
        } else {
          // Pauza przed ponownym pisaniem
          timeout = setTimeout(() => setIsDeleting(false), pause);
        }
      }
    };

    timeout = setTimeout(handleTyping, speed);
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, text, speed, pause]);

  return (
    <div>
      {displayedText}
      <span className="blinking-cursor">|</span>
    </div>
  );
};

export default TypewriterText;
