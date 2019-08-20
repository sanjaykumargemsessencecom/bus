Rails.application.routes.draw do

  root to: "home#index"
  get 'home/search'=>"home#search"
  devise_for :users
  resources :users 
  resources :buses do
  resources :reservations
  end
  get '/admins'=>"admins#index"
  resources :owners do
     resources :buses
     get 'account'=>"owners#account", as: :account
     get 'buses/check_reservations/:id'=>"reservations#check_reservations", as: :owner_check_reservations
  end
  
  namespace :admins do
     resources :reservations
     get 'check_buses/:id'=>"admins#check_bus", as: :check_bus
     delete '/:owner_id/check_bus/:id'=>"admins#destroy", as: :check_bus_destroy
     get 'account'=>"admins#account", as: :account
  end
    
  resources :customers do     
     get 'all_reservations'=>"customers#all_reservations", as: :all_reservations  
     get 'account'=>"customers#account", as: :account
  end
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
