import React, { useState, useEffect } from 'react'
import * as ioicons from 'react-icons/io5'
import MyForm from './Form';

const ListStudents = () => {

    // this is my original state with an array of students 
    const [students, setStudents] = useState([]);

    const loadStudents = () => {
        // A function to fetch the list of students that will be load anytime that list change
        fetch("http://localhost:8080/api/students")
            .then((response) => response.json())
            .then((students) => {
                setStudents(students);
            });
    }

    useEffect(() => {
        loadStudents();
    }, []);

    const onSaveStudent = (newStudent) => {
        //console.log(newStudent, "From the parent - List of Students");
        setStudents((students) => [...students, newStudent]);
    }

    //A function to handle the Delete funtionality
    const onDelete = (student) => {
        console.log(student, "delete method")
        return fetch(`http://localhost:8080/api/students/${student.id}`, {
            method: "DELETE"
        }).then((response) => {
            //console.log(response);
            if (response.ok) {
                loadStudents();
            }
        })
    }



    return (
        <div className="list-students">
            <h2>Techtonica Participants </h2>
            <ul>
                {students.map((student) => {
                    return <li key={student.id}> <a student={student}> {student.firstname} {student.lastname} 
                    </a> <ioicons.IoTrash className={'myicon'} onClick={()=>{onDelete(student)}} />
                    <ioicons.IoSync className={'myicon'} /></li>
                })}
            </ul>
            <div>
                <MyForm onSaveStudent={onSaveStudent} />
            </div>
        </div>
    );
}


export default ListStudents