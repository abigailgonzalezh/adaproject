defmodule AdaBeWeb.Router do
  use AdaBeWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :authenticated do
    plug AdaBeWeb.AuthAccessPipeline
  end

  scope "/api", AdaBeWeb do
    pipe_through :api

    scope "/auth" do
      post "/identity/callback", AuthenticationController, :identity_callback
    end
  end

  scope "/api", AdaBeWeb do
    pipe_through [:api, :authenticated]

    get "/bookings", BookingController, :index
    post "/bookings", BookingController, :create
  end

end
