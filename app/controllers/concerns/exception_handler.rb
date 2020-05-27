module ExceptionHandler
    #this line will tell rails that we are creating a concern
    extend ActiveSupport::Concern
  
    #Define custom error subclasses - rescue catches `StandardErrors`
    #The classes on the left are our custom classes that we are using for Exception Handling. Each of them is made a base class of StandardError
    class AuthenticationError < StandardError; end
    class MissingToken < StandardError; end
    class InvalidToken < StandardError; end
    class ExpiredSignature < StandardError; end
    class DecodeError < StandardError; end
    
    #the code within this included block will be available wherever the ExceptionHandler module is included
    included do
      #here we will define some custom handlers and will give them each a function which will run when the exception gets raised

      #for eg, if Rails raises the following exception, ActiveRecord::RecordInvalid, then call the four_twenty_two private method to handle it
      rescue_from ActiveRecord::RecordInvalid, with: :four_twenty_two
      rescue_from ExceptionHandler::AuthenticationError, with: :unauthorized_request
      rescue_from ExceptionHandler::MissingToken, with: :four_twenty_two
      rescue_from ExceptionHandler::InvalidToken, with: :four_twenty_two
      rescue_from ExceptionHandler::ExpiredSignature, with: :four_ninety_eight
      rescue_from ExceptionHandler::DecodeError, with: :four_zero_one
  
      rescue_from ActiveRecord::RecordNotFound do |e|
       render json: { message: e.message }, status: :not_found
      end
  
      rescue_from ActiveRecord::RecordInvalid do |e|
        render json: { message: e.message }, status: :unprocessable_entity
      end
    end
  
    private
    
    # JSON response with message; Status code 422 - unprocessable entity
    def four_twenty_two(e)
     render json: { message: e.message }, status: :unprocessable_entity
    end
   
    # JSON response with message; Status code 401 - Unauthorized
    def four_ninety_eight(e)
      render json: { message: e.message }, status: :unauthorized
    end
  
    # JSON response with message; Status code 401 - Unauthorized
    def four_zero_one(e)
      render json: { message: e.message }, status: :unauthorized
    end
  
     # JSON response with message; Status code 401 - Unauthorized
    def unauthorized_request(e)
      render json: { message: e.message }, status: :unauthorized
    end
  end