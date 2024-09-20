import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import PropTypes from 'prop-types';
import { useEffect , useState } from "react";


export default function HomeEditor({h , code , doAnimate=true }) {
  const tabHeight = h;
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const text = code;
  let delay = 0.00001;

  useEffect(() => {
    if (currentIndex < text.length && doAnimate) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
    else{
      setCurrentText(code)
    }
  }, [currentIndex, delay, text , doAnimate , code]);

  return (
     <SyntaxHighlighter  lineProps={{style: {wordBreak: 'break-word', whiteSpace: 'pre-wrap' , }}}
     wrapLines={true}  language="c++" showLineNumbers  customStyle={{fontSize : !doAnimate ? ".8vw" : "1rem" ,  background:"#100821" ,  height : `${tabHeight}rem` , maxHeight : "35rem" , borderRadius : doAnimate ? "1.5rem" : ".5rem" , width : !doAnimate ? "25vw" : null }} style={monokai}>
      {currentText}
    </SyntaxHighlighter>
  );
}
HomeEditor.propTypes = {
  code: PropTypes.string.isRequired,
  h: PropTypes.number,
  doAnimate : PropTypes.bool
};
