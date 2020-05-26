class User < ApplicationRecord
    #validations
    validates_presence_of :name, :email, :password_digest
    validates :email, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }

    #encrypt_password, using bcrypt
    has_secure_password

    ##associations 
    #a user has many interviews that he has created, identified by foreign_key interviewer_id
    #we can now say @user.interviews_created
    has_many :interviews_created, :foreign_key => "interviewer_id", :class_name => "Interview"

    #a user can also participate in many interviews
    # we can now say @user.interviews_participated
    has_and_belongs_to_many :interviews_participated, :class_name => "Interview"
end
