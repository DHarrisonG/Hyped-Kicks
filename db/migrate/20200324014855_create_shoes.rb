class CreateShoes < ActiveRecord::Migration[6.0]
  def change
    create_table :shoes do |t|
      t.string :name
      t.string :description
      t.string :image_url
      t.integer :hype_count

      t.timestamps
    end
  end
end
