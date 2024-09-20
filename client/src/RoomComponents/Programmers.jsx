import PropTypes from 'prop-types';

export default function Programmers({ clients , roomId , admin , socketRef , clientUsername }) {

    const handleScreenShare = (e) => {
        // let whoscode = e.currentTarget.textContent
        let whoscode = e.currentTarget.getAttribute("data-name");
        if ( localStorage.getItem("username") != whoscode  ) {
          socketRef.current.emit("share-code", { whoscode, clientUsername });
        }
      };

  return (
    <div className="p-4 h-[30%]">
              <p>Programmers :</p>
              <span className="grid md:grid-cols-3 lg:grid-cols-4 my-4">
                {clients.map((data, id) => {
                  return (
                    <div
                    data-name={data.username}
                      key={id}
                      className="flex flex-col justify-center items-center "
                      onClick={handleScreenShare}
                    >
                      {data.username==admin ? (
                        <p title={data.username == localStorage.getItem("username") ? "You are the admin " : data.username + " is the admin"} className="bg-violet-300 cursor-pointer text-black text-center h-10 w-fit px-2 flex justify-center items-center shadow-2xl rounded-md capitalize -300 flex-col ">
                          Admin
                        </p>
                      ) : (
                        <p title={data.username == localStorage.getItem("username") ? "You" : data.username} className={`${data.username == localStorage.getItem("username") ? "bg-slate-800 cursor-pointer border-2 border-violet-300 text-center h-10 w-fit px-2 flex justify-center items-center shadow-2xl rounded-md capitalize text-violet-300 flex-col " :
                        "bg-slate-800 cursor-pointer  text-center h-10 w-fit px-2 flex justify-center items-center shadow-2xl rounded-md capitalize text-violet-300 flex-col " }`}>
                          {data.username}
                        </p>
                      )}
                    </div>
                  );
                })}
              </span>

              <div className="cursor-pointer rounded-full text-center text-black bg-[#c4b5fd] p-3 flex justify-around items-center">
               
                <span>
                  {Array.from(roomId).map((letter, index) => {
                    return index < 15 ? letter : index > 18 ? null : ".";
                  })}
                </span>{" "}
                
                {/* <p className='text-xs'>{roomId}</p> */}

                <div className='flex justify-center items-center gap-2 bg-slate-700 text-white px-4 py-1 rounded-2xl cursor-pointer hover:scale-110 transition-all ease-linear duration-75'>copy id</div>
              
              </div>
             

              <hr className="border border-[#685a96] w-[100%] my-5 "></hr>
            </div>
  )
}

Programmers.propTypes = {
    clients: PropTypes.arrayOf(PropTypes.object).isRequired,
    roomId: PropTypes.string.isRequired,
    admin : PropTypes.string.isRequired,
    socketRef: PropTypes.object.isRequired,
    clientUsername : PropTypes.string.isRequired,
  };
  

