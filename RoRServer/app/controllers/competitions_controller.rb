class CompetitionsController < ApplicationController

  def view
    respond_to do |format|
      format.json { render json: '{ "participants": [ { "name": "Tomi", "criteria": [] } ], "criteria": [] }' }
    end
  end

  def new
    respond_to do |format|
      format.json { render json: '{ "status": 200 }' }
    end
  end

  def put

  end

  def delete

  end

end
