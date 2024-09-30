import PropTypes from 'prop-types';

export default function Programmers({ clients , roomId , admin , socketRef , clientUsername }) {


    const handleScreenShare = (e) => {
        // let whoscode = e.currentTarget.textContent
        let whoscode = e.currentTarget.getAttribute("data-name");
        if ( localStorage.getItem("username") != whoscode  ) {
          socketRef.current.emit("share-code", { whoscode, clientUsername });
        }
      };

      console.log(roomId)

  return (
    <div className="px-2 pb-2 w-[96vw] border-b-2 mb-2 border-violet-600 overflow-x-scroll lg:w-auto lg:p-4 lg:pb-0 lg:pt-0 max-h-[80%] lg:max-h-[20%] lg:h-[20%]">
              <p className='sticky top-0 bg-[#100821] h-[2rem] flex items-end'>Programmers :</p>
              <span className="flex flex-wrap gap-2 mt-2">
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
  

