import React from "react";
import LoremIpsum,{fullname, username, Avatar} from "react-lorem-ipsum";

let currentDate= new Date()
console.log(currentDate.getDate(), 'currentDate')
function getRandumNumber(length) {
  const min = Math.pow(10, (length-1));
  const max = Math.pow(10, (length));
  return Math.floor(Math.random() * (max - min) + min);
}

export const sellerData = [
    { id:1,
      MobileNumber:getRandumNumber(10),
      image:Avatar('all'),
      name: username(),
      Distance: "1",
      status:"open",
      Rating:"4",
      serviceType:["bike", "car"],
      Address: [
        "Belhi",
        "near: Goverment School",
        "postal code:458001",
      ],
      Description:React.createElement('div', {}, <LoremIpsum p={1}/>),
      Feedback:[{name:username(), profile:"akdk", feedback:<LoremIpsum p={1}/>, date:currentDate}, {name:username(), feedback:<LoremIpsum p={1}/>},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate}]
    },
    { 
        id:2,
        MobileNumber:getRandumNumber(10),
        image:Avatar('all'),
        name: username(),
        Distance: "2.5",
        status:"open",
        Rating:"4",
        serviceType:["bike", "car", "Truck", "BUS"],
        Address: [
          "Belhi",
          "near: Goverment School",
          "postal code:458001",
        ],
        Description:React.createElement('div', {}, <LoremIpsum p={1}/>),
        Feedback:[{name:username(), profile:"akdk", feedback:<LoremIpsum p={1}/>, date:currentDate}, {name:username(), feedback:<LoremIpsum p={1}/>},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate}]

      
      },
      { 
        id:3,
        MobileNumber:getRandumNumber(10),
        image:Avatar('all'),
        name: username(),
        Distance: "20",
        status:"open",
        Rating:"4",
        serviceType:["bike", "car", "Truck", "BUS"],
        Address: [
          "Belhi",
          "near: Goverment School",
          "postal code:458001",
        ],
        Description:React.createElement('div', {}, <LoremIpsum p={1}/>),
        Feedback:[{name:username(), profile:"akdk", feedback:<LoremIpsum p={1}/>, date:currentDate}, {name:username(), feedback:<LoremIpsum p={1}/>},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate}]

      },

      { 
        id:4,
        MobileNumber:getRandumNumber(10),
        image:Avatar('all'),
        name: username(),
        Distance: "20",
        status:"open",
        Rating:"4",
        serviceType:["bike", "car", "Truck", "BUS"],
        Address: [
          "Belhi",
          "near: Goverment School",
          "postal code:458001",
        ],
        Description:React.createElement('div', {}, <LoremIpsum p={1}/>),
        Feedback:[{name:username(), profile:"akdk", feedback:<LoremIpsum p={1}/>, date:currentDate}, {name:username(), feedback:<LoremIpsum p={1}/>},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate}]

      },

      { 
        id:5,
        MobileNumber:getRandumNumber(10),
        image:Avatar('all'),
        name: username(),
        Distance: "20",
        status:"open",
        Rating:"4",
        serviceType:["bike", "car", "Truck", "BUS"],
        Address: [
          "Belhi",
          "near: Goverment School",
          "postal code:458001",
        ],
        Description:React.createElement('div', {}, <LoremIpsum p={1}/>),
        Feedback:[{name:username(), profile:"akdk", feedback:<LoremIpsum p={1}/>, date:currentDate}, {name:username(), feedback:<LoremIpsum p={1}/>},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate}]

      },

      { 
        id:6,
        MobileNumber:getRandumNumber(10),
        image:Avatar('all'),
        name: username(),
        Distance: "20",
        status:"open",
        Rating:"4",
        serviceType:["bike", "car", "Truck", "BUS"],
        Address: [
          "Belhi",
          "near: Goverment School",
          "postal code:458001",
        ],
        Description:React.createElement('div', {}, <LoremIpsum p={1}/>),
        Feedback:[{name:username(), profile:"akdk", feedback:<LoremIpsum p={1}/>, date:currentDate}, {name:username(), feedback:<LoremIpsum p={1}/>},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate}]

      },

      {
        id:7,
        MobileNumber:getRandumNumber(10),
        image:Avatar('all'),
        name: username(),
        Distance: "20",
        status:"open",
        Rating:"4",
        serviceType:["bike", "car", "Truck", "BUS"],
        Address: [
          "Belhi",
          "near: Goverment School",
          "postal code:458001",
        ],
        Description:React.createElement('div', {}, <LoremIpsum p={1}/>),
        Feedback:[{name:username(), profile:"akdk", feedback:<LoremIpsum p={1}/>, date:currentDate}, {name:username(), feedback:<LoremIpsum p={1}/>},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate}]

      },

      {
        id:8,
        MobileNumber:getRandumNumber(10),
        image:Avatar('all'),
        name: username(),
        Distance: "20",
        status:"open",
        Rating:"4",
        serviceType:["bike", "car", "Truck", "BUS"],
        Address: [
          "Belhi",
          "near: Goverment School",
          "postal code:458001",
        ],
        Description:React.createElement('div', {}, <LoremIpsum p={1}/>),
        Feedback:[{name:username(), profile:"akdk", feedback:<LoremIpsum p={1}/>, date:currentDate}, {name:username(), feedback:<LoremIpsum p={1}/>},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate}]

      },

      {
        id:9,
        MobileNumber:getRandumNumber(10),
        image:Avatar('all'),
        name: username(),
        Distance: "20",
        status:"open",
        Rating:"4",
        serviceType:["bike", "car", "Truck", "BUS"],
        Address: [
          "Belhi",
          "near: Goverment School",
          "postal code:458001",
        ],
        Description:React.createElement('div', {}, <LoremIpsum p={1}/>),
        Feedback:[{name:username(), profile:"akdk", feedback:<LoremIpsum p={1}/>, date:currentDate}, {name:username(), feedback:<LoremIpsum p={1}/>},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate}]

      },

      {
        id:10,
        MobileNumber:getRandumNumber(10),
        image:Avatar('all'),
        name: username(),
        Distance: "20",
        status:"open",
        Rating:"4",
        serviceType:["bike", "car", "Truck", "BUS"],
        Address: [
          "Belhi",
          "near: Goverment School",
          "postal code:458001",
        ],
        Description:React.createElement('div', {}, <LoremIpsum p={1}/>),
        Feedback:[{name:username(), profile:"akdk", feedback:<LoremIpsum p={1}/>, date:currentDate}, {name:username(), feedback:<LoremIpsum p={1}/>},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate}]

      },

      {
        id:11,
        MobileNumber:getRandumNumber(10),
        image:Avatar('all'),
        name: username(),
        Distance: "20",
        status:"open",
        Rating:"4",
        serviceType:["bike", "car", "Truck", "BUS"],
        Address: [
          "Belhi",
          "near: Goverment School",
          "postal code:458001",
        ],
        Description:React.createElement('div', {}, <LoremIpsum p={1}/>),
        Feedback:[{name:username(), profile:"akdk", feedback:<LoremIpsum p={1}/>, date:currentDate}, {name:username(), feedback:<LoremIpsum p={1}/>},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate}]

      },

      {
        id:12,
        MobileNumber:getRandumNumber(10),
        image:Avatar('all'),
        name: username(),
        Distance: "20",
        status:"open",
        Rating:"4",
        serviceType:["bike", "car", "Truck", "BUS"],
        Address: [
          "Belhi",
          "near: Goverment School",
          "postal code:458001",
        ],
        Description:React.createElement('div', {}, <LoremIpsum p={1}/>),
        Feedback:[{name:username(), profile:"akdk", feedback:<LoremIpsum p={1}/>, date:currentDate}, {name:username(), feedback:<LoremIpsum p={1}/>},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate}]

      },

      {
        id:13,
        MobileNumber:getRandumNumber(10),
        image:Avatar('all'),
        name: username(),
        Distance: "20",
        status:"open",
        Rating:"4",
        serviceType:["bike", "car", "Truck", "BUS"],
        Address: [
          "Belhi",
          "near: Goverment School",
          "postal code:458001",
        ],
        Description:React.createElement('div', {}, <LoremIpsum p={1}/>),
        Feedback:[{name:username(), profile:"akdk", feedback:<LoremIpsum p={1}/>, date:currentDate}, {name:username(), feedback:<LoremIpsum p={1}/>},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate},{name:username(), feedback:<LoremIpsum p={1}/>, date:currentDate}]

      },
  ];