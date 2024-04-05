import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import Container from 'react-bootstrap/esm/Container'
import Card from 'react-bootstrap/Card';
import "./addUser.css"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

const initialState = {
    name : "",
    email : "",
    contact : "",
}

function ViewUser() {

    const [state, setState] = useState(initialState);
    const {id} = useParams();
    console.log(id)
   


    useEffect(()=>{

        axios.get(`http://localhost:5000/api/getUser/${id}`).then((result)=>{
            console.log(result.data);
            setState(result.data[0])
        }).catch((err)=>{
            alert("Error ");
            console.log(err);
        })
    },[])



   

  return (
    <div>

        <Container >
     
        <h2 style={{textAlign : "center", padding : "1% "}}> View User</h2>
        <Card  className='card' style={{textAlign : "center"}}>
        <p> Name : {state.name}</p>
        <p> Email : {state.email}</p>
        <p> Contact : {state.contact}</p>
        <Link to={"/"}><Button variant="secondary" className='button1'>Go Back</Button></Link> 
    </Card>
    </Container>
    </div>


  )
}

export default ViewUser