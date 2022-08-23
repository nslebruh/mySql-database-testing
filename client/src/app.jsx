import React, { useEffect } from "react"
import useState from "react-usestateref"
import { DebounceInput } from "react-debounce-input"
import axios from "axios"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import "./index.scss"

const App = () => {
    return (
        <BrowserRouter>
            <h1>
                Hello World
            </h1>
            <Link to="/createNewStudent"><button>createNewStudent</button></Link>
            <Link to="/createNewSubject"><button>createNewSubject</button></Link>
            <Link to="/updateStudent"><button>updateStudent</button></Link>
            <Link to="/searchForStudent"><button>searchForStudent</button></Link>
            <Routes>
                <Route path="/createNewStudent" element={<CreateNewStudent />} />
                <Route path="/createNewSubject" element={<CreateNewSubject />} />
                <Route path="/updateStudent" element={<UpdateStudent />} />
                <Route path="/searchForStudent" element={<SearchForStudent />} />
            </Routes>
        </BrowserRouter>
    )
}
const UpdateStudent = () => {

}

const CreateNewStudent = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [ssid, setSsid] = useState("");
    const [age, setAge] = useState(0);
    //const [house, setHouse] = useState("");
    const [year, setYear] = useState(0);
    const [grade, setGrade] = useState("");
    const [subjects, setSubjects] = useState([]);
    const [refreshData, setRefreshData] = useState(true);
    const [exSubjects, setExSubjects] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault()
        await axios.post("http://localhost:3001/createnew/student", {
            firstName: firstName,
            lastName: lastName,
            ssid: ssid, 
            age: age, 
            //house: house, 
            year: year,
            form: grade,
            subjects: subjects
        })
    }

    useEffect(() => {
        const getSubjectsData = async () => {
            const res = await axios.get("http://localhost:3001/getall/subjects")
            console.log(res.data)
            setExSubjects(res.data)
        }
        if (refreshData === true) {
            getSubjectsData()
            setRefreshData(false)
        }
    }, [refreshData])
    return (
        <React.Fragment>
        <h1>
            Create New Student
        </h1>
        <Form onSubmit={handleSubmit}>
            <Form.Select
            onChange={(e) => setSubjects([e.currentTarget.value, ...subjects])}
            placeholder="Subjects here"
            >
            <option>Subject here</option>    
            {!!exSubjects && exSubjects.length > 0
                ? 
                    exSubjects.map((data, i) => (
                        <option key={i} value={data.name}>
                            {data.name}
                        </option>
                    ))
                : 
                    <option disabled={true}>No Subjects</option>
            }
            </Form.Select>
            <Form.Control
                type="text"
                name="firstName"
                placeholder="First name here"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            >
            </Form.Control>
            <Form.Control
                type="text"
                name="lastName"
                placeholder="Last name here"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            >
            </Form.Control>
            <Form.Control
                type="text"
                name="age"
                placeholder="Age here"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            >
            </Form.Control>
            <Form.Control
                type="text"
                name="ssid"
                placeholder="Ssid here"
                value={ssid}
                onChange={(e) => setSsid(e.target.value)}
            >
            </Form.Control>
            <Form.Control
                type="text"
                name="year"
                placeholder="Year level here"
                value={year}
                onChange={(e) => setYear(e.target.value)}
            >
            </Form.Control>
            <Form.Control
                type="text"
                name="grade"
                placeholder="Grade here"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
            >
            </Form.Control>
            <Button type="submit" value="submit">Submit</Button>
        </Form>
        </React.Fragment>
        
        
    )
}

const CreateNewSubject = () => {
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [exStudents, setExStudents] = useState([])
    const [students, setStudents] = useState([])
    //const [teacher, setTeacher] = useState("")

    useEffect(() => {
        const getData = async () => {
            let res = await axios.get("http://localhost:3001/getdata/students")
            setExStudents(res.data)
        }
        getData()
    }, [])
    return (
        <React.Fragment>
            <h1>
                Create New Subject
            </h1>
            {!!exStudents && exStudents.length > 0 
                ?
                    exStudents.map((data, i) => (
                        <div key={i}>
                            {data.firstName}: {data.id}
                        </div>
                    ))
                :
                    null
            }
        </React.Fragment>
    )
}

const SearchForStudent = () => {
    const [fullName, setFullName] = useState("")
    const [data, setData] = useState()

    useEffect(() => {
        const getStudents = async () => {
            const params = {
                fullName: {
                    sortBy: {
                        type: "contains",
                        value: fullName
                    }
                }
            }
            let res = await axios.get("http://localhost:3001/get/student?params="+JSON.stringify(params))
            console.log(res.data)
            setData(res.data)
        }
        console.log(fullName)
        if (fullName === "") {
            return
        }
        getStudents()

    }, [fullName])
    return (
        <React.Fragment>
            <DebounceInput 
            minLength={2}
            debounceTimeout={300}
            onChange={event => setFullName(event.target.value)}
        />
        {fullName}
        <br/>
        {JSON.stringify(data)}
        </React.Fragment>
    )
}

export default App

