import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { addOrder } from "../Redux/actions";


export const Orders = () => {
  //  Get all data when admin logs in and populate it
  // store it in redux

  
  const data = useSelector((store) => store.order);

  const [Order, setOrder] = useState("");
  
  
    axios.post("http://localhost:8080/orders", info).then(()=>  getData())
    // console.log(data);
  


  const dispatch = useDispatch();
  const getData = () => {
    axios.get("http://localhost:8080/orders").then((res) => { 
      
      dispatch(
  addOrder(res.data)
  );
    })
  }


  useEffect(() => {
    getData()
  }, [])

    const handleChange=(e)=>{
  const {name,value}=e.target;

  setOrder({
      ...Order,
      [name]: value
  })

}


  return (
    <div>
      <div>
        <div>
          <select className="controls" name="progress" id="progress">
            <option value="id">ID</option>
            <option value="status">Status</option>
            <option value="cost">Cost</option>
          </select>
        </div>
        <table className="orders">
          <thead>
            <tr>
              <th>ID</th>
              <th>Problem</th>
              <th>Client Name</th>
              <th>Status</th>
              <th>Cost</th>
              <th>Change Status</th>
              <th>Accept</th>
            </tr>
          </thead>
          <tbody>
            <tr className="orders-row">
              <td className="id"></td>
              <td className="problem"></td>
              <td className="owner"></td>
              <td className="status"></td>
              <td className="cost"></td>
              <td className="change-status">
                {/* Show select dropdown only if status is Not Accepted */}
                <select className="changeStatus" name="changeStatus" onChange={handleChange}>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                  <option value="Not Accepted">Not Accepted</option>
                </select>
              </td>
              <td className="accept">
                {/* Show this button only if status is Not Accepted */}
                {/* on change make request to update it in db, and show changed status in table */}
                <button>Accept</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
