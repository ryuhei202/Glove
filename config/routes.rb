Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      #  #topページのルーティング GET:"/"
        root 'top#index'
        resources :users


        post   '/login',   to: 'sessions#create'
        delete '/logout',  to: 'sessions#destroy'
        get '/logged_in', to: 'sessions#logged_in?'
        get '/message/:language', to: 'messages#show'

        resources :rooms, only: %i[index show create]

        resources :messages, only: %i[create]
      

    end
  end
 
end
