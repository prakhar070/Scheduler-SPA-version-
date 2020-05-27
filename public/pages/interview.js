import {postData} from "../services/utils.js"
import {getData,putData, getUsers} from "../services/utils.js"

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



        <div class="card mt-5 ">
            <div class="card-header">
                Details
            </div>
            <div class="card-body">
                <div id="interview"></div>
                <div id="participants">
                        <p class="mt-2" >Participants - </p>
                        <ul class="list-inline"></ul>
                </div>
                <hr />
            </div>
            <div class="card-footer">
                <div class="row">
                <div class="offset-md-1"></div>
                <div class="col-md-6">
                <h3 class="mt-1" >Change Interview Details</h3></h3>
                <hr />
                <form name="editForm" id="editForm" >
                    <small id="titleerror"></small>
                    <div class="form-group">
                        <label for="title">New title for the interview</label>
                        <input type="text" class="form-control" id="title" aria-describedby="titleHelp">
                        <small id="titleHelp" class="form-text text-muted">try to give a title that is appropriate.</small>
                    </div>

                    <small id="starttimeerror"></small>
                    <div class="form-group">
                        <label for="starttime">Change Start time the interview</label>
                        <input type="datetime-local" class="form-control" id="starttime">            
                    </div>

                    <small id="endtimeerror"></small>
                    <div class="form-group">
                        <label for="endtime">Change End time the interview</label>
                        <input type="datetime-local" class="form-control" id="endtime">            
                    </div>

                    <small id="participantserror"></small>
                    <div class="form-group">
                        <label for="participants">Add/Delete Participants</label>     
                        <select name="participants" class="form-control" multiple></select><br/><br/>       
                    </div>

                    <button type="submit" class="btn btn-secondary" id="submit">Edit</button>
                </form>
                </div>
                </div>
            </div>
        </div>
       `
        return view
    },
    after_render: async () => {
        const id = location.hash.slice(1).split('/')[1]
        const users = await getUsers();
        const interview = await getData(`/interviews/${id}`);
        let interviewHTML = `
        
        <div class="card" style="width: 40rem;">
            <div class="card-body">
                <h5 class="card-title">${interview.interview.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${new Date(interview.interview.starttime)} to ${new Date(interview.interview.endtime)}</h6>
                <p class="card-text">
                    <div id="interviewer">Interviewer - ${interview.interview.members.interviewer.name}</div>
                </p>
            </div>
        </div>`

        $("#interview" ).html(interviewHTML);
        users.users.map((user)=>{
            $('#editForm select').append(`<option value="${user.id}" id="option${user.id}">${user.name}</option>`)
        })
        
        interview.interview.members.participants.map((participant)=>{
            $("#participants ul").append(`<li>${participant.name} (${participant.email})</li>`);
            $(`select option[value=${participant.id}]`).attr('selected','selected');
        })

        //initalize values
        document.getElementById("title").value = interview.interview.title;
        document.getElementById("starttime").value = interview.interview.starttime.slice(0,-1);
        document.getElementById("endtime").value = interview.interview.endtime.slice(0,-1);

        //submitting the form
        $("#submit").click((e) => {
            e.preventDefault();
            let data = constructInterviewJSON()
            putData(`/interviews/${id}`, data).then((res)=>{
                if(res.error){
                    printErrors(res.error);
                }
                else{
                    location.reload();
                }
            })
        })
    }
}
export default Interviews;
