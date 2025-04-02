import { useNavigate } from "react-router";

export const apiurl = "http://127.0.0.1:8080"


export const getUserToken = async (navigate, uname, pwd) => {
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
                navigate("/finance/journal")
            }
        } else {
            console.log(`Error: ${request.status} - ${data.error || 'Unknown error'}`);
            navigate("/")
        }

    } catch (error) {
        console.error("Network error:", error.message);
        navigate("/")
    }
}

export const getCurrency = async (navigate) => {
    
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

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/")
        }

        if (request.ok) {
            return data
        }

    } catch (error) {
        console.error("Network error:", error.message);
    }
}

export const postCurrency = async (Data, navigate) => {

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

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) {
            return value
        }
    }
    catch (error) {
        console.error("Network error:", error.message);
    }
}

export const editCurrency = async (Data, navigate) => {

    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    }

    try {
        const request = await fetch(apiurl + "/accounts/currency/edit", Method)

        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
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

export const removeCurrency = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    }

    try {
        const CurrencyRates = await getExchangeRate(Data, navigate)
        
        console.log(CurrencyRates)
        if(CurrencyRates.length) {
            for(let i = 0; i < CurrencyRates.length; i++) {
                removeExchangeRate(CurrencyRates[i])
            }
        }

        const request = await fetch(apiurl + "/accounts/currency/remove", Method)

        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) {
            return data;
        }
    }
    catch (error) {
        console.error("Network error:", error.message);
    }
}

export const getExchangeRate = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    }

    try {
        const request = await fetch(apiurl + "/accounts/get_exchange_rate", Method)

        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) {
            return data;
        }
    }
    catch (error) {
        console.error("Network error: ", error.message)
    }
}

export const postExchangeRate = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    }

    try {
        const request = await fetch(apiurl + "/accounts/exchange_rate", Method)

        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) {
            return data
        }
    }
    catch (error) {
        console.error("Network error:", error.message);
    }
}

export const editExchangeRate = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    }

    try {
        const request = await fetch(apiurl + "/accounts/exchange_rate/edit", Method)

        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
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

export const removeExchangeRate = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    }

    try {
        const request = await fetch(apiurl + "/accounts/exchange_rate/remove", Method)

        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) {
            return data;
        }
    }
    catch (error) {
        console.error("Network error:", error.message);
    }
}

export const listBank = async (navigate) => {
    const Method = {
        method: 'GET',
        headers: {
           'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }

    try {
        const request = await fetch(apiurl + "/accounts/bank", Method)

        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) {
            return data;
        }
    }
    catch(error) {
        console.error("Network error: ", error.message)
    }
}

export const addBank = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    }

    try {
        const request = await fetch(apiurl + "/accounts/bank", Method)

        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) {
            return data;
        }
    }
    catch(error) {
        console.error("Network error: ", error.message)
    }
}

export const editBank = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    }

    try {
        const request = await fetch(apiurl + "/accounts/bank/edit", Method)

        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) {
            return data;
        }
    }
    catch(error) {
        console.error("Network error: ", error.message)
    }
}

export const removeBank = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    }

    try {
        const request = await fetch(apiurl + "/accounts/bank/remove", Method)

        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) {
            return data;
        }
    }
    catch(error) {
        console.error("Network error: ", error.message)
    }
}