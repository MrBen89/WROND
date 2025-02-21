Rails.application.routes.draw do
  get 'flashcards/index'
  devise_for :users
  root to: "pages#home"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  get 'kanji/index', to: 'kanji#index'
  get 'flashcards', to: 'flashcards#index'

  resources :kanji, only: [:index, :show]
  resources :puzzles, only: [:create]
  resources :user_profiles, only: [:show, :edit, :update]
  resources :upgrades, only: [:show]
  resources :practice, only: [:index]


  # Defines the root path route ("/")
  # root "posts#index"
end
