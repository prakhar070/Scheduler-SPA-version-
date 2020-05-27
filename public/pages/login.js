import {postData} from "../services/utils.js"

const Login = {
    render: async () => {
        let view = `
        <div class="container mt-5">
        <div class="card bg-light">
            <article class="card-body mx-auto" style="max-width: 400px;">
                <h4 class="card-title mt-3 text-center">Login to your Account</h4>
                <small id="error"></small>
                <form class="form-group" name="loginform" >
                    Email <input type="email" name="email" class="form-control mb-3" placeholder="email" />
                    Password <input type="password" name="password" class="form-control mb-3" placeholder="password" />
                    <button type="button" class="btn btn-primary" id="submit"/>Log In</button>
                </form>
                <p class="text-center">Don't have an account already? <a href="#register">Register</a></p>
            </article>
        </div> 
        </div>`
        return view
    },
    after_render: async () => {
        document.getElementById("submit").addEventListener("click", (e) => {
            e.preventDefault();
            let data = {
                "user": {
                    "email": document.loginform.email.value,
                    "password": document.loginform.password.value
                }
            }
            postData("/auth/login", data).then((res) => {
                if(res.error){
                    document.getElementById("error").innerText = "Invalid credentials";
                }
                else{
                    localStorage.setItem("token", res.access_token);
                    document.getElementById("username").innerText =  res.username;
                    location.hash = "#interviews";
                }
            })
        })
    }
}
export default Login;
