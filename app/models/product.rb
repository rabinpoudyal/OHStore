# frozen_string_literal: true

class Product < ApplicationRecord
  # include Elasticsearch::Model
  searchkick
  has_one_attached :image
  belongs_to :brand
  belongs_to :category

  # validates :name, presence: true
  # validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
  # validates :availability, inclusion: { in: [true, false] }
  # validates :image, attached: true, content_type: %w[image/png image/jpg image/jpeg]
end
