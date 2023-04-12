# frozen_string_literal: true

module Api
  module V1
    class ApiController < ActionController::API
      include DeviseTokenAuth::Concerns::SetUserByToken
      include Pundit::Authorization

    end
  end
end
