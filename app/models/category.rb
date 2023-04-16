# frozen_string_literal: true

class Category < ApplicationRecord
  validates :name, presence: true

  has_many :products
  has_many :children, class_name: 'Category', foreign_key: 'parent_id'
  belongs_to :parent, class_name: 'Category', optional: true
end
