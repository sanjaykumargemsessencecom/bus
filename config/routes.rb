Rails.application.routes.draw do

  devise_for :users
  resources :users 
  resources :reservations do
    patch 'cancelled'
  end
  
  resources :buses do
    resources :reservations
  end

  namespace :owners do
    resources :buses do
      get 'check_reservations'=>"reservations#check_reservations", as: :check_reservations
    end
    resources :reservations
  end
  
  namespace :admins do
    resources :users do
      resources :buses
    end 
    resources :reservations
  end

  root to: "home#index"
  get 'home/search'=>"home#search"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end