# frozen_string_literal: true

module Api
  module V1
    class ProductsController < ApplicationController
      def index
        @products = Product.search(product_search_params)
        render json: ProductSerializer.new(@products).serializable_hash
      end

      private

      def product_search_params
        params.permit(:name, :price, :gtin, :availability)
      end

      def product_params
        params.require(:product).permit(:name, :price, :gtin, :availability)
      end
    end
  end
end
