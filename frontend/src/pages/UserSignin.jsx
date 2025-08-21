import Signin from "../components/Signin";

function UserSignin() {
  return(
    <div className="w-screen">
       <h1 className='text-4xl  text-gray-500 font-bold text-center my-5'>Sign in as User.</h1>
        <div className="flex flex-col items-center lg:flex-row lg:justify-center">
          <img className="md:h-108" src="../../public/login.png" alt="" />
          <Signin text={"Captain"} color={"bg-[#10b461]"} toPage={"/captain-signin"} />
    </div>
    </div>
    

  )
}

export default UserSignin;
