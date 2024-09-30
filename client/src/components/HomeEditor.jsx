import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';

export default function HomeEditor({ h, code, doAnimate = true }) {
  const tabHeight = h;
  const [currentText, setCurrentText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const editorRef = useRef(null);
  const delay = 25; // Adjust delay for animation speed

  // Intersection Observer to detect visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      { threshold: 0.1 } // Trigger when 10% is visible
    );

    if (editorRef.current) {
      observer.observe(editorRef.current);
    }

    return () => {
      if (editorRef.current) {
        observer.unobserve(editorRef.current);
      }
    };
  }, []);

  // Animate the text character by character
  useEffect(() => {
    if (isVisible && doAnimate && currentText.length < code.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + code[currentText.length]);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, doAnimate, currentText, code, delay]);

  return (
    <div
      ref={editorRef}
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
    >
      <SyntaxHighlighter  lineProps={{style: {wordBreak: 'break-word', whiteSpace: 'pre-wrap' , }}}
        wrapLines={true}
        language="javascript" // Adjust to the language of the code
        showLineNumbers
        customStyle={{
          fontSize: doAnimate ? "1rem" : ".75rem",
          background: "#100821",
          height: `${tabHeight}rem`,
          maxHeight: "35rem",
          borderRadius: "1.5rem",
          width: "82vw"
        }}
        style={monokai}
      >
        {currentText}
      </SyntaxHighlighter>
    </div>
  );
}

HomeEditor.propTypes = {
  code: PropTypes.string.isRequired,
  h: PropTypes.number,
  doAnimate: PropTypes.bool
};
