class AddRemoveImageLinkToProduct < ActiveRecord::Migration[7.0]
  def change
    add_column :products, :remote_image_link, :text
  end
end
