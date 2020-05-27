import {postData} from "../services/utils.js"
import {getData, getUsers, deleteData}  from "../services/utils.js"

const parseDate = (date)=>{
    let d = new Date(date);
    let str = d.toLocaleString();
    str = str.substring(0,str.lastIndexOf(':'));
    return str;
}
const constructInterviewJSON = ()=>{
    let data = {
            "interview": {
                "title": $("#title").val(),
                "starttime": $("#starttime").val(),
                "endtime": $("#endtime").val(),
                "participants":$("select").val() ,
            }
    }
    return data;
}

const printErrors = (error)=>{
    if(error.title){
        $("#titleerror").text(error.title)    
    }

    if(error.starttime){
        $("#starttimeerror").text(error.starttime)
    }
    if(error.endtime){
        $("#endtimeerror").text(error.endtime)
    }
    if(error.participants){
        $("#participantserror").text(error.participants)
    }
}

const Interviews = {
    render: async () => {
        let view = `
        <div class="container mt-5">
        <div class="row>
        <div class="offset-md-3"></div>
        <div class="col-md-6>
        <div class="card">
            <div class="card-header text-center">
                <h3>Create an Interview</h3>
            </div>
            <div class="card-body">
                <form name="createForm" id="createForm" >
                    <small id="titleerror"></small>
                    <div class="form-group">
                        <label for="title">A title for the interview</label>
                        <input type="text" class="form-control" id="title" aria-describedby="titleHelp">
                        <small id="titleHelp" class="form-text text-muted">try to give a title that is appropriate.</small>
                    </div>

                    <small id="starttimeerror"></small>
                    <div class="form-group">
                        <label for="starttime">Start time the interview</label>
                        <input type="datetime-local" class="form-control" id="starttime">            
                    </div>

                    <small id="endtimeerror"></small>
                    <div class="form-group">
                        <label for="endtime">End time the interview</label>
                        <input type="datetime-local" class="form-control" id="endtime">            
                    </div>

                    <small id="participantserror"></small>
                    <div class="form-group">
                        <label for="participants">Choose Participants</label>     
                        <select name="participants" class="form-control" multiple></select><br/><br/>       
                    </div>

                    <button type="submit" class="btn btn-secondary" id="submit">Create</button>
                </form>
            </div>
            <div class="card-footer text-muted">
                <h3 class="text-center">Pending Interviews</h3><hr />
                <div class="row container-fluid" id="interviews"></div>
            </div>
        </div>
        </div>
        <div class="offset-md-3"></div>
        </div>
        </div>
        <hr/>`
        
        return view
    },
    after_render: async () => {
        const users = await getUsers();
        const interviews = await getData(`/interviews`);
        interviews.interviews.sort((a, b) => (a.starttime > b.starttime) ? 1 : -1)
        interviews.interviews.map((interview)=>{
            let html = `
                <div class="card text-white bg-dark mx-3 my-3" style="max-width: 18rem;">
                    <div class="card-header">${interview.title}</div>
                    <div class="card-body">
                            <small class="card-title">Start time - ${parseDate(interview.starttime)} </small><br/>
                            <small class="card-title">End time - ${parseDate(interview.endtime)}</small>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted"><a class="text-white bg-dark" href="#interviews/${interview.id}">Details</a></small>
                        <small interviewId="${interview.id}" style="float:right" class="delete" class="text-muted">Delete</small>
                    </div>
                </div>`;
            $("#interviews").append(html);
        })

        users.users.map((user)=>{
            $('#createForm select').append(`<option value="${user.id}" id="option${user.id}">${user.name}</option>`)
        })

        $("#submit").click((e) => {
            e.preventDefault();
            console.log("hello");
            let data = constructInterviewJSON()
            console.log(data);
            postData("/interviews", data).then((res)=>{
                if(res.error){
                    console.log(res.error);
                    printErrors(res.error);
                }
                else{
                    location.reload();
                }
            })
        })

        $(".delete").click((e)=>{
            e.preventDefault();
            const id = e.target.getAttribute("interviewId")
            deleteData(`/interviews/${id}`).then((res)=>{
                if(res.error){
                    console.log(res.error);
                }
                else{
                    location.reload();
                }
            })
        })

    }
}

const deleteInterview = (e)=>{
    console.log("hello");
}
export default Interviews;
