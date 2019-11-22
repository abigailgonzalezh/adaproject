defmodule AdaBe.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :username, :string
      add :hashed_password, :string
      add :email, :string
      
      timestamps()
    end

    create unique_index(:users, [:email])
  end
end
