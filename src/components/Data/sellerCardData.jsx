import React from "react";
import LoremIpsum,{fullname, username, Avatar} from "react-lorem-ipsum";
export const sellerData = [
    {
      image:Avatar('all'),
      name: username(),
      Distance: "1",
      status:"open",
      Rating:"4",
      serviceType:["bike", "car"],
      Address: [
        "2 hours of excercises",
        "Free consultaion to coaches",
        "Access to The Community",
      ],
      Description:React.createElement('div', {}, <LoremIpsum p={1}/>)
    },
    {
        image:Avatar('all'),
        name: username(),
        Distance: "2.5",
        status:"open",
        Rating:"4",
        serviceType:["bike", "car", "Truck", "BUS"],
        Address: [
          "2 hours of excercises",
          "Free consultaion to coaches",
          "Access to The Community",
        ],
        Description:React.createElement('div', {}, <LoremIpsum p={1}/>)
      },
      {
        image:Avatar('all'),
        name: username(),
        Distance: "20",
        status:"open",
        Rating:"4",
        serviceType:["bike", "car", "Truck", "BUS"],
        Address: [
          "2 hours of excercises",
          "Free consultaion to coaches",
          "Access to The Community",
        ],
        Description:React.createElement('div', {}, <LoremIpsum p={1}/>)
      },
  ];