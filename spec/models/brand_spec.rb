# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Brand, type: :model do
  # Ensure the Brand model has the required columns
  describe 'columns' do
    it { should have_db_column(:name).of_type(:string).with_options(null: false) }
    it { should have_db_column(:created_at).of_type(:datetime).with_options(null: false) }
    it { should have_db_column(:updated_at).of_type(:datetime).with_options(null: false) }
  end

  # Ensure the Brand model has the required associations
  describe 'associations' do
    # Add your associations tests here
    it { should have_many(:products) }
  end

  # Ensure the Brand model has the required validations
  describe 'validations' do
    let(:brand) { FactoryBot.build(:brand) }

    it { should validate_presence_of(:name) }
  end
end
