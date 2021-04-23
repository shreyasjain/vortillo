import React, { useState, useEffect } from 'react'
import userList from "../assets/user-list.json"
import userAvatar from "../assets/user-avatar.json"
import "../Styles/Home.css"
import { Link, useHistory } from "react-router-dom"
import { Jumbotron, Form, Card, Button } from "react-bootstrap"

function Home() {
    let history = useHistory()
    let temp = []
    if (localStorage.getItem("selected")) {
        temp = localStorage.getItem("selected").split(",").map(data => {
            return parseInt(data, 10)
        })
    }

    const [selected, updateSelected] = useState(temp)
    const [search, updateSearch] = useState(null)
    const [matchedList, updateMatchedList] = useState(userList)

    const getImage = (id) => {
        let arr = []
        arr = userAvatar.filter(data => data.id === id)
        return arr[0].avatar
    }

    const handleClick = (event, id) => {
        event.preventDefault()
        selected.includes(id) ? updateSelected(selected.filter(item => item != id)) : updateSelected(old => [...old, id])
    }

    const handleCancel = () => {
        updateSelected([])
        localStorage.removeItem("selected")
    }

    const handleSelect = () => {
        localStorage.removeItem("selected")
        localStorage.setItem("selected", selected)
        history.push("/selected")
    }

    useEffect(() => {
        let matched = userList.filter(data => data.full_name.toLowerCase().includes(search))
        updateMatchedList(matched)
    }, [search])

    return (
        <div className="home-container">
            <Jumbotron>
                <Form>
                <div className="home-head">
                    <h1>Select Users</h1>
                </div>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Search" onChange={e => updateSearch(e.target.value)} />
                    </Form.Group>
                </Form>
                <div className="home-body">
                    {search ?
                        matchedList.map(data => {
                            return (<div className={selected.includes(data.id) ? "elements active" : "elements"} key={data.id} onClick={e => handleClick(e, data.id)}>
                                <div><img src={getImage(data.id)} /></div>
                                <div className="element-name">{data.full_name}</div>
                            </div>)
                        })
                        : userList.map(data => {
                            return (<div className={selected.includes(data.id) ? "elements active" : "elements"} key={data.id} onClick={e => handleClick(e, data.id)}>
                                <div><img src={getImage(data.id)} /></div>
                                <div className="element-name">{data.full_name}</div>
                            </div>)
                        })
                    }
                </div>
                <div className="home-buttons">
                    <Button onClick={handleCancel} variant="secondary">Cancel</Button>{' '}
                    <Button onClick={handleSelect} variant="secondary">Select</Button>{' '}
                </div>
            </Jumbotron>
        </div>
    )
}

export default Home
