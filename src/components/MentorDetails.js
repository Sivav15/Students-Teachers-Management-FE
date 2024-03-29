import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { env } from '../config';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import EditMentorModel from './EditMentorModel';
import Loading from './loading/Loading';
import Delete from '../delete.png'

function MentorDetails() {
  const [mentorData, setMentorData] = useState([]);
  // const [modalShow, setModalShow] = useState(false);
  // // const [data,setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMentor();
  }, []);
  const getMentor = async () => {
    try {
      setLoading(true);
      let value = await axios.get(`${env.api}/mentor`);
      setMentorData(value.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      let value = await axios.delete(`${env.api}/delete-mentor/${id}`);
      const { data } = value;
      const { message, statusCode } = data;
      if (statusCode === 200) {
        getMentor();
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
        <h3 className='text-center'>Mentor Details</h3>
        {
          loading ? <div className='d-flex justify-content-center align-items-center'> <Loading width={"3.4rem"} /> </div> :
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th> Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Students</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
{
  
mentorData.length === 0 && mentorData ? <tr className='text-danger'>No mentor created</tr> :
mentorData.length > 0 && mentorData.map((item, index) => {
  return <tr>
    <td>{index + 1}</td>
    <td>{item.firstName} {item.lastName}</td>
    <td>{item.email}</td>
    <td>{item.mobile}</td>
    <td>

      {

        item.studentsAssigned.map((items, index) => {
          return <> {item.studentsAssigned && item.studentsAssigned.length !== 0 ? (<tr> {items.firstName} {items.lastName} </tr>) : (<tr>unAssigned</tr>)} </>
        })
      }
    </td>
    <td><img src={Delete} alt="delete" className='w' onClick={() => handleDelete(item._id)} /></td>
  </tr>
})
}
                {/* <img src="./asset/edit.png" alt="edit"  className='w'  onClick={() =>{ setModalShow(true) ; setData(item)}}/> */}
              </tbody>
            </Table>
        }
      </div>
      <ToastContainer />
      {/* <EditMentorModel show={modalShow}
       data = {data}
        onHide={() => setModalShow(false)}
        update = {getMentor}
        /> */}
    </div>
  )
}

export default MentorDetails