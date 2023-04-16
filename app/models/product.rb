# frozen_string_literal: true

class Product < ApplicationRecord
  searchkick
  has_one_attached :image
  belongs_to :brand, optional: true
  belongs_to :category, optional: true

  validates :name, presence: true
  validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :availability, inclusion: { in: [true, false] }
end
