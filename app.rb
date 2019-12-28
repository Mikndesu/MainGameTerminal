require 'bundler/setup'
Bundler.require
require 'sinatra/reloader' if development?
require 'open-uri'
require 'sinatra/json'
require './models/contribution.rb'


before do
  def is_phone
    user_agent(request.user_agent)
  end

  def user_agent(ua)
    if ["Android", "iPhone", "iPad", "iPod"].find {|s| ua.include?(s) }
      return 1
    else
      return 0
    end
  end
end

get '/' do
  erb :mainpage
end

get '/game/breakout' do
  redirect '/game/breakout/'
end

get '/game/breakout/' do
  @contents = Contribution.all.order('id desc')
  @ranks = Contribution.limit(3).order('score desc')

  if is_phone == 0 then
  erb :"/PC/index"
  elsif is_phone == 1 then
  erb :"/Mobile/index"
  end
end

post '/game/breakout/new' do

  postdata = {
    name: params[:user_name],
    score: params[:score]
  }

  puts params

  if params[:user_name].empty?
  postdata[:name] = '名無しさん'
  end

  puts postdata

  Contribution.create(postdata)

  redirect '/game/breakout/'
end

post '/game/breakout/delete/:id' do
  Contribution.find(params[:id]).destroy
  redirect '/game/breakout/'
end