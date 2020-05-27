#controller to maintain the requests related to interviews
class InterviewsController < ApplicationController
    before_action :authenticate_request
    
    def index
        #fetch the interviews which either the user has created, or is a participant in
        @interviews = fetch_interviews_for_user
        render json: {interviews: @interviews} , status: :ok
    end

    def show
        @interview = Interview.find(params[:id])
        response = {
            interview:{
                title: @interview.title,
                starttime: @interview.starttime,
                endtime: @interview.endtime,
                members: {
                    interviewer: @interview.interviewer,
                    participants: @interview.participants
                }
            }
        }
        render json: response , status: :ok
    end

    def create
        @interview = @current_user.interviews_created.new(interview_params)
        #pushing the participants
        if(params[:interview][:participants])
            @interview.participants << User.find(params[:interview][:participants])
        end
        if @interview.save
            render json: @interview, status: :created
        else
            render json: {error: @interview.errors}, status: 400
        end
    end

    def update
        @interview = Interview.find(params[:id])
        if(params[:interview][:participants])
            @interview.participants.replace(User.find(params[:interview][:participants]))
        end
        if @interview.update(interview_params)
            render json: {message: 'Interview updated successfully'}, status: :ok
        else
            render json: {error: @interview.errors}, status: 400
        end
    end

    def destroy
        @interview = Interview.find(params[:id])
        if @interview.destroy
            render json: {message: 'Interview deleted successfully'}, status: :ok
        else
            render error: {error: 'Unable to delete the interview'}, status: 400
        end
    end

    def members
        @interview = Interview.find(params[:id])
        response = {interviewer: @interview.interviewer, participants: @interview.participants}
        render json: response, status: :ok
    end


    def home
    end
    private
    
    def interview_params
        params.require(:interview).permit(:title, :starttime, :endtime)
    end

    def fetch_interviews_for_user
        current_user.interviews_created + current_user.interviews_participated
    end
end