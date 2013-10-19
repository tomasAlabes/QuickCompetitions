class CompetitionsController < ApplicationController

  def view
    respond_to do |format|
      format.json { render json: '{ "participants": [ { "name": "Tomi", "criteria": [] } ], "criteria": [] }' }
    end
  end

end
