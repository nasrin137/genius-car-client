import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import BokingsRow from "./BokingsRow";
// import { data } from "autoprefixer";
import axios from "axios";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";


const Bookings = () => {
    const {user}  = useContext(AuthContext);
    const [bookings,setBookings] = useState([]);
    const axiosSecure = UseAxiosSecure();

    // const url = `http://localhost:5000/bookings?email=${user?.email}`
    const url = `/bookings?email=${user?.email}`


    useEffect(()=>{

        axiosSecure.get(url)
        .then(res =>{
            setBookings(res.data);
        })
        // fetch(url)
        // .then(res =>res.json())
        // .then(data =>setbookings(data))
    },[url,axiosSecure]);

    const handleDelete = id =>{
        const proced = confirm(' WANT TO DELETE?')
        if(proced){
            fetch(`http://localhost:5000/bookings/${id}`,{
                method:'DELETE'
            })
            .then(res =>res.json())
            .then(data =>{
                console.log(data);
                if(data.deletedCount > 0){
                    alert('deleted Successfully');
                    const remaining = bookings.filter(booking =>booking._id !==id);
                    setBookings(remaining)
                }
            
            })
        }
    }
    const handelBookingConfirm = id =>{
        fetch(`http://localhost:5000/bookings/${id}`,{
            method:'PATCH',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({status:'confirm'})
        })
        .then(res =>res.json())
        .then(data =>{
            console.log(data);
            if(data.modifiedCount > 0){
                // update status
                const remaining = bookings.filter(booking =>booking._id !==id);
                const updated = bookings.find(booking =>booking._id ===id);
                updated.status = 'confirm';
                const newBookings = [updated,...remaining];
                setBookings(newBookings)
            }
        
        })
    }
    return (
        <div>
            <h3 className="text-5xl">Bookings:{bookings.length}</h3>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr className="text-bold text-xl">
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Image</th>
        <th>Service</th>
        <th>Date</th>
        <th>Price</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {
        bookings.map(booking =><BokingsRow 
            key={booking._id}
            booking={booking}
            handleDelete={handleDelete}
            handelBookingConfirm={handelBookingConfirm}></BokingsRow>)
      }
     
     
   
     
    </tbody>
  
    
  </table>
</div>
        </div>
    );
};

export default Bookings;