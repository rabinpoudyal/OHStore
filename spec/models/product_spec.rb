# frozen_string_literal: true

# spec/models/product_spec.rb
require 'rails_helper'

RSpec.describe Product, type: :model do
  # Ensure the Product model has the required columns
  describe 'columns' do
    it { should have_db_column(:name).of_type(:string).with_options(null: false) }
    it { should have_db_column(:price).of_type(:decimal).with_options(precision: 8, scale: 2, null: false) }
    it { should have_db_column(:availability).of_type(:boolean).with_options(default: true) }
    it { should have_db_column(:description).of_type(:text) }
    it { should have_db_column(:gtin).of_type(:string).with_options(null: false) }
    it { should have_db_column(:created_at).of_type(:datetime).with_options(null: false) }
    it { should have_db_column(:updated_at).of_type(:datetime).with_options(null: false) }
  end

  # Ensure the Product model has the required associations
  describe 'associations' do
    # Add your associations tests here
  end

  # Ensure the Product model has the required validations
  describe 'validations' do
    let(:product) { FactoryBot.build(:product) }

    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:price) }
    it { should validate_numericality_of(:price).is_greater_than_or_equal_to(0) }
    it { should allow_value(true, false).for(:availability) }
  end
end
