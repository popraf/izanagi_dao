import { Oval } from 'react-loader-spinner'

const Loader = () => {
    return (
      <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
        <Oval
            height={80}
            width={80}
            color="#F213A4"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#F213A4"
            strokeWidth={2}
            strokeWidthSecondary={2}
            />
        <p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center">Transaction is in progress <br /> Please wait...</p>
      </div>
    )
  }
  
  export default Loader