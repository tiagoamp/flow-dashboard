import React from 'react'

export default function ProgressBar(props) {
    return (
        <div className="progress-bar">
            <Filler percentage={props.percentage} />
        </div>
  )
}

const Filler = (props) => {
    return <div className="filler" style={{ width: `${props.percentage}%` }} />
}