class ConflictsController < ApplicationController
  def index
    @conflicts = policy_scope(Conflict)
    @conflict = Conflict.new
  end

  def show
    @user_profile = UserProfile.find(current_user.user_profile.id)
    authorize @user_profile
  end

  def create
    p "creating"
    @conflicts = Conflict.where(status: "searching")
    if conflict_params[:commit] == "All!" && @conflicts.length > 0
      @conflict = @conflicts.sample
      @conflict.user2 = current_user
      @conflict.status = "starting"
      @conflict.save
      redirect_to conflict_path(@conflict)
    elsif conflict_params[:commit] == "All!" && @conflicts.length == 0
      @conflict = Conflict.new(user1: current_user, status: "searching" )
      @conflict.kanji = Kanji.all.sample
      if @conflict.save
        respond_to do |format|
          format.turbo_stream do
            render turbo_stream: turbo_stream.append(:games, partial: "conflicts/join_card", locals: { conflict: @conflict })
          end
          format.html { redirect_to conflicts_path }
        end
      end
    else
      @conflicts = @conflicts.joins(:kanji).where("kanji.jlptLevel" => conflict_params[:commit].gsub("N", ""))
      if @conflicts.count > 0
        @conflict = @conflicts.sample
        @conflict.user2 = current_user
        @conflict.status = "starting"
        @conflict.save
        redirect_to conflict_path(@conflict)
      else
        @conflict = Conflict.new(user1: current_user, status: "searching" )
        @conflict.kanji = Kanji.where(jlptLevel: conflict_params[:commit].gsub("N", "")).sample
        if @conflict.save
          respond_to do |format|
            format.turbo_stream do
              render turbo_stream: turbo_stream.append(:games, partial: "conflicts/join_card", locals: { conflict: @conflict })
            end
            format.html { redirect_to conflicts_path }
          end
        end
      end
    end
    @user_profile = UserProfile.find(current_user.user_profile.id)
    authorize @user_profile
    @conflict.save
  end

  private

  def conflict_params
    params.permit(:commit, :authenticity_token)
  end

end
