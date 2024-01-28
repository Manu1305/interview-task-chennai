import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react';
import { saveAs } from "file-saver";
function Home() {


    const [users,setAlluser]=useState([])
     const allUsers = async () => {
       await axios
         .get("http://localhost:8000/user/allUsers")
         .then((res) => {
           console.log(res, "allusers");
           console.log(res.data,'newuserdtaf')
           setAlluser(res.data);
         })
         .catch((err) => {
           console.log(err);
         });
     };

   const downloadImage = (url, name) => {

     axios
       .get(url, { responseType: "blob" })
       .then((res) => {
         saveAs(res.data, name);
       })
       .catch((err) => {
         console.log(err);
       });
   };

      useEffect(() => {
        allUsers()
      },[]);
  return (
    <div>
      Home
      <div className="flex items-center justify-center mt-10 ">
        <table id="customers" className="">
          <tr>
            <th>name</th>
            <th>email</th>
            <th>image</th>
            <th>Action</th>
          </tr>
          {users &&
            users?.map((item) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <img
                    className="h-24 w-24"
                    src={require(`../../src/images/${item?.image}`)}
                  />
                </td>
                <td
                  onClick={() => {
                    downloadImage(
                      require(`../../src/images/${item?.image}`),
                      item.image
                    );
                  }}
                >
                  download
                </td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
}

export default Home