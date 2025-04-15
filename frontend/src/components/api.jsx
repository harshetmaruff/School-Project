import { data, useNavigate } from "react-router";

export const apiurl = "http://127.0.0.1:8080"

// User Tokens
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

// Exchange Rates ------
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

// Bank -----
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

// Partner -----
export const getPartner = async (navigate) => {
    const Method = {
        method: 'GET',
        headers: {
           'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }

    try {
        const request = await fetch(apiurl + "/teams/partner", Method)

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

export const getVendor = async (navigate) => {
    const partnerdata = await getPartner(navigate)

    if (Array.isArray(partnerdata)) {
        let vendorData = [];

        for (let i = 0; i < partnerdata.length; i++) {
            if (partnerdata[i].partner_type == "Supplier") {
                vendorData.push(partnerdata[i])
            }            
        }

        return vendorData;
    }
    else {
        return [];
    }
}

export const getCustomer = async (navigate) => {
    const partnerdata = await getPartner(navigate)

    if (Array.isArray(partnerdata)) {
        let customerData = [];

        for (let i = 0; i < partnerdata.length; i++) {
            if (partnerdata[i].partner_type == "Customer") {
                customerData.push(partnerdata[i])
            }            
        }

        return customerData;
    }
    else {
        return [];
    }
}

export const getEmployee = async (navigate) => {
    const partnerdata = await getPartner(navigate)

    if (Array.isArray(partnerdata)) {
        let employeeData = [];

        for (let i = 0; i < partnerdata.length; i++) {
            if (partnerdata[i].partner_type == "Employee") {
                employeeData.push(partnerdata[i])
            }            
        }

        return employeeData;
    }
    else {
        return [];
    }
}

export const createPartner = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    }

    try {
        const request = await fetch(apiurl + "/teams/partner", Method)

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

export const editPartner = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    }

    try {
        const request = await fetch(apiurl + "/teams/partner/edit", Method)

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

export const removePartner = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    }

    try {
        const request = await fetch(apiurl + "/teams/partner/remove", Method)

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

// Address Types
export const getAddressType = async (navigate) => {
    const Method = {
        method: 'GET',
        headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }

    try {
        const request = await fetch(apiurl + "/teams/address/type", Method)
        const data = await request.json().catch(() => ({}))

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`)
            navigate("/")
        }

        if (request.ok) {
            return data
        }
    } catch (error) {
        console.error("Network error: ", error.message)
    }
}

export const createAddressType = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    }

    try {
        const request = await fetch(apiurl + "/teams/address/type", Method)
        const data = await request.json().catch(() => ({}))

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`)
            navigate("/")
        }

        if (request.ok) {
            return data
        }
    } catch (error) {
        console.error("Network error: ", error.message)
    }
}

export const editAddressType = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    }

    try {
        const request = await fetch(apiurl + "/teams/address/type/edit", Method)
        const data = await request.json().catch(() => ({}))

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`)
            navigate("/")
        }

        if (request.ok) {
            return data
        }
    } catch (error) {
        console.error("Network error: ", error.message)
    }
}

export const removeAddressType = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    }

    try {
        const request = await fetch(apiurl + "/teams/address/type/remove", Method)
        const data = await request.json().catch(() => ({}))

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`)
            navigate("/")
        }

        if (request.ok) {
            return data
        }
    } catch (error) {
        console.error("Network error: ", error.message)
    }
}

export const getAddress = async (navigate) => {
    const Method = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
    };

    try {
        const request = await fetch(apiurl + '/teams/address', Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate('/');
        }

        if (request.ok) {
            return data;
        }
    } catch (error) {
        console.error('Network error: ', error.message);
    }
};

// Address API
export const createAddress = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(Data),
    };

    try {
        const request = await fetch(apiurl + '/teams/address', Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate('/');
        }

        if (request.ok) {
            return data;
        }
    } catch (error) {
        console.error('Network error: ', error.message);
    }
};

export const editAddress = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(Data),
    };

    try {
        const request = await fetch(apiurl + '/teams/address/edit', Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate('/');
        }

        if (request.ok) {
            return data;
        }
    } catch (error) {
        console.error('Network error: ', error.message);
    }
};

export const removeAddress = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(Data),
    };

    try {
        const request = await fetch(apiurl + '/teams/address/remove', Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate('/');
        }

        if (request.ok) {
            return data;
        }
    } catch (error) {
        console.error('Network error: ', error.message);
    }
};

