"use client"

const OperationResult = ({text}:{ text:string }) => {
    return(
        <div className="fixed top-1/3 left-1/2 -translate-x-1/2 px-12 py-2 rounded-xl bg-black bg-opacity-30 text-base text-white">{text}</div>
    )
}


export default OperationResult;