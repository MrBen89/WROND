class ConflictsController < ApplicationController

  def index
    @conflicts = policy_scope(Conflict)
    @conflict = Conflict.new
  end

  def show
    @user_profile = UserProfile.find(current_user.user_profile.id)
    @user = current_user
    @conflict = Conflict.find(params[:id])
    authorize @user_profile
    authorize @conflict
  end

  def create
    @conflicts = Conflict.where(status: "searching")
    if conflict_params[:commit] == "All!" && @conflicts.length > 0
      @conflict = @conflicts.where.not(user1: current_user).sample
      @conflict.user2 = current_user
      @conflict.status = "starting"
      @conflict.save
      redirect_to conflict_path(@conflict)
    elsif conflict_params[:commit] == "All!" && @conflicts.length == 0
      @conflict = Conflict.new(user1: current_user, status: "searching" )
      @conflict.kanji = Kanji.all.sample
      @conflict.u1_state = [].to_json
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
      if @conflicts.where.not(user1: current_user).count > 0
        @conflict = @conflicts.where.not(user1: current_user).sample
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
              # render turbo_stream: turbo_stream.append(:games, partial: "conflicts/join_card", locals: { conflict: @conflict })
              redirect_to conflict_path(@conflict)
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

  def update
    @conflict = Conflict.find(params[:id])
    @user_profile = UserProfile.find(current_user.user_profile.id)
    authorize @user_profile
    if User.find(edit_conflict_params[:player]) == @conflict.user1
      @conflict.u1_state = edit_conflict_params[:state]
    elsif User.find(edit_conflict_params[:player]) == @conflict.user2
      @conflict.u2_state = edit_conflict_params[:state]
    end
    @conflict.status = edit_conflict_params[:status] if edit_conflict_params.has_key?(:status)
    @conflict.winner = edit_conflict_params[:winner] if edit_conflict_params.has_key?(:winner)
    @conflict.time = edit_conflict_params[:time] if edit_conflict_params.has_key?(:time)
    if @conflict.save
        # format.turbo_stream do
        render turbo_stream: [turbo_stream.update(:conflicts_box, partial: "conflicts/p1puzzle", locals: { conflict: @conflict }),
          turbo_stream.update(:conflicts, partial: "conflicts/p2puzzle", locals: { conflict: @conflict })]
        # end
        # redirect_to conflict_path(@conflict)
    end
  end

  private

  def conflict_params
    params.permit(:commit, :authenticity_token)
  end

  def edit_conflict_params
    params.require(:conflict).permit(:id, :status, :state, :time, :winner, :player, :total_xp, :level)
  end

end
