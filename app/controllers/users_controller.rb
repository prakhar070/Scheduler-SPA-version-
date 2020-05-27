class UsersController < ApplicationController
    skip_before_action :authenticate_request, only: [:login, :register]
    #this would give a list of all the users
    #this is needed when we want to display the participants to the user to choose from
    def index
        @users = User.where.not(id: @current_user.id)
        render json: {users: @users} , status: :ok
    end

    #POST /register
    def register
        @user = User.create(user_params)
        if @user.save
            response = { message: 'User created successfully!'}
            render json: response, status: :created
        else
            render json: {error: @user.errors}, status: :bad_request
        end
    end

    def login
        authenticate(params[:user][:email], params[:user][:password])
    end

    def test
        render json: {
            message: 'You have passed authentication and authorization test'
        }
    end

    private
    def authenticate(email, password)
        command = AuthenticateUser.call(email, password)
        if command.success?
            render json:{
                access_token: command.result,
                username: User.find_by_email(email).name,
                message: 'Login Successful'
            }
        else
            render json: {error: command.errors}, status: :unauthorized
        end
    end
    def user_params
        params.require(:user).permit(:name, :email, :password,:password_confirmation)
    end
end