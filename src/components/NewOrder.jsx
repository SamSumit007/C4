
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { addOrder } from "../Redux/actions";


export const NewOrder = () => {
  // Get data of only this user. store it in redux
  // GET /orders?owner_name=john will give you all order of user john
  
  //  on submit click create a new order, new order has status `Not Accepted`
  
  
  const [users, setusers] = useState("");
  const data = useSelector((store) => store.users);
  const [showUnfinished, setshowUnfinished] = useState(true)
 
  
  const handleUsers = () => {
    const info = {
      title: users,
      status: showUnfinished
    }
    
       axios.post("http://localhost:8080/users", info).then(()=>  getData())

  
  };

  const dispatch = useDispatch();
  const getData = () => {
    axios.get("http://localhost:8080/users").then((res) => { 
      
      dispatch(
  addOrder(res.data)
  );
    })
  }


  useEffect(() => {
    getData()
  }, [])
  
  const changeFn = () => {
    setshowUnfinished(!showUnfinished)
  }
  
  return (



    <div>
      <div className="form">
        <input
          className="new-problem"
          type="text"
          name="problem"
          placeholder="Enter problem"
          onChange={(e) => {
            setusers(e.target.value);
          }}
        />
        {/* This input is readonly, it's coming from redux */}
        <input
          className="owner-name"
          type="text"
          name="owner_name"
          placeholder="yourname"
          readOnly
        />
        <input
          className="brand"
          type="text"
          name="brand"
          placeholder="Enter brand name"
        />
        {/* Create new problem, show it in below form immediately */}
        <button className="submit" onClick={handleUsers}>submit</button>
      </div>

      <div className="pastOrders">
        {/* this button filters the data below. */}
        {/* it's just a toggle of redux state something like `showUnfinished`  */}
        <button className="filter" onClick={changeFn}>
          {showUnfinished ? "all" : "OnlyUnfinished"} 
          {/* Text should change like:   Show {showUnfinished ? "all" : "Onl uynfinished"} */}
        </button>

        {/* Here create a div for every oreder, filter them before based on `showUnfinished` */}
        <div className="past-orders">
          <span className="id"></span>. <span className="problem"></span>{" "}
          <span className="cost">
            {/* if status is not accepted then keep it empty otherwise show cost like $1234 */}
          </span>
          <p className="status">Status: </p>
          <hr />
        </div>
      </div>
    </div>
  );
};
