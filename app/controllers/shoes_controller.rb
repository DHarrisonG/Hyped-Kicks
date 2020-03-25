class ShoesController < ApplicationController
    def index
        @shoes = Shoe.all
        render json: @shoes, except: [:created_at, :updated_at], include: :comments 
    end

    def show
        @shoe = Shoe.find(params[:id])
        render json: @shoe, except: [:created_at, :updated_at], include: :comments 
    end
end
