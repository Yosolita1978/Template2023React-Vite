import React, { useState } from 'react'
import { Button, Form } from "react-bootstrap"

const MyForm = (props) => {

    // This is the oroginal State with not initial student 
    const [student, setStudent] = useState({ 
        firstname: "", 
        lastname: "",
        iscurrent: false });

    //create functions that handle the event of the user typing into the form
    const handleNameChange = (event) => {
        const firstname = event.target.value;
        setStudent((student) => ({ ...student, firstname }));

    };

    const handleLastnameChange = (event) => {
        const lastname = event.target.value;
        setStudent((student) => ({ ...student, lastname }));
    };

    const handleCheckChange = (event) => {
        const iscurrent = event.target.checked;
        //console.log(iscurrent);
        setStudent((student) => ({ ...student, iscurrent }));
    };

    //A function to handle the post request
    const postStudent = (newStudent) => {
        return fetch("http://localhost:8080/api/students", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newStudent),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                //console.log("From the post ", data);
                props.onSaveStudent(data);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postStudent(student);
    };

    return (
        <Form className='form-students' onSubmit={handleSubmit}>
            <Form.Group>
            <Form.Label>First Name</Form.Label>
            <input
                type="text"
                id="add-user-name"
                placeholder="First Name"
                required
                value={student.firstname}
                onChange={handleNameChange}
            />
            </Form.Group>
            <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <input
                type="text"
                id="add-user-lastname"
                placeholder="Last Name"
                required
                value={student.lastname}
                onChange={handleLastnameChange}
            />
            </Form.Group>
            <Form.Check 
            type={'checkbox'}
            id={`isCurrent`}
            checked={student.isCurrent}
            onChange={handleCheckChange}
            label={`Are they in the current program?`}
          />
            <Button type="submit">Add a Student</Button>
        </Form>
    );
};


export default MyForm