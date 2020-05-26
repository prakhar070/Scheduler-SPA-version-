#this class is a singleton class
class JsonWebToken
    class << self
        #this function encodes the payload and also sets an expire time
        def encode(payload, exp = 2.hours.from_now)
            # set token expiration time
            payload[:exp] = exp.to_i
            #to encode, we make use of the rails secreat
            JWT.encode(payload, Rails.application.secrets.secret_key_base)
        end

        def decode(token)
            #decodes the token to get the user payload
            # here the [0] tells us that we are fetching the user id and leaving behind the expire date
            body = JWT.decode(token, Rails.application.secrets.secret_key_base)[0]
            HashWithIndifferentAccess.new body
            
        #raise custom errors
        #in these lines we are telling that in case of any exceptions raised, be it JWT::ExpiredSignature, JWT::VerificationError etc, we call our custom ExceptionHandlers in ExceptionHandler module
        rescue JWT::ExpiredSignature, JWT::VerificationError => e
            raise ExceptionHandler::ExpiredSignature, e.message
        
        rescue JWT::DecodeError, JWT::VerificationError => e
            raise ExceptionHandler::DecodeError, e.message
        end
    end
end