# frozen_string_literal: true

require "factory_bot_rails"

50.times do
  FactoryBot.create!(:product)
  puts "done"
end
