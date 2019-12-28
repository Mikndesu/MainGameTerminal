class CreateContributions < ActiveRecord::Migration[5.2]
  def change
    create_table :contributions do |t|
      t.string :name
      t.integer :score
      t.timestamps null: false
    end
  end
end
