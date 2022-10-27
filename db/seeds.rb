3.times do |n|
  user = User.new(
    name:"example_user_#{n}",
    email:"eampleuuser#{n+1}@gmail.com",
    password:"foobar",
    password_confirmation:"foobar",
    gender:0
  )

  user.save!
end


