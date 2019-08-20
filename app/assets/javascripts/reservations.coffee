# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$(document).on 'change', '#reservation_date', ->
  bus_id = $('.container').data('bus')
  date = $(this).val()
  $.ajax 
  	url: 'new?id='+bus_id
  	data: 
  		date: date
  	type: 'get'
$(document).on 'change', '#reservation_booked_seats', ->
  limit = $('.seat').data('seat')
  d = document.getElementById('reservation_booked_seats').value
  limit = Number limit + Number d
  $('.single-checkbox').on 'change', (evt) ->
    if $(this).siblings(':checked').length >= limit
      @checked = false
    return
  return