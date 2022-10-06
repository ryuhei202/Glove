Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      #  #topページのルーティング GET:"/"
        root 'top#index'
        resources :users
    end
  end
 
end
