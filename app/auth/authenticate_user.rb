#this class is for authenticating a user with login id and password
class AuthenticateUser
    prepend SimpleCommand

    attr_accessor :email, :password

    def initialize(email, password)
        @email = email
        @password = password
    end

    def call
        #if user is available for the email id and password provided, create a new token with payload as userid
        JsonWebToken.encode(userid: user.id) if user
    end
    
    private
    
    def user
        #this method tries to find a user by email and then authenticate it's password
        user = User.find_by_email(email)
        if user && user.authenticate(password)
            return user
        end
        errors.add :user_authentication, 'Invalid credentials'
        nil
    end
end
