require 'open-uri'
class XmlImportService < BaseService
  attr_accessor :file_name

  def initialize(file_name:)
    self.file_name = '/Users/rabin/code/OHStore/products.rss'
  end

  def call
    doc = Nokogiri::XML(URI.open(file_name))

    doc.xpath('//item').each do |item|
      category = build_category(item.at('g|product-category').text)
      product = {
        description: item.at('description').text,
        name: item.at('g|product-name').text,
        price: item.at('g|price').text.to_f,
        brand: Brand.find_or_create_by(name: item.at('g|brand').text.strip),
        gtin: item.at('g|gtin').text,
        # image_link: item.at('g|image_link').text,
        availability: item.at('g|availability').text == 'in stock',
        category: category
      }
      build_product(product)
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
end
