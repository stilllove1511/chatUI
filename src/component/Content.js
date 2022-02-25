
import {useState, useEffect, useRef} from 'react'
import clsx from 'clsx';

import Messgaes from './Messages'
import style from '../componentCSS/Content.module.css'

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
      <div className={style.content} >
      
        {/* channel */}
        <div className={style.channels}>
          <ul className={clsx('p-0', 'm-0')}>
            {channels.map((channel) => (
              <li 
                className = {clsx(style.card, {
                  [style.active] : channel.id===channelId
                })}
                key={channel.id} 
                onClick={() => {setId(channel.id)}}
              >
                Kênh {channel.id}
              </li>
            ))}
          </ul>
        </div>
        
        {/* detail */}
        <div className={style.detail}>
          {/* input */}
          <div className={style.msInput}>
            <input
              ref={inputRef}
              className={style.msInputBar}
              value={inputMessage.content}
              onChange={e => setInput({isFromMe: true, content:e.target.value })}
            />
            <button className={style.msBtn} ref={buttonRef} onClick={handleSubmit}>GỬI</button>          
          </div>
          {/* messages */}
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
        </div>
        
      </div>
  );
}
      

export default Content