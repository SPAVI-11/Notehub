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

function EditUser() {

    const [state, setState] = useState(initialState);
    const {id} = useParams();
    console.log(id)
    let navigate = useNavigate();


    useEffect(()=>{

        axios.get(`http://localhost:5000/api/getUser/${id}`).then((result)=>{
            console.log(result.data);
            setState(result.data[0])
        }).catch((err)=>{
            alert("Error ");
            console.log(err);
        })

      

    },[])



    const handleInputChange = (e)=>{

        console.log(e.target);
        const {name,value} = e.target;

        setState({...state,[name] : value})
        console.log(state)

    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(state.title,state.description)
        console.log("good")
        if(!state.title || !state.description ){
            toast.error("Please provide all fields");
        }
        else{

            axios.post("http://localhost:5000/api/update",{
                id : id,
                title : state.title,
                description : state.description,
               
            }).then(()=>{
                setState({title : "" , description : "" })
            }).catch((err)=>{
                console.log(err)
            })
            toast.success("Contact added successfully")
            setTimeout(()=>{
                navigate('/');
            },1000)

        }


    }


  return (
    <div>

        <Container >
     
        <h2 style={{textAlign : "center", padding : "1% "}}> Add User</h2>
        <Card  className='card'>
    <form>




        <p htmlFor="name" className='center'>Title</p>
        <Form.Control
            className='size '
          
          name='title'
          placeholder='Title'
          value = {state.title}
          onChange={handleInputChange}
        />
<p htmlFor="name" className='center'>Description</p>
<Form.Control
className='size '
          id='email'
          name='description'
          placeholder='Description'
          value = {state.description}
          onChange={handleInputChange}
        />


         <Button variant="success" className='button1'  onClick={handleSubmit}>Update</Button>
        <Link to={"/"}><Button variant="secondary" className='button1'>Go Back</Button></Link> 
    </form>
    </Card>
    </Container>
    </div>


  )
}

export default EditUser