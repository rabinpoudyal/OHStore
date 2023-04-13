class XmlImportService < BaseService
  attr_accessor :file_name

  def initialize(file_name:)
    self.file_name = file_name
  end

  def call
    doc = Nokogiri::XML(File.read(file_name))
    doc.xpath('//listing').each do |record|
      Product.create!(
        name: record.at('name').text,
        description: record.at('description').text,
        price: record.at('price').text,
        gtin: record.at('gtin').text,
        availability: record.at('availability').text
      )
    end
  end

  private

  def parse_file
  end
end
