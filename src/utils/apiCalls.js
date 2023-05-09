import axios from "axios";

export async function getAllUnallocated() {
    await axios.get("https://infinity-z1xv.onrender.com/api/unallocated", {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            alert("Error while fetching Unallocated tasks")
        })
}
export async function getAllallocated() {
    await axios.get("https://infinity-z1xv.onrender.com/api/allocated", {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            alert("Error while fetching Allocated tasks")
        })
}
export async function getSecificIssue(id) {
    await axios.get("http://infinity-z1xv.onrender.com/api/issue?id=" + id, {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => {
            return res.data[0]
        })
        .catch((error) => {
            alert("Error while fetching Allocated tasks")
        })
}
export async function assign(id, name) {
    await axios.post("https://infinity-z1xv.onrender.com/api/assign", {
        id: id,
        assignedTo: name
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            alert("Error while fetching Allocating task")
        })
}
export async function createIssue(body) {
    await axios.post("https://infinity-z1xv.onrender.com/api/create", body, {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => {
            alert("Successfully Created the issue")
            // return res.data
        })
        .catch((error) => {
            alert("Error while fetching Allocating task")
        })
}
export async function updateStatus(id, status) {
    await axios.post("https://infinity-z1xv.onrender.com/api/status", {
        id : id,
        status: status
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            alert("Error while fetching Allocating task")
        })
}


