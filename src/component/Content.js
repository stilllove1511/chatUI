
import {useState, useEffect, useRef} from 'react'
import Messgaes from './Messages'

const channels = [
  {
    id:1,
    userName: 'Linh'
  },
  {
    id:2,
    userName: 'My'
  },
  {
    id:3,
    userName: 'Mai Anh'
  }
]



function Content(){
    const inputRef = useRef()
    const buttonRef = useRef()
    const [channelId,setId]= useState(1)
    const [inputMessage, setInput] = useState({})
    const [messages, setMessages] = useState([])
    const handleSubmit = () => {
      setMessages(prev => [
        ...prev,
        inputMessage
      ])
      setInput({content:''})
      inputRef.current.focus()
    }
  
    useEffect(() => {
      inputRef.current.focus()
      const handleMassage = ({detail}) =>{
        setMessages(prev => prev.length < 20? [
            ...prev,
            {
              isFromMe: false,
              content:  detail
            }
        ]:[])
      }
      const handleClickSend = (e) => {
        if(e.keyCode===13){
          buttonRef.current.click()
        }
      }
      window.addEventListener(`channel-${channelId}`, handleMassage)
      window.addEventListener('keydown', handleClickSend)
      setMessages([])

      return () => {
        window.removeEventListener(`channel-${channelId}`,handleMassage)
        window.removeEventListener(`keydown`,handleClickSend)
      }
    },[channelId])

  return (
      <>
        <ul>
          {channels.map((channel) => (
            <li 
              key={channel.id} 
              style={{
                color:channel.id===channelId?
                  'red':
                  '#333'
                }} 
              onClick={() => {setId(channel.id)}}
            >
              Kênh {channel.id}
            </li>
          ))}
        </ul>
        <span> Tin nhắn: </span>
        <br/>
        <input
          ref={inputRef}
          value={inputMessage.content}
          onChange={e => setInput({isFromMe: true, content:e.target.value })}
        />
        <button ref={buttonRef} onClick={handleSubmit}>Add</button>
        <br/>
    
        {messages.map((message, index)=>(
            <>
                <Messgaes key={index}>
                  {message.isFromMe ? 
                    'Tôi: ':
                    channels[channelId-1].userName+': '} 
                  {message.content}
                </Messgaes>
                <br/>
            </>
        ))}
        
      </>
  );
}
      

export default Content