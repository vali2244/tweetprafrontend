/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Axios from "axios";
import Loader from "./Loader";
import { useEffect, useState } from "react";
const API="https://tweeterback11.onrender.com/api/v1/delete/tweet"
// const API = "http://localhost:3005/api/v1/delete/tweet";

const Card = ({ title, user, time, tweet, id }) => {

  const [Loading,SetLoading]= useState(false)
  const [Show_delete, Set_show_delete] = useState(false);

  const read_time = (e) => {
    const mytime = new Date(e);
    return mytime.toDateString();
  };


  const delet_tweet = async () => {
    await Axios.delete(`${API}/${tweet._id}`)
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          alert("tweet deleted");
          location.reload();
         
        }
      })
      .catch((err) => console.log(err));
      SetLoading(true)
    

  };

  const verify = () => {
    if (localStorage.getItem("user") === user) {
      Set_show_delete(true);

    }
  };

  useEffect(() => {
    verify();

  }, []);

  return (
    <>
    {Loading ? <Loader/> :
    <section className="w-[30%] phone:w-4/5 relative my-10 h-56  rounded-2xl flex flex-col bg-white shadow-2xl">
      <div className="w-full phone:w-full h-28 flex  ">
        {Show_delete ? (
          <button
            onClick={delet_tweet}
            className="absolute flex justify-center items-center top-1 right-3 bg-red-500 px-4 py-1 rounded-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        ) : (
          ""
        )}

        <div className="w-[25%] h-24  mt-2  rounded-full flex items-center justify-center">
          <div className="w-full h-24 flex items-center justify-center">
            <div className="relative">
              <img
                className="w-20 h-20  rounded-full object-cover "
                src="https://images.unsplash.com/photo-1689758410578-574c8f9eff2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                alt=""
              />
              <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
            </div>
          </div>
        </div>
        <div className="w-[50%] h-30 flex  flex-col ml-3 ">
          <span className="text-red-500 text-2xl font-bold mt-6 ml-4">
            {user}
          </span>
          <span className="text-[15px] ml-5 text-gray-800 ">
            {read_time(time)}
          </span>
        </div>
      </div>
      <div className="w-full h-32  flex justify-center ">
        {" "}
        <span className="w-full h-10 text-base pl-36 mt-5">{title}</span>
      </div>
    </section>
}
    </>
  );
};

export default Card;
