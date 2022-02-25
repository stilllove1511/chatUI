
import {useState, useEffect, useRef} from 'react'
import clsx from 'clsx';

import User from '../User/User';
import MessageItem from '../MessageItem/MessageItem'
import style from './MessengerContent.module.css'

const userList = [
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



function MessageContent(){
    const inputRef = useRef()
    const buttonRef = useRef()
    const milestones = useRef()
    const [activeId,setId]= useState(1)
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
      milestones.current.scrollIntoView()
      console.log(milestones.current)
    }
  
    useEffect(() => {
      inputRef.current.focus()
      const handleMessage = ({detail}) =>{
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
      
      window.addEventListener(`user-${activeId}`, handleMessage)
      window.addEventListener('keydown', handleClickSend)
      setmessageList([])

      return () => {
        window.removeEventListener(`user-${activeId}`,handleMessage)
        window.removeEventListener(`keydown`,handleClickSend)
      }
    },[activeId])

  return (
      <div className={style.content} >
      
        {/* user list */}

        <div className={clsx('p-0', 'm-0',style.userList)}>
          {
            userList.map((user) => (
              <span onClick = {()=> {
                setId(user.id)
                console.log(activeId)
              }}>
                <User 
                  key={user.id} 
                  data={user} 
                  isActived={user.id===activeId?true:false} 
                />
              </span>
            ))
          }
        </div>
        
        {/* message list */}
        <div className={style.messageList}>
          
          {/* stt bar */}
          <div className={style.sttBar}>
                {userList[activeId-1].name}
          </div>
          
          {/* message container */}
          <div className={style.messageContainer}>
            <div className={style.messageWrapper}>
              {messageList.map((message, index)=>(
                  <>
                      <MessageItem key={index} isMe={message.isMe} >
                        {message.content}
                      </MessageItem>
                  </>
              ))}
            </div>
            <div ref={milestones}></div>
          </div>

          {/*message input */}
          <div className={style.messageInput}>
            <input
              ref={inputRef}
              className={style.messageInputBar}
              value={inputMessage.content}
              onChange={e => setInput({isMe: true, content:e.target.value })}
            />
            <button className={style.messageBtn} ref={buttonRef} onClick={handleSubmit}>GỬI</button>          
          </div>
        </div>
        
      </div>
  );
}
      

export default MessageContent