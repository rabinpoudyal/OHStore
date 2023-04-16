# frozen_string_literal: true

require 'open-uri'
class XmlImportService < BaseService
  attr_accessor :file_name

  def initialize(file_name:)
    super
    # self.file_name = '/Users/rabin/code/OHStore/products.rss'
    self.file_name = file_name
  end

  def call
    doc = Nokogiri::XML(URI.parse(file_name).open)

    ActiveRecord::Base.transaction do
      doc.xpath('//item').each do |item|
        product = create_product_object(item)
        build_product(product)
      end
    end
  end

  private

  def build_product(product)
    Product.create!(product)
  end

  def build_category(raw_categories)
    hierarchy = raw_categories.split(' > ')
    category = nil
    parent = nil
    hierarchy.each do |cat|
      category = Category.find_or_create_by(name: cat.strip, parent:)
      parent = category
    end
    category
  end

  def create_product_object(item)
    {
      description: item.at('description').text,
      name: item.at('g|product-name').text,
      price: item.at('g|price').text.to_f,
      brand: Brand.find_or_create_by(name: item.at('g|brand').text.strip),
      gtin: item.at('g|gtin').text,
      remote_image_link: item.at('g|image_link').text,
      availability: item.at('g|availability').text == 'in stock',
      category: build_category(item.at('g|product-category').text)
    }
  end
end
