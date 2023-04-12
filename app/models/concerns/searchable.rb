# frozen_string_literal: true

module Searchable
  extend ActiveSupport::Concern

  included do
    include Elasticsearch::Model
    include Elasticsearch::Model::Callbacks

    mapping do
      indexes :name, type: :text, analyzer: :english
      indexes :price, type: :float
      indexes :gtin, type: :keyword
      indexes :availability, type: :boolean
    end
  end
end
