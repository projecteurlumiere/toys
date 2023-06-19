require 'sinatra'
require_relative 'model/tictactoe.rb'

include TicTacToe

configure do
  set :root, File.dirname(__FILE__)
  set :public_folder, 'public'
  set :server, :thin
end

get '/' do
  erb :index
end

get '/etch-a-sketch/?' do
  erb :etch_a_sketch
end

get '/rock-paper-scissors/?' do
  erb :rps
end

get '/rock-paper-scissors/oldgame/?' do
  erb :rps_oldgame
end

get '/calculator/?' do
  erb :calculator
end

get '/tic-tac-toe/?' do
  erb :tic_tac_toe
end

not_found do
  @page_title = "404"
  @page_content = '<h1 style=\"text-align: center\">404: Page not Found</h1>'
  html :template
end