import React from 'react'
import { Jumbotron, Button } from 'react-bootstrap'
import userList from "../assets/user-list.json"
import userAvatar from "../assets/user-avatar.json"
import { useHistory } from "react-router-dom"
import "../Styles/Home.css"

function Selected() {
    let data = localStorage.getItem("selected").split(",")
    let history = useHistory()
    const handleBack = () => {
        history.push("/")
    }
    const getImage = (id) => {
        let arr = userAvatar.filter(data => data.id === parseInt(id))
        return arr[0].avatar
    }
    const getName = (id) => {
        let temp = userList.filter(data=>data.id === parseInt(id))
        return temp[0].full_name
    }
    return (
        <div className="selected-container">
            <Jumbotron>
                <div className="selected-head">
                    <h1>Selected Users</h1>
                </div>
                <div className="home-body">
                    {(data[0]!="") ? data.map(element => {
                        return (<div className="elements" key={element}>
                            <div><img src={getImage(element)} /></div>
                            <div className="element-name">{getName(element)}</div>
                        </div>)
                    }):
                    <div className="elements" >
                            <div className="element-name error">Nothing To Show.</div>
                        </div>
                    }</div>
                <div className="home-buttons">
                    <Button variant="secondary" onClick={handleBack}>Back</Button>{' '}
                </div>
            </Jumbotron>
        </div>
    )
}

export default Selected