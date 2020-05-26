#this class handles the authorization for the requests that we make to the api
class AuthorizeApiRequest
    prepend SimpleCommand


    def initialize(headers = {} )
        @headers = headers
    end

    #this is the main function that would start the chain. we will be calling this function to authorize our request
    def call
        user
    end

    private

    attr_reader :headers 
    def user
        @user ||= User.find(decoded_auth_token[:userid]) if decoded_auth_token
        @user || errors.add(:token, 'invalid token') && nil
    end

    #now that we have got the token, we will decode it using JsonWebToken class's method decode that will give us the decoded authentication token
    def decoded_auth_token
        # the ||= is reducing our code here. It says that if @decoded_auth_token has a previous not nil value, stick to it, otherwise use the result of JsonWebToken
        @decoded_auth_token ||= JsonWebToken.decode(http_auth_header)
    end

    #this function checks if the Authorization header is present?. If it is present, we expect it to be of the form - Bearer <token>, so we split the header and fetch the token from it
    def http_auth_header
        if headers['Authorization'].present?
            return headers['Authorization'].split(' ').last
        else 
            #if Authorization header is missing, add the error Missing Token
            errors.add(:token, 'Missing token')
        end
    end
end