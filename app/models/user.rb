class User < ApplicationRecord
    #validations
    validates_presence_of :name, :email, :password_digest
    validates :email, uniqueness: true

    #encrypt_password, using bcrypt
    has_secure_password
end
