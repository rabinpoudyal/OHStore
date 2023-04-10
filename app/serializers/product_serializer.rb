# frozen_string_literal: true

class ProductSerializer < BaseSerializer
  attributes :name, :price, :gtin, :availability
end
