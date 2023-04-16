# frozen_string_literal: true

class ProductSerializer < BaseSerializer
  attributes :name, :price, :gtin, :availability, :description

  attribute :product_image do |object|
    ActiveStorage::Current.set(host: "http://localhost:3000") do
      object.image.url if object.image.attached?
    end || object.remote_image_link
  end
end
