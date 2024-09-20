import CodeMirror from '@uiw/react-codemirror';
import { cppLanguage } from '@codemirror/lang-cpp';
import { dracula } from '@uiw/codemirror-theme-dracula';
import PropTypes from 'prop-types'

function MainEditor({socketRef , roomId , user , val }) {

  const handleChange = (e)=>{
    socketRef.current.emit('codechange',{
      user ,
      roomId,
      e //e acts as a code value here
    })
    val = e
    localStorage.setItem("code",val)
    console.log("bhai code change toh ro raha hai")
  }

  window.addEventListener('beforeunload', () => {
    localStorage.removeItem('code');
  });

  return (  
    <CodeMirror
    id='codeEdit'
      value={val}
      height='100%'
      className='h-full text-base border border-[#685a96] rounded-lg'
      theme={dracula}
      extensions={[cppLanguage]}
      onChange={handleChange}
    />
  );
}
export default MainEditor;

MainEditor.propTypes = {
  socketRef: PropTypes.object.isRequired,
  roomId: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  val: PropTypes.string.isRequired,
};