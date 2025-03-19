import { useNavigate } from "react-router";

export const apiurl = "http://127.0.0.1:8080"


export const getUserToken = async (uname, pwd) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({
             username:  uname,
             password: pwd
            })
    }

    try {
        const request = await fetch(apiurl + "/login", Method);

        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            alert(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            return false;
        }

        if (request.ok) {
            if (data.token) {
                console.log("Token:", data.token);
                localStorage.setItem('token', data.token);
                return true
            }
        } else {
            console.log(`Error: ${request.status} - ${data.error || 'Unknown error'}`);
            return false
        }

    } catch (error) {
        console.error("Network error:", error.message);
        return false
    }
}

export const getCurrency = async () => {
    const navigate = useNavigate();

    const Method = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }

    try {
        const request = await fetch(apiurl + "/accounts/currency", Method);

        const data = await request.json().catch(() => ({}));

        if (request.status == 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/")
        }

        if (request.ok) {
            data.then(value => {
                return value
            })
        }

    } catch (error) {
        console.error("Network error:", error.message);
    }
}

export const postCurrency = async (Data) => {
    const navigate = useNavigate();

    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    }

    try {
        const request = await fetch(apiurl + "/accounts/currency", Method)

        const data = await request.json().catch(() => ({}));

        if (request.status = 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) {
            data.then(value => {
                return value
            })
        }
    }
    catch (error) {
        console.error("Network error:", error.message);
    }
}