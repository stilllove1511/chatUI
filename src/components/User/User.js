
import clsx from 'clsx'

import style from './User.module.css'

function User({data, isActived}) {
    return(
        <span 
            className = {clsx(style.card, {
                [style.active] : isActived
            })}
        >
            {data.name}
        </span>
    )
}
export default User