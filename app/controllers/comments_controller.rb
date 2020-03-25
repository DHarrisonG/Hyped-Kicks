class CommentsController < ApplicationController
    skip_before_action :verify_authenticity_token
    def index
        @comments= Comment.all
        render json: @comments
        #  only: [:name, :content]
    end

    def create
        puts comment_params
        @comment = Comment.create(comment_params)
        @comment.save
    end
end


private

def comment_params
    params.require(:comment).permit(:shoe_id, :name, :content)

end