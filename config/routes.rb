Rails.application.routes.draw do

  devise_for :users
  resources :users 

  resources :buses do
    resources :reservations
  end

  namespace :owners do
    resources :buses
    resources :reservations
    get 'account'=>"owners#account"
    get 'buses/check_reservations/:id'=>"reservations#check_reservations", as: :owner_check_reservations
  end
  
  namespace :admins do
    resources :reservations
    get 'check_buses/:id'=>"admins#check_bus", as: :check_bus
    delete '/:owner_id/check_bus/:id'=>"admins#destroy", as: :check_bus_destroy
    get 'account'=>"admins#account", as: :account
  end
    
  namespace :customers do  
    resources :reservations   
    get 'all_reservations'=>"customers#all_reservations", as: :all_reservations  
    get 'account'=>"customers#account", as: :account
  end
  root to: "home#index"
  get 'home/search'=>"home#search"
  get '/admins'=>"admins#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