// Product Categories
export const getProductCategories = async (navigate) => {
    const Method = {
        method: 'GET',
        headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }

    try {
        const request = await fetch(apiurl + "/inventory/product/category", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
}

export const createProductCategory = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    }

    try {
        const request = await fetch(apiurl + "/inventory/product/category", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
}

export const editProductCategory = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    }

    try {
        const request = await fetch(apiurl + "/inventory/product/category/edit", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
}

export const removeProductCategory = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    }

    try {
        const request = await fetch(apiurl + "/inventory/product/category/remove", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
}

// Product API
export const getProducts = async (navigate) => {
    const Method = {
        method: 'GET',
        headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }

    try {
        const request = await fetch(apiurl + "/inventory/product", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
}

export const createProduct = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    }

    try {
        const request = await fetch(apiurl + "/inventory/product", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
}

export const editProduct = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    }

    try {
        const request = await fetch(apiurl + "/inventory/product/edit", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
}

export const removeProduct = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    }

    try {
        const request = await fetch(apiurl + "/inventory/product/remove", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
}

// Warehouse APIs
export const getWarehouses = async (navigate) => {
    const Method = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    };

    try {
        const request = await fetch(apiurl + "/inventory/warehouse", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const createWarehouse = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/inventory/warehouse", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const editWarehouse = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/inventory/warehouse/edit", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const removeWarehouse = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/inventory/warehouse/remove", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

// Inventory Stock API
export const getInventoryStock = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/inventory/stock", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const createInventoryStock = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/inventory/stock/create", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const editInventoryStock = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/inventory/stock/edit", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const removeInventoryStock = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/inventory/stock/remove", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

//Inventory Delivery API
export const getInventoryDelivery = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/inventory/delivery", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const editInventoryDelivery = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/inventory/delivery/edit", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const removeInventoryDelivery = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/inventory/delivery/remove", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

// Inventory Delivery Detail API
export const getInventoryDeliveryDetail = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/inventory/delivery/detail", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const createInventoryDeliveryDetail = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/inventory/delivery/detail/create", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const editInventoryDeliveryDetail = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/inventory/delivery/detail/edit", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const removeInventoryDeliveryDetail = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/inventory/detail/detail/remove", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

// Purchase Order APIs
export const getPurchaseOrder = async (navigate) => {
    const Method = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    };

    try {
        const request = await fetch(apiurl + "/purchase/order", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const getPurchaseOrderProvider = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/purchase/order/provider", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const createPurchaseOrder = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/purchase/order/create", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const editPurchaseOrder = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/purchase/order/edit", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const removePurchaseOrder = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/purchase/order/remove", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

// Purchase Order Detail API
export const getPurchaseOrderDetail = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/purchase/order/detail", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const createPurchaseOrderDetail = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/purchase/order/detail/create", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const removePurchaseOrderDetail = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/purchase/order/detail/remove", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

// Purchase Transfer APIs
export const getPurchaseTransfer = async (navigate) => {
    const Method = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    };

    try {
        const request = await fetch(apiurl + "/purchase/transfer", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const getPurchaseTransferWarehouse = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/purchase/transfer/warehouse", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const createPurchaseTransfer = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/purchase/transfer/create", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const editPurchaseTransfer = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/purchase/transfer/edit", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const removePurchaseTransfer = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/purchase/transfer/remove", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

// POS Shop API
export const getPOSShops = async (navigate) => {
    const Method = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    };

    try {
        const request = await fetch(apiurl + "/pos/shop", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const createPOSShop = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/pos/shop/create", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const editPOSShop = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/pos/shop/edit", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const removePOSShop = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/pos/shop/remove", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

// POS Shop Session API
export const getPOSShopSessions = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/pos/shop/session", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const createPOSShopSession = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/pos/shop/session/create", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const removePOSShopSession = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/pos/shop/session/remove", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

// POS Receipt APIs
export const getPOSReceipts = async (navigate) => {
    const Method = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    };

    try {
        const request = await fetch(apiurl + "/pos/receipt", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const createPOSReceipt = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/pos/receipt/create", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const editPOSReceipt = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/pos/receipt/edit", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const removePOSReceipt = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/pos/receipt/remove", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

// POS Receipt Item APIs
export const getPOSReceiptItems = async (navigate) => {
    const Method = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    };

    try {
        const request = await fetch(apiurl + "/pos/receipt/item", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const getPOSReceiptItemsByReceipt = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/pos/receipt/item/by_receipt", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const createPOSReceiptItem = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/pos/receipt/item/create", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const editPOSReceiptItem = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/pos/receipt/item/edit", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const removePOSReceiptItem = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/pos/receipt/item/remove", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

// Online Sales API
export const getOnlineSales = async (navigate) => {
    const Method = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    };

    try {
        const request = await fetch(apiurl + "/ecommerce/online-sale", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const getOnlineSalesByUser = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/ecommerce/online-sale/list/by_user", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const createOnlineSale = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/ecommerce/online-sale/create", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const editOnlineSale = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/ecommerce/online-sale/edit", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

export const removeOnlineSale = async (Data, navigate) => {
    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    };

    try {
        const request = await fetch(apiurl + "/ecommerce/online-sale/remove", Method);
        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        if (request.ok) return data;
    } catch (error) {
        console.error("Network error: ", error.message);
    }
};

// Financial Year
export const getFinancialYear = async (navigate) => {
    
    const Method = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }

    try {
        const request = await fetch(apiurl + "/accounts/financialyear", Method);

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

export const postFinancialYear = async (Data, navigate) => {

    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    }

    try {
        const request = await fetch(apiurl + "/accounts/financialyear", Method)

        const data = await request.json().catch(() => ({}));

        if (request.status === 401) {
            console.log(`Error 401: ${data.error || 'Unauthorized. Incorrect username or password.'}`);
            navigate("/");
        }

        
    }
    catch (error) {
        console.error("Network error:", error.message);
    }
}

export const editFinancialYear = async (Data, navigate) => {

    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    }

    try {
        const request = await fetch(apiurl + "/accounts/financialyear/edit", Method)

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

export const removeFinancialYear = async (Data, navigate) => {

    const Method = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(Data)
    }

    try {
        const request = await fetch(apiurl + "/accounts/financialyear/remove", Method)

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
