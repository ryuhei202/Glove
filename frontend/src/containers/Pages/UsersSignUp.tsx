
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { fetchpostUsers } from "../../apis/users_signup";
import { SignUpData } from "../../interfaces";
import { Header } from "../Templetes/Header";


  


export const UsersSignUp = (props:any) => {
  
  const navigate = useNavigate();

  const handleSuccessfulAuthentication = (data:any) => {
    // props.history.push("/dashboard")
    // navigate()
    console.log(data)
    props.handleLogin(data);
    navigate(`/groupchat/${data.user.language}`)


}

  const { register, handleSubmit, formState: { errors } } = useForm();     

  const onSubmit:SubmitHandler<any> = (data:SignUpData) => { 
    fetchpostUsers({
      name: data.name,
      gender: data.gender,
      language: data.language,
      email: data.email,
      password: data.password
    }).then(data => {
      //ユーザー作成に成功した後の処理
      // console.log(data)
      if (data.status === 'created' ) {
          handleSuccessfulAuthentication(data)
           }
}).catch(error => {
    console.log("registration error", error)
})
  
   }  

  return (
    
    <>
  <Header>sign up</Header>
    <form onSubmit={handleSubmit(onSubmit)}>

    <div className=" items-center px-5 lg:px-20">
        <div className="flex flex-col w-full max-w-md p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white rounded-lg md:mt-0">
            <div className="mt-8">
                <div className="mt-6">
                <div className="mb-6">
                    
                    <h2 className="mt-6 text-3xl font-extrabold text-neutral-600">Sign up.</h2>
                </div>

                <label className="mt-3 block text-sm font-medium text-neutral-600"> Name </label>
                <div className="mt-1">
                  <input placeholder="Your Name" className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" {...register('name', { required: true })} />
                  { errors.name && <span>名前は1文字以上</span> }
                </div>

        <label className="mt-3 block text-sm font-medium text-neutral-600"> Gender </label>
        <div className="mt-1">
        <select placeholder="Gender" className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" { ...register('gender', { required: true })} >
          <option value="man">Man</option>
          <option value="woman">Woman</option>
        </select>
        { errors.gender && <span>genderを選択してください</span> } 
        </div>

        <label className="mt-3 block text-sm font-medium text-neutral-600"> Language </label>
        <div className="mt-1">
        <select placeholder="Your Language" className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" { ...register('language', { required: true })} >
          <option value="japanese">japanese</option>
          <option value="chinese">chinese</option>
          <option value="english">english</option>
          <option value="russian">russian</option>
          <option value="romanian">romanian</option>
          <option value="lithuania">lithuania</option>
          <option value="latvian">latvian</option>
          <option value="portuguese">portuguese</option>
          <option value="polish">polish</option>
          <option value="bulgarian">bulgarian</option>
          <option value="french">french</option>
          <option value="finnish">finnish</option>
          <option value="hungarian">hungarian</option>
          <option value="turkish">turkish</option>
          <option value="german">german</option>
          <option value="danish">danish</option>
          <option value="czech">czech</option>
          <option value="slovenian">slovenian</option>
          <option value="slovakian">slovakian</option>
          <option value="spanish">spanish</option>
          <option value="swedish">swedish</option>
          <option value="greek">greek</option>
          <option value="dutch">dutch</option>
          <option value="estonian">estonian</option>
          <option value="ukrainian">ukrainian</option>
          <option value="indonesian">indonesian</option>
          <option value="italian">italian</option>
        </select>
        { errors.gender && <span>languageを選択してください</span> } 
        </div>

<label className="mt-3 block text-sm font-medium text-neutral-600"> Email </label>
      <div className="mt-1">
        <input placeholder="Your Email" className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" { ...register('email', { required: true })} />
        { errors.email && <span>Emailを入力してください</span> } 
    </div>

        <label className="mt-3 block text-sm font-medium text-neutral-600"> Password </label>
        <div className="mt-1">
        <input placeholder="Password" className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" { ...register('password', { required: true,minLength: 6 })} type="password"/>
        { errors.password && <span>6文字以上のPasswordを入力してください</span> } 
        </div>
        
     
        
        <div>
            <input type="submit" value="Sign up" className="mt-5 flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"></input>
        </div>
        </div>
        </div>
        </div>
        </div>
        
    </form></>
   
  )
}

