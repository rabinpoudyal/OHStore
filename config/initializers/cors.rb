Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:3001'

    resource '*',
             headers: :any,
             methods: %i[get delete post put]
  end
end
