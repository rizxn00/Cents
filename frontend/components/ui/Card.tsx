// import React, { ReactNode } from 'react'

// type cardPropType = {
//     children: ReactNode
//     className?: string
// }

// export default function Card({ children, className }: cardPropType) {
//     return (
//         <div className={`bg-white w-full ${className} rounded-xl shadow-[0px_0.5px_8px_-5px_rgba(56,50,42,0.31)] p-3`}>
//             {children}
//         </div>
//     )
// }

import React, { ReactNode } from 'react'

type cardPropType = {
    children: ReactNode
    className?: string
}

export default function Card({ children, className }: cardPropType) {
    return (
        <div className={` ${className} rounded-xl hover:shadow-[0px_0.5px_8px_-3px_rgba(56,50,42,0.31)] bg-white dark:bg-zinc-900 px-5 py-5 dark:hover:shadow-zinc-800 dark:shadow-zinc-800 transition-all `}>
            {children}
        </div>
    )
}

