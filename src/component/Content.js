
import {useState, useEffect, useRef} from 'react'
import clsx from 'clsx';

import MessageItem from './MessageItem'
import style from '../componentCSS/Content.module.css'

const channels = [
  {
    id:1,
    name: 'Linh'
  },
  {
    id:2,
    name: 'My'
  },
  {
    id:3,
    name: 'Mai Anh'
  }
]



function Content(){
    const inputRef = useRef()
    const buttonRef = useRef()
    const [channelId,setId]= useState(1)
    const [inputMessage, setInput] = useState({isMe: true, content:''})
    const [messageList, setmessageList] = useState([])
    const handleSubmit = () => {
      if(inputMessage.content==='') 
        return 1
      setmessageList(prev => [
        ...prev,
        inputMessage
      ])
      setInput({isMe:true, content:''})
      inputRef.current.focus()
    }
  
    useEffect(() => {
      inputRef.current.focus()
      const handleMassage = ({detail}) =>{
        setmessageList(prev => prev.length < 50? [
            ...prev,
            {
              isMe: false,
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
      setmessageList([])

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
            {channels.map((channel,index) => (
              <li 
                className = {clsx(style.card, {
                  [style.active] : channel.id===channelId
                })}
                key={index} 
                onClick={() => {setId(channel.id)}}
              >
                {channel.name}
              </li>
            ))}
          </ul>
        </div>
        
        {/* detail */}
        <div className={style.detail}>
          {/* stt bar */}
          <div className={style.sttBar}>
                {channels[channelId-1].name}
          </div>
          
          {/* ms container */}
          <div className={style.msContainer}>
            <div className={style.msWrapper}>
              {messageList.map((message, index)=>(
                  <>
                      <MessageItem key={index} isMe={message.isMe} >
                        {message.content}
                      </MessageItem>
                      <br/>
                  </>
              ))}
            </div>
          </div>

          {/* input */}

          <div className={style.msInput}>
            <input
              ref={inputRef}
              className={style.msInputBar}
              value={inputMessage.content}
              onChange={e => setInput({isMe: true, content:e.target.value })}
            />
            <button className={style.msBtn} ref={buttonRef} onClick={handleSubmit}>GỬI</button>          
          </div>
        </div>
        
      </div>
  );
}
      

export default Content