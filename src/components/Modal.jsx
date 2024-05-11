const Modal = ({isVisible,showModal,setShowModal,children}) => {
    if(!isVisible) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            <div className="w-full px-4 md:w-[650px] relative">
                <button onClick={()=> setShowModal(!showModal)} className="text-red-500 text-xl absolute -top-3 -right-3 bg-red-100 px-2 rounded-full">X</button>
                <div className="bg-white p-2 md:p-10 rounded">{children}</div>
            </div>
        </div>
    );
};

export default Modal;