# frozen_string_literal: true

class Product < ApplicationRecord
  # include Elasticsearch::Model
  include Searchable

  validates :name, presence: true
  validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :gtin, presence: true
  validates :availability, inclusion: { in: [true, false] }

end
