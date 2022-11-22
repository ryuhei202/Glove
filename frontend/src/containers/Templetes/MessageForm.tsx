import { useState } from "react";

export const MessageForm = (props:any) => {
 
  return(
<>
<form className="fixed bottom-0 left-0 right-0 h-20 z-10 rounded-lg">
<div className="flex border-t border-gray-200 p-5 bg-green-400 rounded-lg">

     <textarea className="border-4 mr-5 w-6/12" placeholder="メッセージを入力"  value={props.content} onChange={props.onChangeTextare}/>

  <label className="shadow-lg px-2 py-1 h-10 w-10 text-xs text-center  text-white font-semibold bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-sm hover:translate-y-0.5 transform transition ">
     <p>img</p>
     <input className="hidden"
             accept="image/*"
             type="file"
             onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
               props.uploadImage(e)
             }}
           />
  </label>
     <button className="mr-6 ml-auto shadow-lg px-2 py-1  text-lg text-white font-semibold  bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-sm hover:translate-y-0.5 transform transition " onClick={props.onSubmit} type="button">送信</button>
</div>
 </form> 
  </>
  )
}
