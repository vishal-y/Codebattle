import CodeMirror from '@uiw/react-codemirror';
// import { javascript } from '@codemirror/lang-javascript';
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
    console.log("bhai code change toh ro raha hai")
  }

  // useEffect(()=>{
  //   try{
  //     socketRef.current.on('code-change',({code})=>{
  //       if(code!==null){
  //         setCode_value(code)
  //         console.log("dk")
  //       }
  //       else{
  //         console.log('si')
  //       }
  //     })
  //   }
  //   catch(e){
  //     console.log("something went wrong" , e)
  //   }
  //   console.log("i am getting the data")
  // },[socketRef])

  return (  
    <CodeMirror
    id='codeEdit'
      value={val}
      height='100%'
      className='h-full text-base border border-[#685a96] rounded-lg'
      theme={dracula}
      // extensions={[javascript({ jsx: true })]}
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