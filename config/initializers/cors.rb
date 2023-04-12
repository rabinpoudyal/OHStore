# frozen_string_literal: true

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  if Rails.env.development?
    allow do
      origins 'http://localhost:3001'

      resource '*',
               headers: :any,
               expose: %w[access-token expiry token-type uid client],
               methods: %i[get delete post put patch]
    end
  end
end
