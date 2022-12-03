import axios from 'axios';
import React,{ useState,useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { env } from '../config';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function StudentDetails() {
  const [studentData,setStudentData] = useState([]);

  useEffect(() => {
    getStudent();
}, []);


  const getStudent = async () => {
    try { 
      let value = await axios.get(`${env.api}/student`);  
      setStudentData(value.data.data);
    } catch (error) {
        console.log(error);
    }
  };
 
  
  const handleDelete = async(id)=>{
    try { 
      let value = await axios.delete(`${env.api}/delete-student/${id}`);  
      const { data } = value;
      const { message, statusCode } = data;
      if (statusCode === 200) {
        getStudent();
        toast.success(message);
      } else {
          toast.warn(message);
      }
    } catch (error) {
        console.log(error);
    }
  }





  return (
    <div>

      <div className='table'>
      <h3 className='text-center'>Student Details</h3>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th> Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Mentor</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
     {
        studentData.length > 0  && studentData.map((item,index)=>{
          return  <tr>
          <td>{index + 1}</td>
          <td>{item.firstName} {item.lastName}</td>
          <td>{item.email}</td>
          <td>{item.mobile}</td>
          <td>{ item.mentorAssigned !== "unAssigned" ? (`${item.mentorAssigned.firstName} ${item.mentorAssigned.lastName}`) : (item.mentorAssigned)}</td>
          <td> <img src="./asset/delete.png" alt="delete"className='w' onClick={()=>handleDelete(item._id)}/></td>
        </tr>
         })
     }

      </tbody>
    </Table>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default StudentDetails