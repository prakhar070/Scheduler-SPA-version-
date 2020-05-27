import {postData} from "../services/utils.js"

const Register = {
    render: async () => {
        let view = `
        <div class="container mt-5">
        <div class="card bg-light">
            <article class="card-body mx-auto" style="max-width: 400px;">
                <h4 class="card-title mt-3 text-center">Create Account</h4>
                <p class="text-center">Get started with your free account</p>
                <form class="form-group" name="registerform" >
                    Name <small class="error" id="name"></small><br/> <input type="text" class="form-control mb-3" name="name" placeholder="name" />
                    Email <small class="error" id="email"></small><br/><input type="email" name="email" class="form-control mb-3" placeholder="email" />
                    Password <small class="error" id="password"></small><br/><input type="password" name="password" class="form-control mb-3" placeholder="password" />
                    Confirm Password <small class="error" id="password_confirmation"></small><br/><input type="password" name="password_confirmation" class="form-control mb-3" placeholder="retype password" />
                    <button type="button" class="btn btn-primary" id="submit"/>Sign Up</button>
                </form>
                <p class="text-center">Have an account? <a href="#login">login</a></p>
            </article>
        </div> 
        </div>
       `
        return view
    },

    after_render: async () => {
        document.getElementById("submit").addEventListener("click", (e) => {
            e.preventDefault();
            let data = {
                "user": {
                    "name": document.registerform.name.value,
                    "email": document.registerform.email.value,
                    "password": document.registerform.password.value,
                    "password_confirmation": document.registerform.password_confirmation.value
                }
            }
            postData("/auth/register", data).then((res) => {
                if(res.error){
                    printErrors(res.error)
                }
                else{
                    location.hash = "#login";
                }
            })
        })
        const printErrors = (error)=>{
            if(error.email){
                document.getElementById("email").innerText = error.email[0];
            }
            if(error.name){
                document.getElementById("name").innerText = error.name[0];
            }
            if(error.password){
                document.getElementById("password").innerText = error.password[0];
            }
            if(error.password_confirmation){
                document.getElementById("password_confirmation").innerText = error.password_confirmation[0];
            }
        }
    }
}

export default Register;
