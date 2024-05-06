import { useEffect } from "react";
import { useState } from "react";
import ServiceCard from "./ServiceCard";


const Services = () => {
    const [ services,setServices] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/services')
        .then(res =>res.json())
        .then(data =>setServices(data))
    },[])
    return (
        <div className="mt-5">
            <div className="text-center">
                <h3 className="text-3xl font-bold text-orange-500">Our Service Area</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita beatae magni adipisci recusandae voluptatem doloribus dolorem tempora delectus explicabo consequatur.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <p>services: {services.length}</p>
                {
                    services.map(service =><ServiceCard
                    key={service._id}
                    service={service}></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;