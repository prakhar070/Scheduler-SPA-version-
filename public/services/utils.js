
const postData = async(url = '', data = {})=> {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',       
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer', 
      body: JSON.stringify(data)
    });
    const jsondata = await response.json();
    return jsondata;
}


const putData = async(url = '', data = {})=> {
    const response = await fetch(url, {
      method: 'PUT',
      mode: 'cors',       
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer', 
      body: JSON.stringify(data)
    });
    console.log("Response is ",response);
    const jsondata = await response.json();
    return jsondata;
}

const deleteData = async(url = '')=> {
    const response = await fetch(url, {
      method: 'DELETE',
      mode: 'cors',       
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer', 
    });
    const jsondata = await response.json();
    return jsondata;
}

const getData = async(url = '')=> {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',       
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer'
    });
    if(response.status == "401"){
        location.hash = "#login";

    }
    const jsondata = await response.json();
    return jsondata;
}

const getUsers  = async()=>{
    return await getData("/users")
}


// export this function
const parseRequestURL = ()=> {

    //it takes the location.hash which takes everything after # symbol in searchbar
    //if there is nothing after hash, just give it the value of '/'
    let url = location.hash.slice(1).toLowerCase() || '/';
    let r = url.split("/")
    //we assume that the url is of the form - #resources/identifier/verb
    // for eg #interviews/:id/members

    //create a request object with separate values for these fields
    let request = {
        resource    : null,
        id          : null,
        verb        : null
    }
    request.resource    = r[0]
    request.id          = r[1]
    request.verb        = r[2]

    //return that object
    return request
}

export default parseRequestURL
export {postData, getData, putData, deleteData, getUsers}