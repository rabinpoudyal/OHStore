# frozen_string_literal: true

class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name, null: false
      t.decimal :price, precision: 8, scale: 2, null: false
      t.boolean :availability, default: true
      t.text :description
      t.string :gtin 

      t.timestamps
    end
    add_index :products, :name
  end
end
