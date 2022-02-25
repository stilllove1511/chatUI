import clsx from 'clsx'

import style from './MessageItem.module.css'

function MessageItem ({isMe, children}) {
    return(
        <span className={clsx(style.msItem, isMe?style.isMe:'')}>
            {children}
        </span>
    )
}

export default MessageItem