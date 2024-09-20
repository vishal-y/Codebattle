import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import PropTypes from 'prop-types'

function MainEditor({code}) {

  return (
    <div className='h-[90%]'>
        <CodeMirror
      value={code}
      height="100%"
      readOnly
      className='h-[90%] text-base border border-[#685a96]'
      theme={dracula}
      extensions={[javascript({ jsx: true })]}
    />
    </div>
  );
}
export default MainEditor;

MainEditor.propTypes = {
  code: PropTypes.string.isRequired,
};