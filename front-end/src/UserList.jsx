import { useState, useRef, useEffect } from 'react'
import './assets/style.css'
import axios from "axios"

function UserList() {
  const addUserRef = useRef();
  const APIURL = import.meta.env.REACT_APP_API_BASE_URL;
  const [lists, setList] = useState([
    {id:"1", name: "virus"},
    {id:"2", name: "Ten"},
    {id:"3", name: "TG"}
  ]);
  function getUserList() {
    var config = {
      method: 'POST',
      headers: { 
				'Content-Type': 'application/json'
			},
      url: `${APIURL}/user/getUser`
    };
    axios(config)
    .then(async (response)=>{
      await setList(() => {return response.data.data});
    })
    .catch((error)=>{
        console.log(error)
    });
  }
  useEffect(()=>{
    getUserList();
  },[]);
  function handleEdit(userId, event) {
    if(event.target.value == "Change") {
      const config = {
        method:'post',
        url:`${APIURL}/user/updateUser`,
        headers: {
          'Content-Type': "application/json"
        },
        data:{
          userId:userId,
          username:event.target.parentElement.parentElement.children[0].innerText
        }
      }
      axios(config)
      .then(async(response)=>{
        if(response.data.data == "edit"){
          event.target.parentElement.parentElement.children[0].contentEditable = false;
          event.target.value = "Edit";
        }
        else {
          console.log("connection error");
        }
      })
      .catch((err)=>{
        console.error(err)
      })
    } else {
      event.target.parentElement.parentElement.children[0].contentEditable = true;
      event.target.parentElement.parentElement.children[0].focus()
      event.target.value = "Change";
    }
  }
  
  function handleDelete(userId,event) {
    event.target.parentElement.parentElement.children[0].contentEditable = false;
    const confirmed = window.confirm("Do you really delete this name?");
    if(confirmed) {
      const config  = {
        method:"post",
        url:`${APIURL}/user/deleteUser`,
        headers:{
          'Content-Type': 'application/json'
        },
        data:{
          userId: userId
        }
      }
      axios(config)
      .then(async (response) => {
        await getUserList();
        console.log(response.data.data)
      })
      .catch((error) => {
        console.error(error);
      });
    }
    console.log(userId)
  }
  function handleAdd() {
    const config = {
      method:"post",
      url:`${APIURL}/user/addUser`,
      headers:{
        'Content-Type':'application/json'
      },
      data:{
        username:addUserRef.current.value
      }
    }
    axios(config)
    .then(async (response)=>{
      await getUserList();
      addUserRef.current.value = ""
    }).catch((error)=>{
      console.error(error);
    });
  }
  return (
    <>
    <h2 className="user-title">User List</h2>
      <ul>
        {lists.map((user, index)=>{
          return(<li className="user-list" key={index}>
            <p contentEditable={false}>{user.name}</p> 
            <div> 
              <input type="button" onClick={()=>handleEdit(user._id, event)} value="Edit"/>
              <input type="button" onClick={()=>handleDelete(user._id,event)} value="Delete"/>
            </div>
          </li>)
        })}
        </ul>
      <section className="user-list">
        <input type="text" ref={addUserRef}/>
        <input type="button" onClick={handleAdd} value="add"/>
      </section>
    </>
  )
}

export default UserList
