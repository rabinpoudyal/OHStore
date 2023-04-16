# frozen_string_literal: true

# lib/tasks/xml_import.rake

desc 'Import XML data from a file'
task :xml_import, [:file_name] => :environment do |_task, args|
  if args[:file_name].blank?
    puts 'Please provide a file name. Usage: rake xml_import[file_name]'
  else
    file_name = args[:file_name]
    XmlImportService.call(file_name:)
    puts "XML data imported from #{file_name}!"
  end
end

# Run the task with:
# rake xml_import[products.xml]