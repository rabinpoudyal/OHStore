# frozen_string_literal: true

RSpec.describe XmlImportService do
  let(:file_name) { 'spec/support/file.rss' }
  let(:service) { XmlImportService.new(file_name:) }

  describe '#call' do
    it 'creates products' do
      expect { service.call }.to change { Product.count }.by(3)
    end

    it 'creates brands' do
      expect { service.call }.to change { Brand.count }.by(3)
    end

    it 'creates categories' do
      expect { service.call }.to change { Category.count }.by(10)
    end
  end
end
