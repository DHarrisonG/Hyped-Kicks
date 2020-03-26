class ShoesController < ApplicationController
    skip_before_action :verify_authenticity_token
    def index
        @shoes = Shoe.all
        render json: @shoes, except: [:created_at, :updated_at], include: :comments 
    end

    def show
        @shoe = Shoe.find(params[:id])
        render json: @shoe, except: [:created_at, :updated_at], include: :comments 
    end

    def create
        @shoe = Shoe.create(shoe_params)
        @shoe.save
    end

    def update
        shoe = Shoe.find_by(id: params[:id])
        shoe.update(hype_count: params[:hype_count])
        render json: shoe

    end

    private

    # def shoe_params
    #     params.require(:shoe).permit(:name, :description, :image_url, :hype_count )
    # end
end
