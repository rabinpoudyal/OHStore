# frozen_string_literal: true

module Api
  module V1
    class ProductsController < ApiController
      def index
        @products = Product.all #search(product_search_params)
        render json: ProductSerializer.new(@products).serializable_hash
      end

      def create 
        @product = Product.new(product_params)
        if @product.save
          render json: ProductSerializer.new(@product).serializable_hash, status: :created
        else
          render json: @product.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @product = Product.find(params[:id])
        if @product.destroy
          head :no_content
        else
          render json: @product.errors, status: :unprocessable_entity
        end
      end

      private

      def product_search_params
        params.permit(:name, :price, :gtin, :availability)
      end

      def product_params
        params.require(:product).permit(:name, :price, :gtin, :availability, :description)
      end
    end
  end
end
