Rails.application.routes.draw do
  post 'auth/register', to: 'users#register'
  get 'test', to: 'users#test'
  post 'auth/login', to: 'users#login'

  resources :interviews do
    member do
      get :members
    end
  end

  
  resources :users, only: [:index]
end
