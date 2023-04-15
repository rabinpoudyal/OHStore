# frozen_string_literal: true

module Api
  module V1
    class ProductsController < ApplicationController
      def index
        @products = if product_search_params[:name].present?
                      Product.search(product_search_params[:name]).results
                    else
                      Product.search(limit: 10).results
                    end
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

      def update
        @product = Product.find(params[:id])
        if @product.update(product_params)
          render json: ProductSerializer.new(@product).serializable_hash, status: :ok
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
        params.permit(:name, :page)
      end

      def product_params
        params.require(:product).permit(:name, :price, :gtin, :availability, :description, :image)
      end
    end
  end
end
