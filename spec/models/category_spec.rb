# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Category, type: :model do
  # Ensure the Category model has the required columns
  describe 'columns' do
    it { should have_db_column(:name).of_type(:string).with_options(null: false) }
    it { should have_db_column(:parent_id).of_type(:integer) }
    it { should have_db_column(:created_at).of_type(:datetime).with_options(null: false) }
    it { should have_db_column(:updated_at).of_type(:datetime).with_options(null: false) }
  end

  # Ensure the Category model has the required associations
  describe 'associations' do
    # Add your associations tests here
    it { should have_many(:children).class_name('Category').with_foreign_key('parent_id') }
    it { should belong_to(:parent).class_name('Category').optional }
  end

  # Ensure the Category model has the required validations
  describe 'validations' do
    let(:category) { FactoryBot.build(:category) }

    it { should validate_presence_of(:name) }
  end
end
