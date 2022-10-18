Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      #  #topページのルーティング GET:"/"
        root 'top#index'
        resources :users

        post   '/login',   to: 'sessions#create'
        delete '/logout',  to: 'sessions#destroy'
    end
  end
 
end
