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

    # def search(filters)
    #   search_definition = {
    #     query: {
    #       bool: {
    #         must: []
    #       }
    #     }
    #   }

    #   filters.each do |key, value|
    #     search_definition[:query][:bool][:must] << { match: { key => value } }
    #   end

    #   __elasticsearch__.search(search_definition)
    # end

  end
end
