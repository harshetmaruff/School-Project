export const apiurl = "http://127.0.0.1:8080"


export const getUserToken = async (user_id) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    }

    const request = await fetch(apiurl + "/login", Method)

    const data = request.json()

    if(request.ok) {
        data.then(value => {
            console.log(value)
        })
    }
}