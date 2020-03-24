class CommentsController < ApplicationController
    def index
        @comments= Comment.all
        render json: @comments, only: [:name, :content]
    end
end
