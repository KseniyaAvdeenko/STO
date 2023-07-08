const BASE_DJANGO_URL = 'http://localhost:8000';
const BASE_FASTAPI_URL = 'http://localhost:8083'



//-----------------------------DRF API---------------------------------
//============HTTP GET
export async function getUserProfile(token) {
    return await fetch(`${BASE_DJANGO_URL}/profile/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        }
    }).then(response => response.json());
};

export async function getTextAbout() {
    return await fetch(`${BASE_DJANGO_URL}/about/`).then(response => response.json())
};

export async function getProblems() {
    return await fetch(`${BASE_DJANGO_URL}/problems/`).then(response => response.json())
};

export async function getAdvantages() {
    return await fetch(`${BASE_DJANGO_URL}/advantages/`).then(response => response.json())
};

export async function getNtfMethods() {
    return await fetch(`${BASE_DJANGO_URL}/ntf_methods/`).then(response => response.json())
};

export async function getEmployees(token) {
    return await fetch(`${BASE_DJANGO_URL}/admin_site/employees/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        }
    }).then(res => res.json())
};

//============HTTP GET BY ID
export async function getEmployeeById(id, token) {
    return await fetch(`${BASE_DJANGO_URL}/admin_site/employees/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        }
    }).then(res => res.json())
};


//============HTTP  POST
export async function signUp(data) {
    return await fetch(`${BASE_DJANGO_URL}/auth/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data)
    })
};

export async function login(data) {
    return await fetch(`${BASE_DJANGO_URL}/auth/token/login/`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: "post",
        body: JSON.stringify(data)
    })
};

export async function logoutFetch(token) {
    return await fetch(`${BASE_DJANGO_URL}/auth/token/logout/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        },
        method: "post"
    })
};

export async function sendAppToTg(data) {
    return await fetch(`${BASE_DJANGO_URL}/service_app/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data)
    })
};

//============HTTP PUT
export async function editEmployee(id, token, data) {
    return await fetch(`${BASE_DJANGO_URL}/admin_site/employees/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Token ' + token
        },
        body: JSON.stringify(data)
    })
};

export async function editProfile(token, data){
    return await fetch(`${BASE_DJANGO_URL}/profile/`,{
        method: "PUT",
        headers:  {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Token ' + token
        },
        body: JSON.stringify(data)
    })
};

//============HTTP DELETE
export async function deleteEmployee(id, token) {
    return await fetch(`${BASE_DJANGO_URL}/admin_site/employees/${id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Token ' + token
        },
    })
};


//-------------------------FAST API---------------------------------------
//============HTTP GET
export async function getServiceTypes() {
    return await fetch(`${BASE_FASTAPI_URL}/service/`).then(response => response.json());
};

export async function getClients() {
    return await fetch(`${BASE_FASTAPI_URL}/clients/`).then(response => response.json())
};

export async function getOrders() {
    return await fetch(`${BASE_FASTAPI_URL}/service_orders/`).then(response => response.json())
};

//============HTTP GET BY ID
export async function getClientById(id) {
    return await fetch(`${BASE_FASTAPI_URL}/clients/${id}/`).then(response => response.json())
};

export async function getServiceById(id) {
    return await fetch(`${BASE_FASTAPI_URL}/service/${id}/`).then(response => response.json())
};

export async function getOrderById(id) {
    return await fetch(`${BASE_FASTAPI_URL}/service_orders/${id}/`).then(response => response.json())
};

//============HTTP POST
export async function createService(data) {
    return await fetch(`${BASE_FASTAPI_URL}/create_service/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data)
    })
};

export async function createClientWithCar(data) {
    return await fetch(`${BASE_FASTAPI_URL}/create_client/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data)
    })
};

export async function createOrder(data) {
    return await fetch(`${BASE_FASTAPI_URL}/create_order/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data)
    })
};

//============HTTP PUT
export async function editService(id, data) {
    return await fetch(`${BASE_FASTAPI_URL}/edit_service/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data)
    })
};
export async function editClient(id, data) {
    return await fetch(`${BASE_FASTAPI_URL}/edit_client/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data)
    })
};
export async function editOrder(id, data) {
    return await fetch(`${BASE_FASTAPI_URL}/edit_order/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data)
    })
};

//============HTTP DELETE
export async function deleteService(id) {
    return await fetch(`${BASE_FASTAPI_URL}/delete_service/${id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })
};
export async function deleteClient(id) {
    return await fetch(`${BASE_FASTAPI_URL}/delete_client/${id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })
};
export async function deleteOrder(id) {
    return await fetch(`${BASE_FASTAPI_URL}/delete_order/${id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })
};


