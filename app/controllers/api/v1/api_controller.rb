# frozen_string_literal: true

module Api
  module V1
    class ApiController < ActionController::API
      include DeviseTokenAuth::Concerns::SetUserByToken
      include Pundit::Authorization

      before_action :authenticate_api_v1_user!

      private

      def authenticate_api_v1_user!
        unless current_api_v1_user
          render json: { error: 'Not authorized' }, status: :unauthorized
        end
      end

    end
  end
end
