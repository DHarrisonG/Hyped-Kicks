class ShoesController < ApplicationController
    def index
        @shoes = Shoe.all
        render json: @shoes, except: [:created_at, :updated_at], include: :comments 
    end
end
